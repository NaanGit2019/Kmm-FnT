import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@/components/Loader';

function ProtectedRoutes() {
    const { isInitialized, isLoggedIn } = useAuth();

    if (!isInitialized) {
        return <Loader />;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;
