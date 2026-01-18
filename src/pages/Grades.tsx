import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { DataTable, StatusBadge, Column } from '@/components/ui/data-table';
import { useGrades, useGradeMutation } from '@/hooks/useApi';
import type { Grade } from '@/types';
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
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Grades() {
  const { data: grades = [], isLoading, error } = useGrades();
  const { insertUpdate, deleteMutation } = useGradeMutation();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [deletingGrade, setDeletingGrade] = useState<Grade | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    gradelevel: '',
    isactive: true,
  });

  const columns: Column<Grade>[] = [
    { key: 'id', header: 'ID' },
    { 
      key: 'title', 
      header: 'Title',
      render: (item) => (
        <span className="font-medium text-foreground">{item.title}</span>
      )
    },
    { 
      key: 'gradelevel', 
      header: 'Level',
      render: (item) => (
        <Badge variant="secondary" className="font-mono">
          {item.gradelevel}
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
    setEditingGrade(null);
    setFormData({ title: '', gradelevel: '', isactive: true });
    setDialogOpen(true);
  };

  const handleEdit = (grade: Grade) => {
    setEditingGrade(grade);
    setFormData({
      title: grade.title || '',
      gradelevel: grade.gradelevel || '',
      isactive: grade.isactive ?? true,
    });
    setDialogOpen(true);
  };

  const handleDelete = (grade: Grade) => {
    setDeletingGrade(grade);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.gradelevel) {
      toast.error('Please fill in all required fields');
      return;
    }

    const gradeData: Grade = {
      id: editingGrade?.id || 0,
      ...formData,
    };

    insertUpdate.mutate(gradeData, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const confirmDelete = () => {
    if (deletingGrade) {
      deleteMutation.mutate(deletingGrade.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setDeletingGrade(null);
        },
      });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <Header title="Grades" subtitle="Manage employee grade levels" />
        <div className="text-destructive">Error loading grades: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Grades" 
        subtitle="Manage employee grade levels"
      />
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <DataTable
            data={grades}
            columns={columns}
            searchKey="title"
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            addLabel="Add Grade"
          />
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingGrade ? 'Edit Grade' : 'Add Grade'}
            </DialogTitle>
            <DialogDescription>
              {editingGrade 
                ? 'Update the grade details below.'
                : 'Fill in the details to add a new grade.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Senior"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="gradelevel">Grade Level *</Label>
              <Input
                id="gradelevel"
                value={formData.gradelevel}
                onChange={(e) => setFormData(prev => ({ ...prev, gradelevel: e.target.value }))}
                placeholder="e.g., L3"
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
              {insertUpdate.isPending ? 'Saving...' : (editingGrade ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Grade</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingGrade?.title}"? This action cannot be undone.
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
