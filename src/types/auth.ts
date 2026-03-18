import { ReactElement } from 'react';

// ==============================|| TYPES - AUTH  ||============================== //

export type GuardProps = {
    children: ReactElement | null;
};

export type UserProfile = {
    business_id?: number | string;
    application_id?: number;
    user_id?: number | string;
    prefix?: string;
    username?: string;
    user_first_name?: string;
    user_last_name?: string;
    user_type_id?: number;
    user_type_name?: string;
    is_executive?: boolean;
    business_logo?: string;
    business_name?: string;
};

export interface AuthProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null;
    token?: string | null;
}

export interface AuthActionProps {
    type: string;
    payload?: AuthProps;
}

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
}

export interface AuthDataProps {
    userId: string;
}

export type AuthContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: (email: string, password: string) => Promise<void>;
    sendOtp: (username: string) => Promise<any>;
    checkSession: () => Promise<any>;
    verifyOtp: (username: string, otp: string) => Promise<any>;
    resetPassword: (username: string, newPassword: string, otp: string) => Promise<any>;
};

export type Auth0ContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserProfile | null | undefined;
    logout: () => void;
    login: () => void;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: VoidFunction;
};

export type UserModuleResponseType = {
    business: ModuleBusinessType;
    user: ModuleUserType;
    modules: UserModule[];
};

// const modules: UserModule[] = storage.getItem('userModules')?.modules
// export type UserModuleName = (typeof modules)[number]['module_name'];
// export type UserModuleId = (typeof modules)[number]['module_id'];

// export type UserSubModuleName = {
//   [M in UserModule as M['sub_module'][number] extends UserSubModule
//     ? UserSubModule['sub_module_name']
//     : never]: M['sub_module'][number]['sub_module_name'];
// }[keyof UserModule['sub_module'][number]];

// export type UserSubModuleId = {
//   [M in UserModule as M['sub_module'][number] extends UserSubModule
//     ? UserSubModule['sub_module_id']
//     : never]: M['sub_module'][number]['sub_module_id'];
// }[keyof UserModule['sub_module'][number]];

export interface ModuleBusinessType {
    business_id: number;
    business_name: string;
    business_shortname: string;
    application_id: number;
    application_name: string;
    business_logo: string;
}

export interface ModuleUserType {
    first_name: string;
    last_name: string;
    user_type_name: string;
}

export interface UserModule {
    module_id: number;
    module_name: string;
    user_type_id: number;
    access: boolean;
    link: string;
    icon_name: string;
    module_button: ModuleButton[];
    sub_module: UserSubModule[];
}

export interface UserSubModule {
    sub_module_id: number;
    sub_module_name: string;
    user_type_id: number;
    access: boolean;
    link: string;
    icon_name: string;
    sub_module_button: UserSubModuleButton[];
}

export interface UserSubModuleButton {
    sub_module_button: number;
    sub_module_button_name: string;
    user_type_id: number;
    access: boolean;
    link: string;
    icon_name: string;
}

export interface ModuleButton {
    module_button: number;
    module_button_name: string;
    user_type_id: number;
    access: boolean;
    link: string;
    icon_name: string;
}

export interface ApplicationData {
    application_id: number;
    application_name: string;
    usertype_id: number;
    user_type_name: string;
}

export interface LoginResponse {
    token: string;
    business_id: number;
    // application_id: number;
    user_id: number;
    prefix: string;
    username: string;
    password: string;
    user_first_name: string;
    user_last_name: string;
    // user_type_id: number;
    user_type_name: string;
    is_executive: boolean;
    access_module: UserModuleResponseType;
    application_data: ApplicationData[];
}
