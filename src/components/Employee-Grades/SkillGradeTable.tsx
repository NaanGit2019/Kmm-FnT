import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Grade, Skill, Subskill } from '@/types';
import { gradeColors } from './GradeLegend';

interface SkillWithSubskills extends Skill {
    subskills: Subskill[];
}

interface SkillGradeTableProps {
    skills: SkillWithSubskills[];
    grades: Grade[];
    getGradeForSubskill: (subskillId: number) => number;
    onGradeChange: (subskillId: number, gradeId: number) => void;
}

export function SkillGradeTable({ skills, grades, getGradeForSubskill, onGradeChange }: SkillGradeTableProps) {
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
        <Accordion type="multiple" defaultValue={skills.map(s => s.id.toString())} className="space-y-4">
            {skills.map(skill => (
                <AccordionItem key={skill.id} value={skill.id.toString()} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold">{skill.title}</span>
                            <Badge variant="secondary" className="text-xs">
                                {skill.subskills.length} sub-skills
                            </Badge>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40%]">Sub-skill</TableHead>
                                    <TableHead className="w-[30%]">Current Grade</TableHead>
                                    <TableHead className="w-[30%]">Select Grade</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {skill.subskills.map(subskill => {
                                    const currentGradeId = getGradeForSubskill(subskill.id);
                                    const currentGrade = grades.find(g => g.id === currentGradeId);
                                    return (
                                        <TableRow key={subskill.id}>
                                            <TableCell className="font-medium">{subskill.title}</TableCell>
                                            <TableCell>
                                                {currentGrade ? (
                                                    <Badge className={gradeColors[currentGrade.gradelevel || ''] || 'bg-gray-400'}>
                                                        {currentGrade.gradelevel} - {currentGrade.title}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-muted-foreground">Not graded</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Select
                                                    value={currentGradeId.toString()}
                                                    onValueChange={(v) => onGradeChange(subskill.id, parseInt(v))}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select grade" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-background border z-50">
                                                        <SelectItem value="0">Not graded</SelectItem>
                                                        {grades.filter(g => g.isactive).map(grade => (
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
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}