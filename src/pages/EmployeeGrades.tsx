import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, User, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import {
    useGrades,
    useSkills,
    useSubskills,
    useProfiles,
    useUsers,
    useTechnologies,
    useSkillMaps,
    useProfileUsers,
    useSkillMapMutation,
    useTechnologySkills,
    useTechnologyProfiles,
    useSkillMapsByUser,
    useTechnologyProfilesbyprofileid
} from '@/hooks/useApi';
import type { MapSkillmap } from '@/types';
import {
    StatusCards,
    TechnologyTabs,
    GradeLegend,
    SkillGradeTable,
    EmployeeInfoCard,
    EmployeeSelector

} from '../components/Employee-Grades/Index';

const gradeColors: Record<string, string> = {
    'Level_1': 'bg-slate-500',
    'Level_2': 'bg-blue-500',
    'L3': 'bg-green-500',
    'L4': 'bg-purple-500',
    'L5': 'bg-amber-500',
};

export default function EmployeeGrades() {
    const { data: grades = [], isLoading: gradesLoading } = useGrades();
    const { data: skills = [], isLoading: skillsLoading } = useSkills();
    const { data: subskills = [], isLoading: subskillsLoading } = useSubskills();
    const { data: profiles = [], isLoading: profilesLoading } = useProfiles();
    const { data: users = [], isLoading: usersLoading } = useUsers();
    const { data: skillMaps = [], isLoading: skillMapsLoading } = useSkillMaps();
    const { data: profileUsers = [], isLoading: profileUsersLoading } = useProfileUsers();
    console.log("aa",profileUsers)
    const { data: technologySkills = [] } = useTechnologySkills();
    const { data: technologyProfiles = [] } = useTechnologyProfiles();
    const { data: technologyProfilesbyprofileid = [] } = useTechnologyProfilesbyprofileid();
    const { data: technologies = [], isLoading: technologyloading } = useTechnologies();
    const { insertUpdate } = useSkillMapMutation();

    const isLoading = gradesLoading || skillsLoading || subskillsLoading || profilesLoading ||
        usersLoading || skillMapsLoading || profileUsersLoading;

    const [selectedUserId, setSelectedUserId] = useState<number>(0);
    const [pendingChanges, setPendingChanges] = useState<Map<number, number>>(new Map());
    const [hasChanges, setHasChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const selectedUser = users.find(u => u.id === selectedUserId);
    const { data: useSkillMapsByUserdata = [], isLoading: useSkillMapsByUserLoading } = useSkillMapsByUser(selectedUserId);

    console.log("a", profileUsers);
    const userProfile = profileUsers.find(pu => pu.userId === selectedUserId);
    const profile = userProfile ? profiles.find(p => p.id === userProfile.profileId) : null;

    //console.log("selectedUserId", selectedUserId);
    //console.log("selectedUser", selectedUser);
    console.log("userprofile", userProfile);
    //console.log("profile", profile);
    const userSkillMaps = useMemo(() =>
        skillMaps.filter(sm => sm.userId === selectedUserId),
        [skillMaps, selectedUserId]
    );
    console.log(userSkillMaps)
    const skillsWithSubskillsall = useMemo(() =>
        skills.filter(s => s.isactive).map(skill => ({
            ...skill,
            subskills: subskills.filter(ss => ss.skillId === skill.id && ss.isactive)
        })),
        [skills, subskills]
    );
    const skillsWithSubskills = useMemo(() =>
        skills.filter(s => s.isactive).map(skill => ({
            ...skill,
            subskills: subskills.filter(ss => ss.skillId === skill.id && ss.isactive)
        })),
        [skills, subskills]
    );
    //console.log(skillsWithSubskills)
    // Get technologies for user's profile (hierarchical: User → Profile → Technologies)
    console.log("technologyProfiles", technologyProfilesbyprofileid);
    const userTechnologies = useMemo(() => {
        if (!userProfile) return [];
        const techIds = technologyProfilesbyprofileid
            .filter(tp => tp.profileId === userProfile.profileId)
            .map(tp => tp.technologyId);
        console.log("techIds",techIds)
        return technologies.filter(t => techIds.includes(t.id) && t.isactive);
    }, [technologyProfilesbyprofileid, technologies, userProfile]);
    console.log(userTechnologies);

    // Calculate total subskills for all assigned technologies
    const totalSubskills = useMemo(() => {
        const techSkillIds = technologySkills
            .filter(ts => userTechnologies.some(t => t.id === ts.technologyId))
            .map(ts => ts.skillId);

        return subskills.filter(ss =>
            techSkillIds.includes(ss.skillId) && ss.isactive
        ).length;
    }, [technologySkills, userTechnologies, subskills]);

    const getGradeForSubskill = (subskillId: number) => {
        // Check pending changes first
        if (pendingChanges.has(subskillId)) {
            return pendingChanges.get(subskillId) || 0;
        }
        const mapping = userSkillMaps.find(sm => sm.subskillId === subskillId);
        return mapping?.gradeid || 0;
    };

    const handleGradeChange = (subskillId: number, gradeId: number) => {
        setHasChanges(true);
        const newPendingChanges = new Map(pendingChanges);
        newPendingChanges.set(subskillId, gradeId);
        setPendingChanges(newPendingChanges);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const promises: Promise<void>[] = [];

        pendingChanges.forEach((gradeId, subskillId) => {
            const existingMapping = userSkillMaps.find(sm => sm.subskillId === subskillId);

            const data: MapSkillmap = {
                id: existingMapping?.id || 0,
                subskillId,
                userId: selectedUserId,
                gradeid: gradeId,
                isactive: true
            };

            promises.push(
                new Promise((resolve, reject) => {
                    insertUpdate.mutate(data, {
                        onSuccess: () => resolve(),
                        onError: (error) => reject(error)
                    });
                })
            );
        });

        try {
            await Promise.all(promises);
            toast.success('Employee grades saved successfully!');
            setHasChanges(false);
            setPendingChanges(new Map());
        } catch (error) {
            toast.error('Failed to save some grades');
        }
    };

    const calculateProgress = () => {
        const totalSubskills = skillsWithSubskills.reduce((acc, s) => acc + s.subskills.length, 0);
        const gradedSubskills = userSkillMaps.length + pendingChanges.size;
        return totalSubskills > 0 ? (gradedSubskills / totalSubskills) * 100 : 0;
    };

    const calculateAverageGrade = () => {
        const allGrades = [...userSkillMaps.map(sm => sm.gradeid || 0)];
        pendingChanges.forEach((grade) => allGrades.push(grade));
        const validgrades = allGrades.filter(g => g > 0);

        if (validgrades.length === 0) return '0';
        const total = validgrades.reduce((acc, grade) => acc + grade, 0);
        return (total / validgrades.length).toFixed(1);
    };
    //const calculateaveragegrade = () => {
    //    const allgrades = [...userSkillMaps.map(sm => sm.gradeid || 0)];
    //    pendingChanges.forEach((grade) => allgrades.push(grade));
    //    const validgrades = allgrades.filter(g => g > 0);
    //    if (validgrades.length === 0) return '0';
    //    const total = validgrades.reduce((acc, grade) => acc + grade, 0);
    //    return (total / validgrades.length).toFixed(1);
    //};

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };


    // Get user's profile
    //const userProfile = useMemo(() =>
    //    profileUsers.find(pu => pu.userId === selectedUserId),
    //    [profileUsers, selectedUserId]
    //);

    //const profile = useMemo(() =>
    //    userProfile ? profiles.find(p => p.id === userProfile.profileId) : null,
    //    [profiles, userProfile]
    //);


    // Get user's skill maps
    //const userSkillMaps = useMemo(() =>
    //    skillMaps.filter(sm => sm.userId === selectedUserId),
    //    [skillMaps, selectedUserId]
    //);


    // Get grade for a subskill (check pending first, then existing)
    //const getGradeForSubskill = (subskillId: number) => {
    //    if (pendingChanges.has(subskillId)) {
    //        return pendingChanges.get(subskillId) || 0;
    //    }
    //    const mapping = userSkillMaps.find(sm => sm.subskillId === subskillId);
    //    return mapping?.gradeid || 0;
    //};

    //const handleGradeChange = (subskillId: number, gradeId: number) => {
    //    setHasChanges(true);
    //    const newPendingChanges = new Map(pendingChanges);
    //    newPendingChanges.set(subskillId, gradeId);
    //    setPendingChanges(newPendingChanges);
    //};

    const handleUserChange = (userId: number) => {
        setSelectedUserId(userId);
        setHasChanges(false);
        setPendingChanges(new Map());
    };

    //const handleSave = async () => {
    //    setIsSaving(true);

    //    // Simulate API save with mock data update
    //    setTimeout(() => {
    //        const newSkillMaps = [...skillMaps];

    //        pendingChanges.forEach((gradeId, subskillId) => {
    //            const existingIndex = newSkillMaps.findIndex(
    //                sm => sm.userId === selectedUserId && sm.subskillId === subskillId
    //            );

    //            if (existingIndex >= 0) {
    //                newSkillMaps[existingIndex] = { ...newSkillMaps[existingIndex], gradeid: gradeId };
    //            } else {
    //                newSkillMaps.push({
    //                    id: Date.now() + subskillId,
    //                    userId: selectedUserId,
    //                    subskillId,
    //                    gradeid: gradeId,
    //                    isactive: true
    //                });
    //            }
    //        });

    //        setSkillMaps(newSkillMaps);
    //        setIsSaving(false);
    //        setHasChanges(false);
    //        setPendingChanges(new Map());
    //        toast.success('Employee grades saved successfully!');
    //    }, 500);
    //};



    //const selectedUser = users.find(u => u.id === selectedUserId);
    const skillsGradedCount = userSkillMaps.length + pendingChanges.size;

    return (
        <div className="space-y-6">
            <Header
                title="Employee Grades"
                subtitle="Apply and manage competency grades for individual employees"
            />

            {/* Employee Selection */}
            <div className="grid gap-4 md:grid-cols-3">
                <EmployeeSelector
                    users={users}
                    selectedUserId={selectedUserId}
                    onUserChange={handleUserChange}
                />

                { (
                    <div className=" grid gap-4 md:col-span-2">
                        <GradeLegend grades={grades} />
                    </div>
                )}
            </div>

            {/* Employee Info and Stats */}
            {selectedUser && (
                <>
                    <EmployeeInfoCard
                        user={selectedUser}
                        profile={profile}
                        hasChanges={hasChanges}
                        isSaving={isSaving}
                        onSave={handleSave}
                    />

                    <StatusCards
                        skillsGraded={skillsGradedCount}
                        totalSkills={totalSubskills}
                        averageGrade={calculateAverageGrade()}
                        technologiesCount={userTechnologies.length}
                    />

                    {/* Technology Tabs with Skills */}
                    <TechnologyTabs
                        technologies={userTechnologies}
                        technologySkills={technologySkills}
                        skills={skills}
                        subskills={subskills}
                        grades={grades}
                        getGradeForSubskill={getGradeForSubskill}
                        onGradeChange={handleGradeChange}
                    />
                </>
            )}
        </div>
    );


    if (isLoading) {
        return (
            <div className="space-y-6 p-6">
                <Header title="Employee Grades" subtitle="Apply and manage competency grades for individual employees" />
                <div className="grid gap-4 md:grid-cols-4">
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                    <Skeleton className="h-32" />
                </div>
                <Skeleton className="h-64" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Header
                title="Employee Grades"
                subtitle="Apply and manage competency grades for individual employees"
            />

            {/* Employee Selection and Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Select Employee</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={selectedUserId.toString()}
                            onValueChange={(v) => {
                                setSelectedUserId(parseInt(v));
                                setHasChanges(false);
                                setPendingChanges(new Map());
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                                {users.map(user => (
                                    <SelectItem key={user.id} value={user.id.toString()}>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            {user.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {selectedUser && (
                    <>
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    Skills Graded
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userSkillMaps.length + pendingChanges.size}</div>
                                <Progress value={calculateProgress()} className="mt-2 h-2" />
                                <p className="text-xs text-muted-foreground mt-1">
                                    {calculateProgress().toFixed(0)}% complete
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    Average Grade
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">L{calculateAverageGrade()}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Based on {userSkillMaps.length + pendingChanges.size} skills
                                </p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Employee Info Card */}
            {selectedUser && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                                        {getInitials(selectedUser.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{selectedUser.name}</CardTitle>
                                    <CardDescription>{selectedUser.email}</CardDescription>
                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="outline">{selectedUser.department}</Badge>
                                        {profile && <Badge>{profile.title}</Badge>}
                                    </div>
                                </div>
                            </div>
                            <Button onClick={handleSave} disabled={!hasChanges || insertUpdate.isPending}>
                                <Save className="w-4 h-4 mr-2" />
                                {insertUpdate.isPending ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            )}

            {/* Grade Legend */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">Grade Legend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-3">
                        {grades.filter(g => g.isactive).map(grade => (
                            <div key={grade.id} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded ${gradeColors[grade.gradelevel || '']}`} />
                                <span className="text-sm font-medium">{grade.gradelevel}</span>
                                <span className="text-sm text-muted-foreground">- {grade.title}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Skills Grid */}
            {selectedUser && (
                <div className="space-y-4">
                    {skillsWithSubskills.map(skill => (
                        <Card key={skill.id}>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">{skill.title}</CardTitle>
                                <CardDescription>
                                    {skill.subskills.length} sub-skills
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Sub-skill</TableHead>
                                            <TableHead>Current Grade</TableHead>
                                            <TableHead>Select Grade</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {skill.subskills.map(subskill => {
                                            const currentGradeId = getGradeForSubskill(subskill.id);
                                            const currentGrade = grades.find(g => g.id === currentGradeId);
                                            return (
                                                <TableRow key={subskill.id}>
                                                    <TableCell className="font-medium">{subskill.title}</TableCell>
                                                    <TableCell>
                                                        {currentGrade ? (
                                                            <Badge className={gradeColors[currentGrade.gradelevel || '']}>
                                                                {currentGrade.gradelevel} - {currentGrade.title}
                                                            </Badge>
                                                        ) : (
                                                            <span className="text-muted-foreground">Not graded</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Select
                                                            value={currentGradeId.toString()}
                                                            onValueChange={(v) => handleGradeChange(subskill.id, parseInt(v))}
                                                        >
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue placeholder="Select grade" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="0">Not graded</SelectItem>
                                                                {grades.filter(g => g.isactive).map(grade => (
                                                                    <SelectItem key={grade.id} value={grade.id.toString()}>
                                                                        {grade.gradelevel} - {grade.title}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
