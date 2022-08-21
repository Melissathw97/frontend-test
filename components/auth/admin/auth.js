import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Loading from '../../reusable/loading';

//api here is an axios instance which has the baseURL set according to the env.
import { api, getUserAccount } from './api';
import { useRouter } from 'next/router';
import { routes } from '../../../constants/routes';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [authed, setAuthed] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({
        id: "", name: "", email: ""
    })

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('authToken')
            if (token) {
                api.defaults.headers.Authorization = token
                const user = await getUserAccount()

                if (user) {
                    const { id, name, email } = user
                    setUserDetails({ id, name, email })
                    setAuthed(true)
                }
            }
            setLoading(false)
        }
        loadUserFromCookies()
    }, [])

    return (
        <AuthContext.Provider value={{
            isAuthenticated: authed,
            isLoading: loading,
            user: userDetails
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    if (!isLoading) {
        if (isAuthenticated) {
            return children;
        }
        router.push(routes.user.login);
    }
    return <Loading full />
};