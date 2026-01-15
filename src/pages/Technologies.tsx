import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { DataTable, StatusBadge, Column } from '@/components/ui/data-table';
import { mockTechnologies } from '@/data/mockData';
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
import { toast } from 'sonner';

const technologyTypes = ['Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Mobile', 'Other'];

export default function Technologies() {
  const [technologies, setTechnologies] = useState<Technology[]>(mockTechnologies);
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

    if (editingTechnology) {
      // Update existing
      setTechnologies(prev => 
        prev.map(t => t.id === editingTechnology.id 
          ? { ...t, ...formData, updatedAt: new Date().toISOString() }
          : t
        )
      );
      toast.success('Technology updated successfully');
    } else {
      // Create new
      const newTech: Technology = {
        id: Math.max(...technologies.map(t => t.id)) + 1,
        ...formData,
        createdAt: new Date().toISOString(),
      };
      setTechnologies(prev => [...prev, newTech]);
      toast.success('Technology created successfully');
    }
    
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deletingTechnology) {
      setTechnologies(prev => prev.filter(t => t.id !== deletingTechnology.id));
      toast.success('Technology deleted successfully');
      setDeleteDialogOpen(false);
      setDeletingTechnology(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Technologies" 
        subtitle="Manage technology stack and tools"
      />
      
      <div className="p-6">
        <DataTable
          data={technologies}
          columns={columns}
          searchKey="title"
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          addLabel="Add Technology"
        />
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
            <Button onClick={handleSubmit}>
              {editingTechnology ? 'Update' : 'Create'}
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
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
