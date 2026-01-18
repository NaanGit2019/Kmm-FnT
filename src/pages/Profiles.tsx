import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { DataTable, StatusBadge, Column } from '@/components/ui/data-table';
import { useProfiles, useProfileMutation } from '@/hooks/useApi';
import type { Profile } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Profiles() {
  const { data: profiles = [], isLoading, error } = useProfiles();
  const { insertUpdate, deleteMutation } = useProfileMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [deletingProfile, setDeletingProfile] = useState<Profile | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    isactive: true,
  });

  const columns: Column<Profile>[] = [
    { key: 'id', header: 'ID' },
    { 
      key: 'title', 
      header: 'Title',
      render: (item) => (
        <span className="font-medium text-foreground">{item.title}</span>
      )
    },
    { 
      key: 'isactive', 
      header: 'Status',
      render: (item) => <StatusBadge active={item.isactive} />
    },
    { 
      key: 'createdAt', 
      header: 'Created',
      render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'
    },
  ];

  const handleAdd = () => {
    setEditingProfile(null);
    setFormData({ title: '', isactive: true });
    setDialogOpen(true);
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
    setFormData({
      title: profile.title || '',
      isactive: profile.isactive ?? true,
    });
    setDialogOpen(true);
  };

  const handleDelete = (profile: Profile) => {
    setDeletingProfile(profile);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    const profileData: Profile = {
      id: editingProfile?.id || 0,
      ...formData,
    };

    insertUpdate.mutate(profileData, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const confirmDelete = () => {
    if (deletingProfile) {
      deleteMutation.mutate(deletingProfile.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setDeletingProfile(null);
        },
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <Header title="Profiles" subtitle="Manage employee profiles and roles" />
        <div className="text-destructive">Error loading profiles: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Profiles" 
        subtitle="Manage employee profiles and roles"
      />
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <DataTable
            data={profiles}
            columns={columns}
            searchKey="title"
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addLabel="Add Profile"
          />
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingProfile ? 'Edit Profile' : 'Add Profile'}
            </DialogTitle>
            <DialogDescription>
              {editingProfile 
                ? 'Update the profile details below.'
                : 'Fill in the details to add a new profile.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Frontend Developer"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="isactive">Active</Label>
              <Switch
                id="isactive"
                checked={formData.isactive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isactive: checked }))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={insertUpdate.isPending}>
              {insertUpdate.isPending ? 'Saving...' : (editingProfile ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingProfile?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
