import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from './login';
import Loading from '../../reusable/loading';

//api here is an axios instance which has the baseURL set according to the env.
import { api } from './api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [authed, setAuthed] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('adminToken')
            if (token) {
                api.defaults.headers.Authorization = token
                setAuthed(true)
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuthenticated: authed, isLoading: loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (!isLoading) {
        if (!isAuthenticated) {
            return <Login/>;
        }
        return children;
    }
    return <Loading full/>
};