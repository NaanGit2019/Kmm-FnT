import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { DataTable, StatusBadge, Column } from '@/components/ui/data-table';
import { useTechnologies, useTechnologyMutation } from '@/hooks/useApi';
import type { Technology } from '@/types';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const technologyTypes = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Mobile', 'Other'];

export default function Technologies() {
  const { data: technologies = [], isLoading, error } = useTechnologies();
  const { insertUpdate, deleteMutation } = useTechnologyMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<Technology | null>(null);
  const [deletingTechnology, setDeletingTechnology] = useState<Technology | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    isactive: true,
  });

  const columns: Column<Technology>[] = [
    { key: 'id', header: 'ID' },
    { 
      key: 'title', 
      header: 'Title',
      render: (item) => (
        <span className="font-medium text-foreground">{item.title}</span>
      )
    },
    { 
      key: 'type', 
      header: 'Type',
      render: (item) => (
        <Badge variant="outline" className="font-normal">
          {item.type}
        </Badge>
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
    setEditingTechnology(null);
    setFormData({ title: '', type: '', isactive: true });
    setDialogOpen(true);
  };

  const handleEdit = (tech: Technology) => {
    setEditingTechnology(tech);
    setFormData({
      title: tech.title || '',
      type: tech.type || '',
      isactive: tech.isactive ?? true,
    });
    setDialogOpen(true);
  };

  const handleDelete = (tech: Technology) => {
    setDeletingTechnology(tech);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    const techData: Technology = {
      id: editingTechnology?.id || 0,
      ...formData,
    };

    insertUpdate.mutate(techData, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const confirmDelete = () => {
    if (deletingTechnology) {
      deleteMutation.mutate(deletingTechnology.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setDeletingTechnology(null);
        },
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <Header title="Technologies" subtitle="Manage technology stack and tools" />
        <div className="text-destructive">Error loading technologies: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Technologies" 
        subtitle="Manage technology stack and tools"
      />
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <DataTable
            data={technologies}
            columns={columns}
            searchKey="title"
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addLabel="Add Technology"
          />
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingTechnology ? 'Edit Technology' : 'Add Technology'}
            </DialogTitle>
            <DialogDescription>
              {editingTechnology 
                ? 'Update the technology details below.'
                : 'Fill in the details to add a new technology.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., React, Node.js"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {technologyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {insertUpdate.isPending ? 'Saving...' : (editingTechnology ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Technology</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingTechnology?.title}"? This action cannot be undone.
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
