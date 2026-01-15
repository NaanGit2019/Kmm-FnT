import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/stat-card';
import { Cpu, Layers, Users, Award, TrendingUp, Activity } from 'lucide-react';
import { dashboardStats, mockTechnologies, mockSkills, mockProfiles } from '@/data/mockData';
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
  Legend
} from 'recharts';

const technologyTypeData = [
  { name: 'Frontend', count: mockTechnologies.filter(t => t.type === 'Frontend').length },
  { name: 'Backend', count: mockTechnologies.filter(t => t.type === 'Backend').length },
  { name: 'Database', count: mockTechnologies.filter(t => t.type === 'Database').length },
  { name: 'Cloud', count: mockTechnologies.filter(t => t.type === 'Cloud').length },
  { name: 'DevOps', count: mockTechnologies.filter(t => t.type === 'DevOps').length },
];

const skillDistribution = [
  { name: 'Component Dev', value: 25 },
  { name: 'State Mgmt', value: 20 },
  { name: 'API Integration', value: 18 },
  { name: 'Database', value: 15 },
  { name: 'Testing', value: 12 },
  { name: 'CI/CD', value: 10 },
];

const CHART_COLORS = [
  'hsl(217, 91%, 35%)',
  'hsl(174, 62%, 40%)',
  'hsl(142, 71%, 45%)',
  'hsl(38, 92%, 50%)',
  'hsl(262, 83%, 58%)',
  'hsl(0, 84%, 60%)',
];

export default function Dashboard() {
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
            value={dashboardStats.totalTechnologies}
            icon={Cpu}
            trend={{ value: 12, label: 'from last month' }}
          />
          <StatCard
            title="Skills"
            value={dashboardStats.totalSkills}
            icon={Layers}
            trend={{ value: 8, label: 'from last month' }}
          />
          <StatCard
            title="Profiles"
            value={dashboardStats.totalProfiles}
            icon={Users}
            trend={{ value: 5, label: 'from last month' }}
          />
          <StatCard
            title="Grades"
            value={dashboardStats.totalGrades}
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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={technologyTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
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

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Technologies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTechnologies.slice(0, 4).map((tech) => (
              <div 
                key={tech.id}
                className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{tech.title}</p>
                  <p className="text-sm text-muted-foreground">{tech.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
