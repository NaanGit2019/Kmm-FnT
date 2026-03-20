import { UserProfile } from '@/types/auth';

export type AppRole = 'admin' | 'team_lead' | 'employee' | 'unknown';

export type AppModule =
    | 'dashboard'
    | 'technologies'
    | 'skills'
    | 'profiles'
    | 'grades'
    | 'mappings'
    | 'employee-grades'
    | 'matrix'
    | 'analytics';

export type ModulePermission = {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
};

const fullAccess: ModulePermission = { view: true, create: true, edit: true, delete: true };
const readOnly: ModulePermission = { view: true, create: false, edit: false, delete: false };
const noAccess: ModulePermission = { view: false, create: false, edit: false, delete: false };

const rolePermissions: Record<AppRole, Record<AppModule, ModulePermission>> = {
    admin: {
        dashboard: fullAccess,
        technologies: fullAccess,
        skills: fullAccess,
        profiles: fullAccess,
        grades: fullAccess,
        mappings: fullAccess,
        'employee-grades': fullAccess,
        matrix: fullAccess,
        analytics: fullAccess
    },
    team_lead: {
        dashboard: fullAccess,
        technologies: fullAccess,
        skills: fullAccess,
        profiles: fullAccess,
        grades: fullAccess,
        mappings: fullAccess,
        'employee-grades': fullAccess,
        matrix: fullAccess,
        analytics: fullAccess
    },
    employee: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        technologies: noAccess,
        skills: noAccess,
        profiles: noAccess,
        grades: noAccess,
        mappings: noAccess,
        'employee-grades': { view: true, create: false, edit: false, delete: false },
        matrix: noAccess,
        analytics: noAccess
    },
    unknown: {
        dashboard: noAccess,
        technologies: noAccess,
        skills: noAccess,
        profiles: noAccess,
        grades: noAccess,
        mappings: noAccess,
        'employee-grades': noAccess,
        matrix: noAccess,
        analytics: noAccess
    }
};

export const normalizeRole = (user?: UserProfile | null): AppRole => {
    const userTypeId = Number(user?.user_type_id ?? 0);

    if (userTypeId === 20) return 'admin';
    if (userTypeId === 21) return 'team_lead';
    if (userTypeId === 22) return 'employee';

    const value = user?.user_type_name?.trim().toLowerCase() || '';

    if (value.includes('admin')) return 'admin';
    if (value.includes('team lead') || value.includes('lead')) return 'team_lead';
    if (value.includes('employee') || value.includes('user') || value.includes('associate')) return 'employee';

    return 'unknown';
};

export const getModulePermission = (user: UserProfile | null | undefined, module: AppModule): ModulePermission => {
    const role = normalizeRole(user);
    return rolePermissions[role]?.[module] ?? noAccess;
};

export const canViewModule = (user: UserProfile | null | undefined, module: AppModule): boolean =>
    getModulePermission(user, module).view;

export const canEditModule = (user: UserProfile | null | undefined, module: AppModule): boolean =>
    getModulePermission(user, module).edit;

export const canCreateModule = (user: UserProfile | null | undefined, module: AppModule): boolean =>
    getModulePermission(user, module).create;

export const canDeleteModule = (user: UserProfile | null | undefined, module: AppModule): boolean =>
    getModulePermission(user, module).delete;
