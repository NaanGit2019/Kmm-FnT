import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, TrendingUp, Layers } from 'lucide-react';

interface StatusCardsProps {
    skillsGraded: number;
    totalSkills: number;
    averageGrade: string;
    technologiesCount: number;
}

export function StatusCards({ skillsGraded, totalSkills, averageGrade, technologiesCount }: StatusCardsProps) {
    const progress = totalSkills > 0 ? (skillsGraded / totalSkills) * 100 : 0;

    return (
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Skills Graded
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{skillsGraded} / {totalSkills}</div>
                    <Progress value={progress} className="mt-2 h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                        {progress.toFixed(0)}% complete
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Average Grade
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">L{averageGrade}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Based on {skillsGraded} skills
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Technologies
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{technologiesCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Assigned via profile
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
