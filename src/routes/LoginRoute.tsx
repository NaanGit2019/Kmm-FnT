import { lazy } from 'react';

// project-imports
import AuthLayout from '@/layout/Auth';
import Loadable from '@/components/Loadable';

// render - login
const AuthLogin = Loadable(lazy(() => import('@/pages/auth/Login')));
// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
    path: '/login',
    element: <AuthLayout />,
    children: [
        {
            index: true,
            element: <AuthLogin />
        }
    ]
};

export default LoginRoutes;
