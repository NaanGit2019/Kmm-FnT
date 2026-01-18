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
  useSkillMaps,
  useProfileUsers,
  useSkillMapMutation
} from '@/hooks/useApi';
import type { MapSkillmap } from '@/types';

const gradeColors: Record<string, string> = {
  'L1': 'bg-slate-500',
  'L2': 'bg-blue-500',
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
  const { insertUpdate } = useSkillMapMutation();

  const isLoading = gradesLoading || skillsLoading || subskillsLoading || profilesLoading || 
                    usersLoading || skillMapsLoading || profileUsersLoading;

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [pendingChanges, setPendingChanges] = useState<Map<number, number>>(new Map());
  const [hasChanges, setHasChanges] = useState(false);

  const selectedUser = users.find(u => u.id === selectedUserId);
  const userProfile = profileUsers.find(pu => pu.userId === selectedUserId);
  const profile = userProfile ? profiles.find(p => p.id === userProfile.profileId) : null;

  const userSkillMaps = useMemo(() => 
    skillMaps.filter(sm => sm.userId === selectedUserId),
    [skillMaps, selectedUserId]
  );

  const skillsWithSubskills = useMemo(() => 
    skills.filter(s => s.isactive).map(skill => ({
      ...skill,
      subskills: subskills.filter(ss => ss.skillId === skill.id && ss.isactive)
    })),
    [skills, subskills]
  );

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
    if (allGrades.length === 0) return 0;
    const total = allGrades.reduce((acc, grade) => acc + grade, 0);
    return (total / allGrades.length).toFixed(1);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
                {users.filter(u => u.isactive).map(user => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {user.name} - {user.department}
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
