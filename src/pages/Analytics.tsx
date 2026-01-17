import { useMemo } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/ui/stat-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, Award, TrendingUp, BarChart3, Target, Layers } from 'lucide-react';
import { mockGrades, mockSkills, mockSubskills, mockProfiles } from '@/data/mockData';
import { mockUsers, mockSkillMapsExtended, mockProfileUsers } from '@/data/mockUsers';

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

export default function Analytics() {
  // Calculate user skill summaries
  const userSummaries = useMemo(() => {
    return mockUsers.filter(u => u.isactive).map(user => {
      const userSkills = mockSkillMapsExtended.filter(sm => sm.userId === user.id);
      const userProfile = mockProfileUsers.find(pu => pu.userId === user.id);
      const profile = userProfile ? mockProfiles.find(p => p.id === userProfile.profileId) : null;
      
      const totalGrade = userSkills.reduce((acc, sm) => acc + (sm.gradeid || 0), 0);
      const avgGrade = userSkills.length > 0 ? totalGrade / userSkills.length : 0;
      
      // Get top skills (highest grades)
      const topSkillMaps = [...userSkills].sort((a, b) => (b.gradeid || 0) - (a.gradeid || 0)).slice(0, 3);
      const topSkills = topSkillMaps.map(sm => {
        const subskill = mockSubskills.find(ss => ss.id === sm.subskillId);
        return subskill?.title || '';
      });

      return {
        user,
        profile,
        totalSkills: userSkills.length,
        avgGrade: avgGrade.toFixed(1),
        topSkills
      };
    });
  }, []);

  // Grade distribution across all users
  const gradeDistribution = useMemo(() => {
    const distribution: Record<number, number> = {};
    mockSkillMapsExtended.forEach(sm => {
      if (sm.gradeid) {
        distribution[sm.gradeid] = (distribution[sm.gradeid] || 0) + 1;
      }
    });
    
    return mockGrades.filter(g => g.isactive).map(grade => ({
      name: `${grade.gradelevel} - ${grade.title}`,
      value: distribution[grade.id] || 0,
      level: grade.gradelevel
    }));
  }, []);

  // Skills coverage by skill category
  const skillCoverage = useMemo(() => {
    return mockSkills.filter(s => s.isactive).map(skill => {
      const subskills = mockSubskills.filter(ss => ss.skillId === skill.id);
      const subskillIds = subskills.map(ss => ss.id);
      const gradedCount = mockSkillMapsExtended.filter(sm => 
        subskillIds.includes(sm.subskillId)
      ).length;
      const uniqueUsers = new Set(
        mockSkillMapsExtended.filter(sm => subskillIds.includes(sm.subskillId)).map(sm => sm.userId)
      ).size;
      
      return {
        skill: skill.title || '',
        subskillCount: subskills.length,
        gradedCount,
        uniqueUsers,
        coverage: (uniqueUsers / mockUsers.filter(u => u.isactive).length) * 100
      };
    });
  }, []);

  // Radar chart data for team skill distribution
  const teamSkillRadar = useMemo(() => {
    return mockSkills.filter(s => s.isactive).map(skill => {
      const subskills = mockSubskills.filter(ss => ss.skillId === skill.id);
      const subskillIds = subskills.map(ss => ss.id);
      const relevantMaps = mockSkillMapsExtended.filter(sm => subskillIds.includes(sm.subskillId));
      const avgGrade = relevantMaps.length > 0 
        ? relevantMaps.reduce((acc, sm) => acc + (sm.gradeid || 0), 0) / relevantMaps.length 
        : 0;
      
      return {
        skill: skill.title?.substring(0, 15) || '',
        fullName: skill.title || '',
        avgGrade: parseFloat(avgGrade.toFixed(1)),
        maxGrade: 5
      };
    });
  }, []);

  // Profile distribution
  const profileDistribution = useMemo(() => {
    const distribution: Record<number, number> = {};
    mockProfileUsers.forEach(pu => {
      distribution[pu.profileId] = (distribution[pu.profileId] || 0) + 1;
    });
    
    return mockProfiles.filter(p => p.isactive).map(profile => ({
      name: profile.title || '',
      value: distribution[profile.id] || 0
    })).filter(p => p.value > 0);
  }, []);

  // Stats
  const stats = useMemo(() => {
    const totalGradedSkills = mockSkillMapsExtended.length;
    const avgGradeAll = totalGradedSkills > 0 
      ? mockSkillMapsExtended.reduce((acc, sm) => acc + (sm.gradeid || 0), 0) / totalGradedSkills 
      : 0;
    const seniorAndAbove = mockSkillMapsExtended.filter(sm => (sm.gradeid || 0) >= 3).length;

    return {
      totalEmployees: mockUsers.filter(u => u.isactive).length,
      totalGradedSkills,
      avgGrade: avgGradeAll.toFixed(1),
      seniorPercentage: ((seniorAndAbove / totalGradedSkills) * 100).toFixed(0)
    };
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Header 
        title="Skills Analytics" 
        subtitle="Comprehensive analysis of employee skills and competency levels"
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={Users}
          description="Active team members"
        />
        <StatCard
          title="Skills Graded"
          value={stats.totalGradedSkills}
          icon={Award}
          description="Total skill assignments"
        />
        <StatCard
          title="Average Grade"
          value={`L${stats.avgGrade}`}
          icon={TrendingUp}
          description="Team-wide average"
        />
        <StatCard
          title="Senior+ Level"
          value={`${stats.seniorPercentage}%`}
          icon={Target}
          description="L3 and above"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Grade Distribution
            </CardTitle>
            <CardDescription>
              Distribution of grades across all skill assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="level" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Team Skill Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Team Skill Profile
            </CardTitle>
            <CardDescription>
              Average competency level per skill category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={teamSkillRadar}>
                  <PolarGrid className="stroke-muted" />
                  <PolarAngleAxis dataKey="skill" className="text-xs" />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} className="text-xs" />
                  <Radar
                    name="Average Grade"
                    dataKey="avgGrade"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.5}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))' 
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Distribution */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile Distribution</CardTitle>
            <CardDescription>Team composition by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={profileDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {profileDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills Coverage Table */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Skills Coverage</CardTitle>
            <CardDescription>How well each skill is covered across the team</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Skill</TableHead>
                  <TableHead>Sub-skills</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Coverage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skillCoverage.map(item => (
                  <TableRow key={item.skill}>
                    <TableCell className="font-medium">{item.skill}</TableCell>
                    <TableCell>{item.subskillCount}</TableCell>
                    <TableCell>{item.uniqueUsers}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={item.coverage} className="w-20 h-2" />
                        <span className="text-sm text-muted-foreground">
                          {item.coverage.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Employee Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Skills Leaderboard</CardTitle>
          <CardDescription>Top performers based on skill assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Profile</TableHead>
                <TableHead>Skills Graded</TableHead>
                <TableHead>Avg Grade</TableHead>
                <TableHead>Top Skills</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userSummaries
                .sort((a, b) => parseFloat(b.avgGrade) - parseFloat(a.avgGrade))
                .map((summary, index) => (
                  <TableRow key={summary.user.id}>
                    <TableCell>
                      <Badge variant={index < 3 ? "default" : "outline"}>
                        #{index + 1}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10">
                            {getInitials(summary.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{summary.user.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {summary.user.department}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {summary.profile && (
                        <Badge variant="outline">{summary.profile.title}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{summary.totalSkills}</TableCell>
                    <TableCell>
                      <Badge className="bg-primary">L{summary.avgGrade}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {summary.topSkills.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
