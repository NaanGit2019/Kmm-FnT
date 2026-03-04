//import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
//import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
//import { Badge } from '@/components/ui/badge';
//import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
//import type { Grade, Skill, Subskill } from '@/types';
//import { gradeColors } from './GradeLegend';

//interface SkillWithSubskills extends Skill {
//    subskills: Subskill[];
//}

//interface SkillGradeTableProps {
//    skills: SkillWithSubskills[];
//    grades: Grade[];
//    getGradeForSubskill: (subskillId: number) => number;
//    onGradeChange: (subskillId: number, gradeId: number) => void;
//}

//export function SkillGradeTable({ skills, grades, getGradeForSubskill, onGradeChange }: SkillGradeTableProps) {
//    if (skills.length === 0) {
//        return (
//            <Card>
//                <CardContent className="py-8">
//                    <p className="text-center text-muted-foreground">
//                        No skills found for the selected technology.
//                    </p>
//                </CardContent>
//            </Card>
//        );
//    }

//    return (
//        <Accordion type="multiple" defaultValue={skills.map(s => s.id.toString())} className="space-y-4">
//            {skills.map(skill => (
//                <AccordionItem key={skill.id} value={skill.id.toString()} className="border rounded-lg px-4">
//                    <AccordionTrigger className="hover:no-underline">
//                        <div className="flex items-center gap-3">
//                            <span className="font-semibold">{skill.title}</span>
//                            <Badge variant="secondary" className="text-xs">
//                                {skill.subskills.length} sub-skills
//                            </Badge>
//                        </div>
//                    </AccordionTrigger>
//                    <AccordionContent>
//                        <Table>
//                            <TableHeader>
//                                <TableRow>
//                                    <TableHead className="w-[40%]">Sub-skill</TableHead>
//                                    <TableHead className="w-[30%]">Current Grade</TableHead>
//                                    <TableHead className="w-[30%]">Select Grade</TableHead>
//                                </TableRow>
//                            </TableHeader>
//                            <TableBody>
//                                {skill.subskills.map(subskill => {
//                                    const currentGradeId = getGradeForSubskill(subskill.id);
//                                    const currentGrade = grades.find(g => g.id === currentGradeId);
//                                    return (
//                                        <TableRow key={subskill.id}>
//                                            <TableCell className="font-medium">{subskill.title}</TableCell>
//                                            <TableCell>
//                                                {currentGrade ? (
//                                                    <Badge className={gradeColors[currentGrade.gradelevel || ''] || 'bg-gray-400'}>
//                                                        {currentGrade.gradelevel} - {currentGrade.title}
//                                                    </Badge>
//                                                ) : (
//                                                    <span className="text-muted-foreground">Not graded</span>
//                                                )}
//                                            </TableCell>
//                                            <TableCell>
//                                                <Select
//                                                    value={currentGradeId.toString()}
//                                                    onValueChange={(v) => onGradeChange(subskill.id, parseInt(v))}
//                                                >
//                                                    <SelectTrigger className="w-[180px]">
//                                                        <SelectValue placeholder="Select grade" />
//                                                    </SelectTrigger>
//                                                    <SelectContent className="bg-background border z-50">
//                                                        <SelectItem value="0">Not graded</SelectItem>
//                                                        {grades.filter(g => g.isactive).map(grade => (
//                                                            <SelectItem key={grade.id} value={grade.id.toString()}>
//                                                                {grade.gradelevel} - {grade.title}
//                                                            </SelectItem>
//                                                        ))}
//                                                    </SelectContent>
//                                                </Select>
//                                            </TableCell>
//                                        </TableRow>
//                                    );
//                                })}
//                            </TableBody>
//                        </Table>
//                    </AccordionContent>
//                </AccordionItem>
//            ))}
//        </Accordion>
//    );
//}
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Grade, Skill, Subskill } from '@/types';

interface SkillWithSubskills extends Skill {
  subskills: Subskill[];
}

interface SkillGradeTableProps {
  skills: SkillWithSubskills[];
  grades: Grade[];
  getGradeForSubskill: (subskillId: number) => number;
  onGradeChange: (subskillId: number, gradeId: number) => void;
}

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

export function SkillGradeTable({ skills, grades, getGradeForSubskill, onGradeChange }: SkillGradeTableProps) {
  const activeGrades = grades.filter(g => g.isactive);

  if (skills.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            No skills found for the selected technology.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left p-3 md:p-4 font-semibold text-foreground min-w-[160px] md:min-w-[200px] sticky left-0 bg-secondary/50 z-10">
                Skill / Sub-skill
              </th>
              {activeGrades.map((grade, index) => (
                <th key={grade.id} className="p-2 md:p-4 text-center min-w-[60px] md:min-w-[100px]">
                  <Badge
                    variant="outline"
                    className={cn("text-[10px] md:text-xs", getGradeColor(index))}
                  >
                    <span className="hidden sm:inline">{grade.gradelevel}</span>
                    <span className="sm:hidden">{grade.gradelevel}</span>
                  </Badge>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {skills.map((skill) => (
              <>
                {/* Skill Row (Header) */}
                <tr key={`skill-${skill.id}`} className="bg-muted/30">
                  <td className="p-3 md:p-4 font-semibold text-foreground sticky left-0 bg-muted/30 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-sm md:text-base">{skill.title}</span>
                      <Badge variant="secondary" className="text-[10px] md:text-xs">
                        {skill.subskills.length}
                      </Badge>
                    </div>
                  </td>
                  {activeGrades.map((grade) => (
                    <td key={grade.id} className="p-2 md:p-4 text-center">
                      <Minus className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/30 mx-auto" />
                    </td>
                  ))}
                </tr>

                {/* Subskill Rows */}
                {skill.subskills.map((subskill) => {
                  const currentGradeId = getGradeForSubskill(subskill.id);

                  return (
                    <tr
                      key={`subskill-${subskill.id}`}
                      className="hover:bg-secondary/30 transition-colors"
                    >
                      <td className="p-3 md:p-4 pl-6 md:pl-8 text-muted-foreground text-sm sticky left-0 bg-card z-10">
                        {subskill.title}
                      </td>
                      {activeGrades.map((grade, index) => {
                        const isSelected = currentGradeId === grade.id;

                        return (
                          <td key={grade.id} className="p-2 md:p-4 text-center">
                            <button
                              onClick={() => onGradeChange(subskill.id, isSelected ? 0 : grade.id)}
                              className={cn(
                                "w-7 h-7 md:w-8 md:h-8 rounded-lg border-2 transition-all duration-200 mx-auto",
                                "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50",
                                isSelected
                                  ? cn(getGradeColor(index), "border-2")
                                  : "border-border bg-background hover:border-muted-foreground/50"
                              )}
                            >
                              {isSelected && (
                                <Check className="w-3 h-3 md:w-4 md:h-4 mx-auto" />
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
