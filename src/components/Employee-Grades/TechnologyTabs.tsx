import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { SkillGradeTable } from './SkillGradeTable';
import { Code2, AlertCircle } from 'lucide-react';
import type { Technology, Grade, Skill, Subskill, MapTechnologySkill } from '@/types';

interface SkillWithSubskills extends Skill {
    subskills: Subskill[];
}

interface TechnologyTabsProps {
    technologies: Technology[];
    technologySkills: MapTechnologySkill[];
    skills: Skill[];
    subskills: Subskill[];
    grades: Grade[];
    getGradeForSubskill: (subskillId: number) => number;
    onGradeChange: (subskillId: number, gradeId: number) => void;
}

export function TechnologyTabs({
    technologies,
    technologySkills,
    skills,
    subskills,
    grades,
    getGradeForSubskill,
    onGradeChange,
}: TechnologyTabsProps) {
    if (technologies.length === 0) {
        return (
            <Card>
                <CardContent className="py-12">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <AlertCircle className="w-12 h-12 text-muted-foreground" />
                        <div>
                            <h3 className="font-semibold text-lg">No Technologies Assigned</h3>
                            <p className="text-muted-foreground">
                                This employee's profile doesn't have any technologies assigned.
                                Please configure technology-profile mappings first.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Get skills for a specific technology
    const getSkillsForTechnology = (technologyId: number): SkillWithSubskills[] => {
        const techSkillMappings = technologySkills.filter(ts => ts.technologyId === technologyId);
        const skillIds = techSkillMappings.map(ts => ts.skillId);

        return skills
            .filter(s => skillIds.includes(s.id) && s.isactive)
            .map(skill => ({
                ...skill,
                subskills: subskills.filter(ss => ss.skillId === skill.id && ss.isactive)
            }));
    };

    return (
        <Tabs defaultValue={technologies[0]?.id.toString()} className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-1 p-1 bg-muted">
                {technologies.map(tech => {
                    const techSkills = getSkillsForTechnology(tech.id);
                    const subskillCount = techSkills.reduce((acc, s) => acc + s.subskills.length, 0);
                    return (
                        <TabsTrigger
                            key={tech.id}
                            value={tech.id.toString()}
                            className="flex items-center gap-2 data-[state=active]:bg-background"
                        >
                            <Code2 className="w-4 h-4" />
                            <span>{tech.title}</span>
                            <span className="text-xs text-muted-foreground">({subskillCount})</span>
                        </TabsTrigger>
                    );
                })}
            </TabsList>

            {technologies.map(tech => {
                const techSkills = getSkillsForTechnology(tech.id);
                return (
                    <TabsContent key={tech.id} value={tech.id.toString()} className="mt-4">
                        <SkillGradeTable
                            skills={techSkills}
                            grades={grades}
                            getGradeForSubskill={getGradeForSubskill}
                            onGradeChange={onGradeChange}
                        />
                    </TabsContent>
                );
            })}
        </Tabs>
    );
}
