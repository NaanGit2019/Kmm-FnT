import { useState, useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ActiveInactiveSelector } from '@/components/ActiveInactiveSelector';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Trash2, Link2, Users, Cpu, Layers, Edit2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  useProfiles,
  useTechnology,
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
  const { data: profilesData, isLoading: profilesLoading } = useProfiles();
  const { data: technologiesData, isLoading: technologiesLoading } = useTechnology();
  const { data: skillsData, isLoading: skillsLoading } = useSkills();
  const { data: usersData, isLoading: usersLoading } = useUsers();
  const { data: techProfilesData, isLoading: techProfilesLoading } = useTechnologyProfiles();
  const { data: techSkillsData, isLoading: techSkillsLoading } = useTechnologySkills();
  const { data: profileUsersData, isLoading: profileUsersLoading } = useProfileUsers();

  const profiles = useMemo(() => profilesData ?? [], [profilesData]);
  const technologies = useMemo(() => technologiesData ?? [], [technologiesData]);
  const skills = useMemo(() => skillsData ?? [], [skillsData]);
  const users = useMemo(() => usersData ?? [], [usersData]);
  const techProfiles = useMemo(() => techProfilesData ?? [], [techProfilesData]);
  const techSkills = useMemo(() => techSkillsData ?? [], [techSkillsData]);
  const profileUsers = useMemo(() => profileUsersData ?? [], [profileUsersData]);

  const { insertUpdate: insertTechProfile, deleteMutation: deleteTechProfile } = useTechnologyProfileMutation();
  const { insertUpdate: insertTechSkill, deleteMutation: deleteTechSkill } = useTechnologySkillMutation();
  const { insertUpdate: insertProfileUser, deleteMutation: deleteProfileUser } = useProfileUserMutation();

  const isLoading = profilesLoading || technologiesLoading || skillsLoading || usersLoading ||
    techProfilesLoading || techSkillsLoading || profileUsersLoading;

  // Dialog states
  const [showTechProfileDialog, setShowTechProfileDialog] = useState(false);
  const [newTechProfile, setNewTechProfile] = useState({ technologyId: 0, profileId: 0, isactive: true });
  const [editingTechProfile, setEditingTechProfile] = useState<MapTechnologyProfile | null>(null);

  const [showTechSkillDialog, setShowTechSkillDialog] = useState(false);
  const [newTechSkill, setNewTechSkill] = useState({ technologyId: 0, skillId: 0, isactive: true });
  const [editingTechSkill, setEditingTechSkill] = useState<MapTechnologySkill | null>(null);

  const [showProfileUserDialog, setShowProfileUserDialog] = useState(false);
    const [newProfileUser, setNewProfileUser] = useState({ profileId: 0, userId: 0 });
    console.log(technologies,"tech")
  const getTechnology = (id: number) => technologies.find(t => t.id === id);
  const getProfile = (id: number) => profiles.find(p => p.id === id);
  const getSkill = (id: number) => skills.find(s => s.id === id);
  const getUser = (id: number) => users.find(u => u.id === id);

  // Technology-Profile handlers
  const handleAddTechProfile = () => {
    if (newTechProfile.technologyId && newTechProfile.profileId) {
      if (!editingTechProfile) {
        const exists = techProfiles.some(
          tp => tp.technologyId === newTechProfile.technologyId && tp.profileId === newTechProfile.profileId
        );
        if (exists) {
          return;
        }
      }
      const data: MapTechnologyProfile = {
        id: editingTechProfile?.id || 0,
        technologyId: newTechProfile.technologyId,
        profileId: newTechProfile.profileId,
        isactive: newTechProfile.isactive
      };
      insertTechProfile.mutate(data, {
        onSuccess: () => {
          setShowTechProfileDialog(false);
          setNewTechProfile({ technologyId: 0, profileId: 0, isactive: true });
          setEditingTechProfile(null);
        }
      });
    }
  };

  const handleEditTechProfile = (tp: MapTechnologyProfile) => {
    setEditingTechProfile(tp);
    setNewTechProfile({ technologyId: tp.technologyId, profileId: tp.profileId, isactive: tp.isactive ?? true });
    setShowTechProfileDialog(true);
  };

  const handleDeleteClick = (
    type: 'techProfile' | 'techSkill' | 'profileUser',
    id: number
  ) => {
    setDeleteType(type);
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteId || !deleteType) return;

    if (deleteType === 'techProfile') {
      deleteTechProfile.mutate(deleteId);
    }

    if (deleteType === 'techSkill') {
      deleteTechSkill.mutate(deleteId);
    }

    if (deleteType === 'profileUser') {
      deleteProfileUser.mutate(deleteId);
    }

    // close dialog & reset
    setDeleteDialogOpen(false);
    setDeleteType(null);
    setDeleteId(null);
  };


  // Technology-Skill handlers
  const handleAddTechSkill = () => {
    if (newTechSkill.technologyId && newTechSkill.skillId) {
      if (!editingTechSkill) {
        const exists = techSkills.some(
          ts => ts.technologyId === newTechSkill.technologyId && ts.skillId === newTechSkill.skillId
        );
        if (exists) {
          return;
        }
      }
      const data: MapTechnologySkill = {
        id: editingTechSkill?.id || 0,
        technologyId: newTechSkill.technologyId,
        skillId: newTechSkill.skillId,
        isactive: newTechSkill.isactive
      };
      insertTechSkill.mutate(data, {
        onSuccess: () => {
          setShowTechSkillDialog(false);
          setNewTechSkill({ technologyId: 0, skillId: 0, isactive: true });
          setEditingTechSkill(null);
        }
      });
    }
  };

  const handleEditTechSkill = (ts: MapTechnologySkill) => {
    setEditingTechSkill(ts);
    setNewTechSkill({ technologyId: ts.technologyId, skillId: ts.skillId, isactive: ts.isactive ?? true });
    setShowTechSkillDialog(true);
  };

  const handleDeleteTechSkill = (id: number) => {
    deleteTechSkill.mutate(id);
  };

  // Profile-User handlers
  const handleAddProfileUser = () => {
    if (newProfileUser.profileId && newProfileUser.userId) {
      if (!editingProfileUser) {
        const exists = profileUsers.some(
          pu => pu.profileId === newProfileUser.profileId && pu.userId === newProfileUser.userId
        );
        if (exists) {
          return;
        }
      }
      const data: MapProfileUser = {
        id: editingProfileUser?.id || 0,
        userId: newProfileUser.userId,
        profileId: newProfileUser.profileId,
        isactive: newProfileUser.isactive
      };
      insertProfileUser.mutate(data, {
        onSuccess: () => {
          setShowProfileUserDialog(false);
          setNewProfileUser({ profileId: 0, userId: 0, isactive: true });
          setEditingProfileUser(null);
        }
      });
    }
  };

  const handleEditProfileUser = (pu: MapProfileUser) => {
    setEditingProfileUser(pu);
    setNewProfileUser({ profileId: pu.profileId, userId: pu.userId, isactive: pu.isactive ?? true });
    setShowProfileUserDialog(true);
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

      <Tabs defaultValue="profile-user" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
          <TabsTrigger value="profile-user" className="gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Profile-User</span>
            <span className="sm:hidden">User-Profile</span>
          </TabsTrigger>
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
              <div className="flex items-center gap-2">
                <ActiveInactiveSelector value={techProfileFilter} onChange={setTechProfileFilter} />
                <Button onClick={() => setShowTechProfileDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mapping
                </Button>
              </div>
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
                  {filterByStatus(techProfiles, techProfileFilter).map((tp) => {
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
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditTechProfile(tp)}
                            >
                              <Edit2 className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick('techProfile', tp.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
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
              <div className="flex items-center gap-2">
                <ActiveInactiveSelector value={techSkillFilter} onChange={setTechSkillFilter} />
                <Button onClick={() => setShowTechSkillDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mapping
                </Button>
              </div>
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
                  {filterByStatus(techSkills, techSkillFilter).map((ts) => {
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
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditTechSkill(ts)}
                            >
                              <Edit2 className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick('techSkill', ts.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
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
              <div className="flex items-center gap-2">
                <ActiveInactiveSelector value={profileUserFilter} onChange={setProfileUserFilter} />
                <Button onClick={() => setShowProfileUserDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Mapping
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    {/* <TableHead>Email</TableHead> */}
                    {/* <TableHead>Department</TableHead> */}
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filterByStatus(profileUsers, profileUserFilter).map((pu) => {
                    const user = getUser(pu.userId);
                    const profile = getProfile(pu.profileId);
                    return (
                      <TableRow key={pu.id}>
                        <TableCell className="font-medium">{user?.name}</TableCell>
                        {/* <TableCell className="text-muted-foreground">{user?.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user?.department}</Badge>
                        </TableCell> */}
                        <TableCell>{profile?.title}</TableCell>
                        <TableCell>
                          <Badge variant={pu.isactive ? "default" : "secondary"}>
                            {pu.isactive ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditProfileUser(pu)}
                            >
                              <Edit2 className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick('profileUser', pu.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
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
      <Dialog
        open={showTechProfileDialog}
        onOpenChange={(open) => {
          setShowTechProfileDialog(open);
          if (!open) {
            setEditingTechProfile(null);
            setNewTechProfile({ technologyId: 0, profileId: 0, isactive: true });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTechProfile ? 'Edit Technology-Profile Mapping' : 'Add Technology-Profile Mapping'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Technology</Label>
              <Select
                value={newTechProfile.technologyId.toString()}
                onValueChange={(v) => setNewTechProfile({ ...newTechProfile, technologyId: parseInt(v) })}
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
                onValueChange={(v) => setNewTechProfile({ ...newTechProfile, profileId: parseInt(v) })}
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
            <div className="flex items-center justify-between">
              <Label htmlFor="tech-profile-active">Active</Label>
              <Switch
                id="tech-profile-active"
                checked={newTechProfile.isactive}
                onCheckedChange={(checked) => setNewTechProfile({ ...newTechProfile, isactive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTechProfileDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTechProfile} disabled={insertTechProfile.isPending}>
              {insertTechProfile.isPending ? (editingTechProfile ? 'Updating...' : 'Adding...') : (editingTechProfile ? 'Update Mapping' : 'Add Mapping')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Technology-Skill Dialog */}
      <Dialog
        open={showTechSkillDialog}
        onOpenChange={(open) => {
          setShowTechSkillDialog(open);
          if (!open) {
            setEditingTechSkill(null);
            setNewTechSkill({ technologyId: 0, skillId: 0, isactive: true });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTechSkill ? 'Edit Technology-Skill Mapping' : 'Add Technology-Skill Mapping'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Technology</Label>
              <Select
                value={newTechSkill.technologyId.toString()}
                onValueChange={(v) => setNewTechSkill({ ...newTechSkill, technologyId: parseInt(v) })}
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
                onValueChange={(v) => setNewTechSkill({ ...newTechSkill, skillId: parseInt(v) })}
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
            <div className="flex items-center justify-between">
              <Label htmlFor="tech-skill-active">Active</Label>
              <Switch
                id="tech-skill-active"
                checked={newTechSkill.isactive}
                onCheckedChange={(checked) => setNewTechSkill({ ...newTechSkill, isactive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTechSkillDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTechSkill} disabled={insertTechSkill.isPending}>
              {insertTechSkill.isPending ? (editingTechSkill ? 'Updating...' : 'Adding...') : (editingTechSkill ? 'Update Mapping' : 'Add Mapping')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile-User Dialog */}
      <Dialog
        open={showProfileUserDialog}
        onOpenChange={(open) => {
          setShowProfileUserDialog(open);
          if (!open) {
            setEditingProfileUser(null);
            setNewProfileUser({ profileId: 0, userId: 0, isactive: true });
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProfileUser ? 'Edit Profile-User Mapping' : 'Add Profile-User Mapping'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select
                value={newProfileUser.userId.toString()}
                onValueChange={(v) => setNewProfileUser({ ...newProfileUser, userId: parseInt(v) })}
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
                onValueChange={(v) => setNewProfileUser({ ...newProfileUser, profileId: parseInt(v) })}
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
            <div className="flex items-center justify-between">
              <Label htmlFor="profile-user-active">Active</Label>
              <Switch
                id="profile-user-active"
                checked={newProfileUser.isactive}
                onCheckedChange={(checked) => setNewProfileUser({ ...newProfileUser, isactive: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProfileUser} disabled={insertProfileUser.isPending}>
              {insertProfileUser.isPending ? (editingProfileUser ? 'Updating...' : 'Adding...') : (editingProfileUser ? 'Update Mapping' : 'Add Mapping')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Delete Confirmation Dialog */}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this mapping? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={
                deleteTechProfile.isPending ||
                deleteTechSkill.isPending ||
                deleteProfileUser.isPending
              }
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}