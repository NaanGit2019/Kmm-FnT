import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/stat-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Cpu, Layers, Users, Award, TrendingUp, Activity } from 'lucide-react';
import { useTechnology, useTechnologySkills, useTechnologyProfiles, useSkills, useProfiles, useGrades } from '@/hooks/useApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Label
} from 'recharts';
import { useMemo } from 'react';

const CHART_COLORS = [
  'hsl(217, 91%, 35%)',
  'hsl(174, 62%, 40%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(262, 83%, 58%)',
  'hsl(0, 84%, 60%)',
];

export default function Dashboard() {
  console.log('Dashboard mounted');
  const { data: technologies = [], isLoading: techLoading } = useTechnology();
  const { data: technologyTypes = [], isLoading: typesLoading } = useTechnologyTypes();
  const { data: technologySkills = [], isLoading: techSkillsLoading } = useTechnologySkills();
  const { data: technologyProfiles = [], isLoading: techProfilesLoading } = useTechnologyProfiles();
  const { data: skills = [], isLoading: skillsLoading } = useSkills();
  const { data: profiles = [], isLoading: profilesLoading } = useProfiles();
  const { data: grades = [], isLoading: gradesLoading } = useGrades();

  const isLoading = techLoading || techSkillsLoading || techProfilesLoading || skillsLoading || profilesLoading || gradesLoading;

  const mostUsedTechnology = useMemo(() => {
    const countByTech = new Map<number, number>();

    // technologySkills.forEach((item) => {
    //   if (!item?.technologyId) return;
    //   countByTech.set(item.technologyId, (countByTech.get(item.technologyId) || 0) + 1);
    // });

    technologyProfiles.forEach((item) => {
      if (!item?.technologyId) return;
      countByTech.set(item.technologyId, (countByTech.get(item.technologyId) || 0) + 1);
    });

    let topTechId = -1;
    let topCount = 0;

    for (const [technologyId, count] of countByTech.entries()) {
      if (count > topCount) {
        topCount = count;
        topTechId = technologyId;
      }
    }

    const technology = technologies.find((t) => t.id === topTechId);
    return { technology, count: topCount };
  }, [technologySkills, technologyProfiles, technologies]);
  const isLoading = techLoading || typesLoading || skillsLoading || profilesLoading || gradesLoading;

  const technologyTypeData = useMemo(() => {
    return technologyTypes.map((typeObj: { id: number; name: string } | string) => {
      const typeName = typeof typeObj === 'string' ? typeObj : typeObj.name;
      return {
        name: typeName,
        count: technologies.filter(t => t.type === typeName).length,
      };
    })
  }, [technologies, technologyTypes]);

  const skillDistribution = useMemo(() => {
    return skills.slice(0, 6).map(skill => ({
      name: skill.title?.substring(0, 15) || 'Unknown',
      value: Math.floor(Math.random() * 30) + 10 // This would be actual data from API
    }));
  }, [skills]);



  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header title="Dashboard" subtitle="Overview of your knowledge matrix" />
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-80" />
            <Skeleton className="h-80" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        subtitle="Overview of your knowledge matrix"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Technologies"
            value={technologies.length}
            icon={Cpu}
            trend={{ value: 12, label: 'from last month' }}
          />
          <StatCard
            title="Skills"
            value={skills.length}
            icon={Layers}
            trend={{ value: 8, label: 'from last month' }}
          />
          <StatCard
            title="Profiles"
            value={profiles.length}
            icon={Users}
            trend={{ value: 5, label: 'from last month' }}
          />
          <StatCard
            title="Grades"
            value={grades.length}
            icon={Award}
            trend={{ value: 0, label: 'no change' }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technology Distribution Chart */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Technologies by Type</h3>
                <p className="text-sm text-muted-foreground">Distribution across categories</p>
              </div>
              <Activity className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={technologyTypeData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  >
                    <Label
                      value="Technology Type"
                      position="centerBottom"
                      dy={15}
                      offset={-10}
                      fill="hsl(var(--foreground))"
                      fontSize={12}
                      fontWeight={500}
                    />
                  </XAxis>
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  >
                    <Label
                      value="Count"
                      angle={-90}
                      position="insideLeft"
                      fill="hsl(var(--foreground))"
                      fontSize={12}
                      fontWeight={500}
                    />
                  </YAxis>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skill Distribution Pie Chart */}
          <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Skill Distribution</h3>
                <p className="text-sm text-muted-foreground">Team competency breakdown</p>
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {skillDistribution.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Most Used Technology */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Most Used Technology
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-foreground">
              {mostUsedTechnology.technology
                ? `${mostUsedTechnology.technology.title} = ${mostUsedTechnology.count}`
                : 'No usage data available yet.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
