import { AlertTriangle } from 'lucide-react';

type AccessDeniedProps = {
  message?: string;
};

export function AccessDenied({ message }: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-destructive" />
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {message || 'You do not have permission to see this page.'}
        </p>
      </div>
    </div>
  );
}
