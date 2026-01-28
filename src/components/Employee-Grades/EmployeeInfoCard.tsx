import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Save } from 'lucide-react';
import type { User } from '@/types/user';
import type { Profile } from '@/types';

interface EmployeeInfoCardProps {
  user: User;
  profile: Profile | null;
  hasChanges: boolean;
  isSaving: boolean;
  onSave: () => void;
}

export function EmployeeInfoCard({ user, profile, hasChanges, isSaving, onSave }: EmployeeInfoCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{user.department}</Badge>
                {profile && <Badge>{profile.title}</Badge>}
              </div>
            </div>
          </div>
          <Button onClick={onSave} disabled={!hasChanges || isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
