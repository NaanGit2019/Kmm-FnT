import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from '@/hooks/useAuth';

// types
import { GuardProps } from '@/types/auth';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }: GuardProps) {
    const { isLoggedIn, isInitialized } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isInitialized && !isLoggedIn) {
            navigate('/login', {
                state: {
                    from: location.pathname
                },
                replace: true
            });
        }
    }, [isInitialized, isLoggedIn, navigate, location]);

    return children;
}
