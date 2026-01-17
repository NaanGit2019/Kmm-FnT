import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Save, User, Award, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { mockGrades, mockSkills, mockSubskills, mockProfiles } from '@/data/mockData';
import { mockUsers, mockSkillMapsExtended, mockProfileUsers } from '@/data/mockUsers';
import type { MapSkillmap } from '@/types';

const gradeColors: Record<string, string> = {
  'L1': 'bg-slate-500',
  'L2': 'bg-blue-500',
  'L3': 'bg-green-500',
  'L4': 'bg-purple-500',
  'L5': 'bg-amber-500',
};

export default function EmployeeGrades() {
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [skillMaps, setSkillMaps] = useState<MapSkillmap[]>(mockSkillMapsExtended);
  const [hasChanges, setHasChanges] = useState(false);

  const selectedUser = mockUsers.find(u => u.id === selectedUserId);
  const userProfile = mockProfileUsers.find(pu => pu.userId === selectedUserId);
  const profile = userProfile ? mockProfiles.find(p => p.id === userProfile.profileId) : null;

  const userSkillMaps = useMemo(() => 
    skillMaps.filter(sm => sm.userId === selectedUserId),
    [skillMaps, selectedUserId]
  );

  const skillsWithSubskills = useMemo(() => 
    mockSkills.filter(s => s.isactive).map(skill => ({
      ...skill,
      subskills: mockSubskills.filter(ss => ss.skillId === skill.id && ss.isactive)
    })),
    []
  );

  const getGradeForSubskill = (subskillId: number) => {
    const mapping = userSkillMaps.find(sm => sm.subskillId === subskillId);
    return mapping?.gradeid || 0;
  };

  const handleGradeChange = (subskillId: number, gradeId: number) => {
    setHasChanges(true);
    const existingIndex = skillMaps.findIndex(
      sm => sm.subskillId === subskillId && sm.userId === selectedUserId
    );

    if (existingIndex >= 0) {
      if (gradeId === 0) {
        // Remove the mapping
        setSkillMaps(skillMaps.filter((_, i) => i !== existingIndex));
      } else {
        // Update existing
        const updated = [...skillMaps];
        updated[existingIndex] = { ...updated[existingIndex], gradeid: gradeId };
        setSkillMaps(updated);
      }
    } else if (gradeId !== 0) {
      // Add new mapping
      setSkillMaps([...skillMaps, {
        id: Math.max(...skillMaps.map(sm => sm.id)) + 1,
        subskillId,
        userId: selectedUserId,
        gradeid: gradeId,
        isactive: true
      }]);
    }
  };

  const handleSave = () => {
    // Here you would call the API to save changes
    toast.success('Employee grades saved successfully!');
    setHasChanges(false);
  };

  const calculateProgress = () => {
    const totalSubskills = skillsWithSubskills.reduce((acc, s) => acc + s.subskills.length, 0);
    const gradedSubskills = userSkillMaps.length;
    return totalSubskills > 0 ? (gradedSubskills / totalSubskills) * 100 : 0;
  };

  const calculateAverageGrade = () => {
    if (userSkillMaps.length === 0) return 0;
    const total = userSkillMaps.reduce((acc, sm) => acc + (sm.gradeid || 0), 0);
    return (total / userSkillMaps.length).toFixed(1);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an employee" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.filter(u => u.isactive).map(user => (
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
                <div className="text-2xl font-bold">{userSkillMaps.length}</div>
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
                  Based on {userSkillMaps.length} skills
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
              <Button onClick={handleSave} disabled={!hasChanges}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
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
            {mockGrades.filter(g => g.isactive).map(grade => (
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
                      const currentGrade = mockGrades.find(g => g.id === currentGradeId);
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
                                {mockGrades.filter(g => g.isactive).map(grade => (
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
