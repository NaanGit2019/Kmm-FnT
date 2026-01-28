import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Grade } from '@/types';

interface GradeLegendProps {
    grades: Grade[];
}

const gradeColors: Record<string, string> = {
    'Level_1': 'bg-slate-500',
    'Level_2': 'bg-blue-500',
    'L3': 'bg-green-500',
    'L4': 'bg-purple-500',
    'L5': 'bg-amber-500',
};

export function GradeLegend({ grades }: GradeLegendProps) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Grade Legend</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {grades.filter(g => g.isactive).map(grade => (
                        <div key={grade.id} className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${gradeColors[grade.gradelevel || ''] || 'bg-gray-400'}`} />
                            <span className="text-sm font-medium">{grade.gradelevel}</span>
                            <span className="text-sm text-muted-foreground">- {grade.title}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export { gradeColors };