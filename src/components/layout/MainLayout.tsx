import { Sidebar } from './Sidebar';
import AuthGuard from '@/utils/route-guard/AuthGuard';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <AuthGuard>
      <div className="flex h-screen overflow-hidden bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </AuthGuard>
  );
}
