/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useReducer } from 'react';
// reducer - state management
import { LOGIN, LOGOUT } from '@/contexts/auth-reducer/actions';
import authReducer from '@/contexts/auth-reducer/auth';
import storage from '@/utils/storage';
// project import
import Loader from '@/components/Loader';
import axiosInstance, { axiosAuthServices } from '@/utils/axios';
import { AuthProps, AuthContextType, UserProfile } from '@/types/auth';
import { LoginResponse } from '@/types/auth';
import { useGetUserModules } from '@/api/auth';
import { toast } from 'sonner';

// constant
const initialState: AuthProps = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

interface SessionTYpe {
    serviceToken?: string | null;
    user?: UserProfile | null;
}

const applicationId = import.meta.env.VITE_APP_APPLICATION_ID as string;

const setSession = ({ serviceToken, user }: SessionTYpe) => {
    if (serviceToken) {
        storage.setItem('serviceToken', serviceToken);
        storage.setItem('user', user);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        storage.removeItem('serviceToken');
        storage.removeItem('user');
        storage.removeItem('userModules');
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export const getUserData = (): UserProfile => {
    return (storage.getItem('user') || {}) as UserProfile;
};

// ==============================|| AUTH CONTEXT & PROVIDER ||============================== //

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactElement }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { mutate: getUserModules } = useGetUserModules(state?.user ?? {});
    useEffect(() => {
        const init = async () => {
            console.log('AuthContext init starting...');
            try {
                // First, check if there's an active session via cookies with timeout
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Session check timeout')), 5000)
                );

                const sessionResponse = (await Promise.race([
                    axiosAuthServices.get(`/user/session`),
                    timeoutPromise
                ]).catch(() => null)) as { data?: any } | null;

                console.log('Session response:', sessionResponse?.data);

                if (sessionResponse && sessionResponse.data) {
                    // Session exists via cookies, extract user data and store it
                    const { token: serviceToken, ...user } = sessionResponse.data;

                    setSession({ serviceToken, user });
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user,
                            isInitialized: true
                        }
                    });
                    console.log('User logged in via session');
                } else {
                    // No cookie session, check localStorage as fallback
                    const user = storage.getItem('user');
                    const serviceToken = storage.getItem('serviceToken');

                    if (user) {
                        setSession({ serviceToken, user: user });
                        dispatch({
                            type: LOGIN,
                            payload: {
                                isLoggedIn: true,
                                user: user,
                                isInitialized: true
                            }
                        });
                        console.log('User logged in via localStorage');
                    } else {
                        dispatch({ type: LOGOUT });
                        console.log('User logged out - no session or stored credentials');
                    }
                }
            } catch (err) {
                console.error('Session initialization error:', err);
                dispatch({
                    type: LOGOUT,
                    payload: {
                        isLoggedIn: false,
                        user: null,
                        isInitialized: true
                    }
                });
            }
        };

        init();
    }, []);

    useEffect(() => {
        if (state.user) {
            const currentPath = window.location.pathname.toLowerCase();
            const skipModuleFetch = currentPath.includes('/employeegrades') || currentPath.includes('/employee-grades');

            // Only fetch auth modules for routes that need module-based access control.
            // Employee Grades page should use payroll endpoint, not this auth module endpoint.
            if (!skipModuleFetch) {
                getUserModules();
            }
        }
        return () => { };
    }, [state.user]);

    useEffect(() => {
        if (state.user?.business_name) {
            document.title = state.user?.business_name;
        } else {
            document.title = 'Portal';
        }
    }, [state.user?.business_name]);

    const login = async (username: string, password: string) => {
        try {
            const response = await axiosAuthServices.post(`/user/signin/`, {
                username,
                password,
                application_id: [applicationId],
                device_type_id: 2
            });
            const { token: serviceToken, ...user }: LoginResponse = response.data;

            setSession({ serviceToken, user });
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
                }
            });
        } catch (error: any | { detail: string }) {
            if (error) {
                toast.error(error.message || error.detail || error.response?.data?.message || 'Login failed');
            }
        }
    };

    const checkSession = async () => {
        try {
            const response = await axiosAuthServices.get(`/user/session`);
            if (response.data && response.data.status === 'success') {
                // Update session with fresh data from cookies
                const { token: serviceToken, ...user } = response.data.data || response.data;
                setSession({ serviceToken, user });
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user
                    }
                });
            }
            return response.data;
        } catch (error) {
            return null;
        }
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
        storage.clear();
    };

    React.useEffect(() => {
        if (import.meta.env.DEV) {
            console.log('AuthProvider state:', {
                isInitialized: state.isInitialized,
                isLoggedIn: state.isLoggedIn,
                user: state.user
            });
        }
    }, [state]);

    const sendOtp = async (username: string) => {
        try {
            const response = await axiosAuthServices.post(`/user/password/reset/otp/generation/`, { username });
            return response.data;
        } catch (error: any) {
            if (error) {
                toast.error(error.message || error.detail || error.response?.data?.message || 'Failed to send OTP');
            }
            return null;
        }
    };

    const verifyOtp = async (username: string, otp: string) => {
        try {
            const response = await axiosAuthServices.post(`/user/password/reset/otp/verification/`, { username, otp });
            return response.data;
        } catch (error: any) {
            if (error) {
                toast.error(error.message || error.detail?.msg || error.response?.data?.message || 'Failed to verify OTP');
            }
            return null;
        }
    };

    const resetPassword = async (username: string, newPassword: string, otp: string) => {
        try {
            const response = await axiosAuthServices.post(`/user/password/reset/`, {
                username,
                password: newPassword,
                confirm_password: newPassword,
                otp
            });
            return response.data;
        } catch (error: any) {
            if (error) {
                toast.error(error.message || error.detail || error.response?.data?.message || 'Failed to reset password');
            }
            return null;
        }
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                checkSession,
                sendOtp,
                verifyOtp,
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
