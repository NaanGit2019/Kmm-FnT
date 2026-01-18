import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { StatusBadge } from '@/components/ui/data-table';
import { useSkills, useSubskills, useSkillMutation } from '@/hooks/useApi';
import type { Skill } from '@/types';
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
import { ChevronRight, Layers } from 'lucide-react';
import { toast } from 'sonner';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export default function Skills() {
  const { data: skills = [], isLoading: skillsLoading, error: skillsError } = useSkills();
  const { data: subskills = [], isLoading: subskillsLoading } = useSubskills();
  const { insertUpdate, deleteMutation } = useSkillMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);
  const [expandedSkills, setExpandedSkills] = useState<number[]>([]);
  
  const [formData, setFormData] = useState({
    title: '',
    isactive: true,
  });

  const isLoading = skillsLoading || subskillsLoading;

  const toggleExpanded = (skillId: number) => {
    setExpandedSkills(prev => 
      prev.includes(skillId) 
        ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
    );
  };

  const getSubskillsForSkill = (skillId: number) => 
    subskills.filter(s => s.skillId === skillId);

  const handleAdd = () => {
    setEditingSkill(null);
    setFormData({ title: '', isactive: true });
    setDialogOpen(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      title: skill.title || '',
      isactive: skill.isactive ?? true,
    });
    setDialogOpen(true);
  };

  const handleDelete = (skill: Skill) => {
    setDeletingSkill(skill);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    const skillData: Skill = {
      id: editingSkill?.id || 0,
      ...formData,
    };

    insertUpdate.mutate(skillData, {
      onSuccess: () => {
        setDialogOpen(false);
      },
    });
  };

  const confirmDelete = () => {
    if (deletingSkill) {
      deleteMutation.mutate(deletingSkill.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setDeletingSkill(null);
        },
      });
    }
  };

  if (skillsError) {
    return (
      <div className="min-h-screen p-6">
        <Header title="Skills" subtitle="Manage skills and sub-skills" />
        <div className="text-destructive">Error loading skills: {skillsError.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Skills" 
        subtitle="Manage skills and sub-skills"
      />
      
      <div className="p-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Skills & Sub-skills</h3>
              <Button onClick={handleAdd}>
                Add Skill
              </Button>
            </div>

            {/* Skills List */}
            <div className="divide-y divide-border">
              {skills.map((skill) => {
                const skillSubskills = getSubskillsForSkill(skill.id);
                const isExpanded = expandedSkills.includes(skill.id);

                return (
                  <Collapsible 
                    key={skill.id}
                    open={isExpanded}
                    onOpenChange={() => toggleExpanded(skill.id)}
                  >
                    <div className="p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className={cn(
                                "h-4 w-4 transition-transform",
                                isExpanded && "rotate-90"
                              )} />
                            </Button>
                          </CollapsibleTrigger>
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Layers className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{skill.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {skillSubskills.length} sub-skills
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusBadge active={skill.isactive} />
                          <Button variant="outline" size="sm" onClick={() => handleEdit(skill)}>
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(skill)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="pl-16 pr-4 pb-4 space-y-2">
                        {skillSubskills.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-2">
                            No sub-skills defined
                          </p>
                        ) : (
                          skillSubskills.map((subskill) => (
                            <div 
                              key={subskill.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                            >
                              <span className="text-sm text-foreground">{subskill.title}</span>
                              <StatusBadge active={subskill.isactive} />
                            </div>
                          ))
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? 'Edit Skill' : 'Add Skill'}
            </DialogTitle>
            <DialogDescription>
              {editingSkill 
                ? 'Update the skill details below.'
                : 'Fill in the details to add a new skill.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Component Development"
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
              {insertUpdate.isPending ? 'Saving...' : (editingSkill ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletingSkill?.title}"? This will also remove all associated sub-skills.
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
