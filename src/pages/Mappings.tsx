import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Link2, Users, Cpu, Layers } from 'lucide-react';
import { 
  useProfiles, 
  useTechnologies, 
  useSkills, 
  useUsers,
  useTechnologyProfiles,
  useTechnologySkills,
  useProfileUsers,
  useTechnologyProfileMutation,
  useTechnologySkillMutation,
  useProfileUserMutation
} from '@/hooks/useApi';
import type { MapTechnologyProfile, MapTechnologySkill, MapProfileUser } from '@/types';

export default function Mappings() {
  const { data: profiles = [], isLoading: profilesLoading } = useProfiles();
  const { data: technologies = [], isLoading: technologiesLoading } = useTechnologies();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: techProfiles = [], isLoading: techProfilesLoading } = useTechnologyProfiles();
  const { data: techSkills = [], isLoading: techSkillsLoading } = useTechnologySkills();
  const { data: profileUsers = [], isLoading: profileUsersLoading } = useProfileUsers();

  const { insertUpdate: insertTechProfile, deleteMutation: deleteTechProfile } = useTechnologyProfileMutation();
  const { insertUpdate: insertTechSkill, deleteMutation: deleteTechSkill } = useTechnologySkillMutation();
  const { insertUpdate: insertProfileUser, deleteMutation: deleteProfileUser } = useProfileUserMutation();

  const isLoading = profilesLoading || technologiesLoading || skillsLoading || usersLoading || 
                    techProfilesLoading || techSkillsLoading || profileUsersLoading;

  // Dialog states
  const [showTechProfileDialog, setShowTechProfileDialog] = useState(false);
  const [newTechProfile, setNewTechProfile] = useState({ technologyId: 0, profileId: 0 });

  const [showTechSkillDialog, setShowTechSkillDialog] = useState(false);
  const [newTechSkill, setNewTechSkill] = useState({ technologyId: 0, skillId: 0 });

  const [showProfileUserDialog, setShowProfileUserDialog] = useState(false);
  const [newProfileUser, setNewProfileUser] = useState({ profileId: 0, userId: 0 });

  const getTechnology = (id: number) => technologies.find(t => t.id === id);
  const getProfile = (id: number) => profiles.find(p => p.id === id);
  const getSkill = (id: number) => skills.find(s => s.id === id);
  const getUser = (id: number) => users.find(u => u.id === id);

  // Technology-Profile handlers
  const handleAddTechProfile = () => {
    if (newTechProfile.technologyId && newTechProfile.profileId) {
      const exists = techProfiles.some(
        tp => tp.technologyId === newTechProfile.technologyId && tp.profileId === newTechProfile.profileId
      );
      if (!exists) {
        const data: MapTechnologyProfile = {
          id: 0,
          ...newTechProfile,
          isactive: true
        };
        insertTechProfile.mutate(data, {
          onSuccess: () => {
            setShowTechProfileDialog(false);
            setNewTechProfile({ technologyId: 0, profileId: 0 });
          }
        });
      }
    }
  };

  const handleDeleteTechProfile = (id: number) => {
    deleteTechProfile.mutate(id);
  };

  // Technology-Skill handlers
  const handleAddTechSkill = () => {
    if (newTechSkill.technologyId && newTechSkill.skillId) {
      const exists = techSkills.some(
        ts => ts.technologyId === newTechSkill.technologyId && ts.skillId === newTechSkill.skillId
      );
      if (!exists) {
        const data: MapTechnologySkill = {
          id: 0,
          ...newTechSkill,
          isactive: true
        };
        insertTechSkill.mutate(data, {
          onSuccess: () => {
            setShowTechSkillDialog(false);
            setNewTechSkill({ technologyId: 0, skillId: 0 });
          }
        });
      }
    }
  };

  const handleDeleteTechSkill = (id: number) => {
    deleteTechSkill.mutate(id);
  };

  // Profile-User handlers
  const handleAddProfileUser = () => {
    if (newProfileUser.profileId && newProfileUser.userId) {
      const exists = profileUsers.some(
        pu => pu.profileId === newProfileUser.profileId && pu.userId === newProfileUser.userId
      );
      if (!exists) {
        const data: MapProfileUser = {
          id: 0,
          ...newProfileUser,
          isactive: true
        };
        insertProfileUser.mutate(data, {
          onSuccess: () => {
            setShowProfileUserDialog(false);
            setNewProfileUser({ profileId: 0, userId: 0 });
          }
        });
      }
    }
  };

  const handleDeleteProfileUser = (id: number) => {
    deleteProfileUser.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <Header title="Mappings" subtitle="Manage relationships between technologies, skills, profiles, and users" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header 
        title="Mappings" 
        subtitle="Manage relationships between technologies, skills, profiles, and users"
      />

      <Tabs defaultValue="tech-profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="tech-profile" className="gap-2">
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:inline">Technology-Profile</span>
            <span className="sm:hidden">Tech-Profile</span>
          </TabsTrigger>
          <TabsTrigger value="tech-skill" className="gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Technology-Skill</span>
            <span className="sm:hidden">Tech-Skill</span>
          </TabsTrigger>
          <TabsTrigger value="profile-user" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Profile-User</span>
            <span className="sm:hidden">User-Profile</span>
          </TabsTrigger>
        </TabsList>

        {/* Technology-Profile Tab */}
        <TabsContent value="tech-profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  Technology-Profile Mappings
                </CardTitle>
                <CardDescription>
                  Define which technologies belong to each profile role
                </CardDescription>
              </div>
              <Button onClick={() => setShowTechProfileDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technology</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {techProfiles.map((tp) => {
                    const tech = getTechnology(tp.technologyId);
                    const profile = getProfile(tp.profileId);
                    return (
                      <TableRow key={tp.id}>
                        <TableCell className="font-medium">{tech?.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tech?.type}</Badge>
                        </TableCell>
                        <TableCell>{profile?.title}</TableCell>
                        <TableCell>
                          <Badge variant={tp.isactive ? "default" : "secondary"}>
                            {tp.isactive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTechProfile(tp.id)}
                            disabled={deleteTechProfile.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technology-Skill Tab */}
        <TabsContent value="tech-skill">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Technology-Skill Mappings
                </CardTitle>
                <CardDescription>
                  Define which skills are required for each technology
                </CardDescription>
              </div>
              <Button onClick={() => setShowTechSkillDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technology</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Skill</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {techSkills.map((ts) => {
                    const tech = getTechnology(ts.technologyId);
                    const skill = getSkill(ts.skillId);
                    return (
                      <TableRow key={ts.id}>
                        <TableCell className="font-medium">{tech?.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{tech?.type}</Badge>
                        </TableCell>
                        <TableCell>{skill?.title}</TableCell>
                        <TableCell>
                          <Badge variant={ts.isactive ? "default" : "secondary"}>
                            {ts.isactive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTechSkill(ts.id)}
                            disabled={deleteTechSkill.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile-User Tab */}
        <TabsContent value="profile-user">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Profile-User Mappings
                </CardTitle>
                <CardDescription>
                  Assign users/employees to their job profiles
                </CardDescription>
              </div>
              <Button onClick={() => setShowProfileUserDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profileUsers.map((pu) => {
                    const user = getUser(pu.userId);
                    const profile = getProfile(pu.profileId);
                    return (
                      <TableRow key={pu.id}>
                        <TableCell className="font-medium">{user?.name}</TableCell>
                        <TableCell className="text-muted-foreground">{user?.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user?.department}</Badge>
                        </TableCell>
                        <TableCell>{profile?.title}</TableCell>
                        <TableCell>
                          <Badge variant={pu.isactive ? "default" : "secondary"}>
                            {pu.isactive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteProfileUser(pu.id)}
                            disabled={deleteProfileUser.isPending}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Technology-Profile Dialog */}
      <Dialog open={showTechProfileDialog} onOpenChange={setShowTechProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Technology-Profile Mapping</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Technology</Label>
              <Select 
                value={newTechProfile.technologyId.toString()} 
                onValueChange={(v) => setNewTechProfile({...newTechProfile, technologyId: parseInt(v)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  {technologies.filter(t => t.isactive).map(tech => (
                    <SelectItem key={tech.id} value={tech.id.toString()}>
                      {tech.title} ({tech.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Profile</Label>
              <Select 
                value={newTechProfile.profileId.toString()} 
                onValueChange={(v) => setNewTechProfile({...newTechProfile, profileId: parseInt(v)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.filter(p => p.isactive).map(profile => (
                    <SelectItem key={profile.id} value={profile.id.toString()}>
                      {profile.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTechProfileDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTechProfile} disabled={insertTechProfile.isPending}>
              {insertTechProfile.isPending ? 'Adding...' : 'Add Mapping'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Technology-Skill Dialog */}
      <Dialog open={showTechSkillDialog} onOpenChange={setShowTechSkillDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Technology-Skill Mapping</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Technology</Label>
              <Select 
                value={newTechSkill.technologyId.toString()} 
                onValueChange={(v) => setNewTechSkill({...newTechSkill, technologyId: parseInt(v)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  {technologies.filter(t => t.isactive).map(tech => (
                    <SelectItem key={tech.id} value={tech.id.toString()}>
                      {tech.title} ({tech.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Skill</Label>
              <Select 
                value={newTechSkill.skillId.toString()} 
                onValueChange={(v) => setNewTechSkill({...newTechSkill, skillId: parseInt(v)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skills.filter(s => s.isactive).map(skill => (
                    <SelectItem key={skill.id} value={skill.id.toString()}>
                      {skill.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTechSkillDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTechSkill} disabled={insertTechSkill.isPending}>
              {insertTechSkill.isPending ? 'Adding...' : 'Add Mapping'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile-User Dialog */}
      <Dialog open={showProfileUserDialog} onOpenChange={setShowProfileUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Profile-User Mapping</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select 
                value={newProfileUser.userId.toString()} 
                onValueChange={(v) => setNewProfileUser({...newProfileUser, userId: parseInt(v)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.isactive).map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.name} ({user.department})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Profile</Label>
              <Select 
                value={newProfileUser.profileId.toString()} 
                onValueChange={(v) => setNewProfileUser({...newProfileUser, profileId: parseInt(v)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select profile" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.filter(p => p.isactive).map(profile => (
                    <SelectItem key={profile.id} value={profile.id.toString()}>
                      {profile.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProfileUser} disabled={insertProfileUser.isPending}>
              {insertProfileUser.isPending ? 'Adding...' : 'Add Mapping'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
