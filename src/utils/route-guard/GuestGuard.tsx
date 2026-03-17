import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from '@/hooks/useAuth';

// types
import { GuardProps } from '@/types/auth';
import { APP_DEFAULT_PATH } from '@/config';

// ==============================|| GUEST GUARD ||============================== //

export default function GuestGuard({ children }: GuardProps) {
    const { isLoggedIn, isInitialized } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isInitialized && isLoggedIn) {
            navigate(location?.state?.from ? location?.state?.from : APP_DEFAULT_PATH, {
                state: { from: '' },
                replace: true
            });
        }
    }, [isInitialized, isLoggedIn, navigate, location]);

    return children;
}
