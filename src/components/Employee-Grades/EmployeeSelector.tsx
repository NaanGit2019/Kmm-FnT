import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from 'lucide-react';
import type { User as UserType } from '@/types/user';

interface EmployeeSelectorProps {
    users: UserType[];
    selectedUserId: number;
    onUserChange: (userId: number) => void;
}

export function EmployeeSelector({ users, selectedUserId, onUserChange }: EmployeeSelectorProps) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-base">Select Employee</CardTitle>
            </CardHeader>
            <CardContent>
                <Select
                    value={selectedUserId ? selectedUserId.toString() : ''}
                    onValueChange={(v) => onUserChange(parseInt(v))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border z-50">
                        {users.filter(u => u.isactive).map(user => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {user.name} - {user.department}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
}