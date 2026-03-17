import { Children, lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project-imports
import Loadable from '@/components/Loadable';
import PrivateRoutes from './ProtectedRoutes';
import DashboardLayout from '@/components/layout/MainLayout';
import PagesLayout from '@/layout/Pages';

// ==============================|| AUTH ROUTES ||============================== //
const AuthLogin = Loadable(lazy(() => import('@/pages/auth/Login')));

// ==============================|| MAIN ROUTES ||============================== //

const DashboardPage = Loadable(lazy(() => import('@/pages/Dashboard')));
const TechnologiesPage = Loadable(lazy(() => import('@/pages/Technologies')));
const SkillsPage = Loadable(lazy(() => import('@/pages/Skills')));
const ProfilesPage = Loadable(lazy(() => import('@/pages/Profiles')));
const GradesPage = Loadable(lazy(() => import('@/pages/Grades')));
const SkillMatrixPage = Loadable(lazy(() => import('@/pages/SkillMatrix')));
const MappingsPage = Loadable(lazy(() => import('@/pages/Mappings')));
const EmployeeGradesPage = Loadable(lazy(() => import('@/pages/EmployeeGrades')));
const AnalyticsPage = Loadable(lazy(() => import('@/pages/Analytics')));
const NotFoundPage = Loadable(lazy(() => import('@/pages/NotFound')));

const MainRoutes = {
    path: '/',
    element: <PrivateRoutes />,
    children: [
        {
            element: <DashboardLayout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />
                },
                {
                    path: 'dashboard',
                    element: <DashboardPage />
                },
                {
                    path: 'technologies',
                    element: <TechnologiesPage />
                },
                {
                    path: 'skills',
                    element: <SkillsPage />
                },
                {
                    path: 'profiles',
                    element: <ProfilesPage />
                },
                {
                    path: 'grades',
                    element: <GradesPage />
                },
                {
                    path: 'mappings',
                    element: <MappingsPage />
                },
                {
                    path: 'employee-grades',
                    element: <EmployeeGradesPage />
                },
                {
                    path: 'matrix',
                    element: <SkillMatrixPage />
                },
                {
                    path: 'analytics',
                    element: <AnalyticsPage />
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ]
};

export default MainRoutes;
