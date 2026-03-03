import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { mockTechnologies, mockSkills, mockSubskills, mockGrades } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';

// Sample matrix data - represents user skill levels
const sampleMatrix: Record<number, number> = {
  1: 3, // Subskill 1 -> Grade 3 (Senior)
  2: 2, // Subskill 2 -> Grade 2 (Mid)
  4: 3, // Subskill 4 -> Grade 3
  7: 4, // Subskill 7 -> Grade 4 (Lead)
  9: 2, // Subskill 9 -> Grade 2
  11: 3, // Subskill 11 -> Grade 3
};

export default function SkillMatrix() {
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');
  const [matrix, setMatrix] = useState<Record<number, number>>(sampleMatrix);

  const activeTechnologies = mockTechnologies.filter(t => t.isactive);
  const activeSkills = mockSkills.filter(s => s.isactive);
  const activeGrades = mockGrades.filter(g => g.isactive);

  const getSubskillsForSkill = (skillId: number) =>
    mockSubskills.filter(s => s.skillId === skillId && s.isactive);

  const getGradeLevel = (subskillId: number): number | null => {
    return matrix[subskillId] || null;
  };

  const setGradeLevel = (subskillId: number, gradeId: number) => {
    setMatrix(prev => ({
      ...prev,
      [subskillId]: gradeId === prev[subskillId] ? 0 : gradeId,
    }));
  };

  const getGradeColor = (gradeIndex: number) => {
    const colors = [
      'bg-chart-1/20 text-chart-1 border-chart-1/30',
      'bg-chart-2/20 text-chart-2 border-chart-2/30',
      'bg-chart-3/20 text-chart-3 border-chart-3/30',
      'bg-chart-4/20 text-chart-4 border-chart-4/30',
      'bg-chart-5/20 text-chart-5 border-chart-5/30',
    ];
    return colors[gradeIndex % colors.length];
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Skill Matrix" 
        subtitle="View and manage employee competency levels"
      />
      
      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Technology:</span>
            <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technologies</SelectItem>
                {activeTechnologies.map((tech) => (
                  <SelectItem key={tech.id} value={String(tech.id)}>
                    {tech.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grade Legend */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-medium text-muted-foreground">Grades:</span>
            {activeGrades.map((grade, index) => (
              <Badge 
                key={grade.id} 
                variant="outline"
                className={cn("text-xs", getGradeColor(index))}
              >
                {grade.gradelevel}: {grade.title}
              </Badge>
            ))}
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left p-4 font-semibold text-foreground min-w-[200px] sticky left-0 bg-secondary/50">
                    Skill / Sub-skill
                  </th>
                  {activeGrades.map((grade, index) => (
                    <th 
                      key={grade.id} 
                      className="p-4 text-center min-w-[100px]"
                    >
                      <Badge 
                        variant="outline"
                        className={cn("text-xs", getGradeColor(index))}
                      >
                        {grade.gradelevel}
                      </Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeSkills.map((skill) => {
                  const subskills = getSubskillsForSkill(skill.id);
                  
                  return (
                    <>
                      {/* Skill Row (Header) */}
                      <tr key={`skill-${skill.id}`} className="bg-muted/30">
                        <td className="p-4 font-semibold text-foreground sticky left-0 bg-muted/30">
                          {skill.title}
                        </td>
                        {activeGrades.map((grade) => (
                          <td key={grade.id} className="p-4 text-center">
                            <Minus className="w-4 h-4 text-muted-foreground/30 mx-auto" />
                          </td>
                        ))}
                      </tr>
                      
                      {/* Subskill Rows */}
                      {subskills.map((subskill) => {
                        const currentGrade = getGradeLevel(subskill.id);
                        
                        return (
                          <tr 
                            key={`subskill-${subskill.id}`}
                            className="hover:bg-secondary/30 transition-colors"
                          >
                            <td className="p-4 pl-8 text-muted-foreground sticky left-0 bg-card">
                              {subskill.title}
                            </td>
                            {activeGrades.map((grade, index) => {
                              const isSelected = currentGrade === grade.id;
                              
                              return (
                                <td key={grade.id} className="p-4 text-center">
                                  <button
                                    onClick={() => setGradeLevel(subskill.id, grade.id)}
                                    className={cn(
                                      "w-8 h-8 rounded-lg border-2 transition-all duration-200",
                                      "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                                      isSelected
                                        ? cn(getGradeColor(index), "border-2")
                                        : "border-border bg-background hover:border-muted-foreground/50"
                                    )}
                                  >
                                    {isSelected && (
                                      <Check className="w-4 h-4 mx-auto" />
                                    )}
                                  </button>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeGrades.map((grade, index) => {
            const count = Object.values(matrix).filter(v => v === grade.id).length;
            return (
              <div 
                key={grade.id}
                className={cn(
                  "rounded-xl border p-4",
                  getGradeColor(index)
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{grade.title}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <Badge variant="outline" className={getGradeColor(index)}>
                    {grade.gradelevel}
                  </Badge>
                </div>
                <p className="text-xs mt-1 opacity-70">skills at this level</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
