import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface ActiveInactiveSelectorProps {
  value: 'active' | 'inactive';
  onChange: (value: 'active' | 'inactive') => void;
  className?: string;
}

export function ActiveInactiveSelector({
  value,
  onChange,
  className = 'w-40'
}: ActiveInactiveSelectorProps) {
  return (
    <Select value={value} onValueChange={(val: any) => onChange(val)}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
      </SelectContent>
    </Select>
  );
}
