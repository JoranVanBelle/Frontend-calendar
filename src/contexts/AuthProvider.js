import { createContext, useState, useMemo, useEffect, useCallback, useContext } from "react";
import config from '../config.json';
import * as usersApi from '../api/users';
import * as api from "../api";

const JWT_TOKEN_KEY = config.token_key;
const AuthContext = createContext();

function parseJwt(token) {
    if (!token) return {};
    const base64url = token.split('.')[1];
    const payload = Buffer.from(base64url, 'base64');
    const jsonPayload = payload.toString('ascii');
    return JSON.parse(jsonPayload);
}

function parseExp(exp) {
    if (!exp) return null;
    if (typeof exp !== 'number') exp = Number(exp);
    if(isNaN(exp)) return null;
    return new Date(exp * 1000);

}

const useAuth = () => useContext(AuthContext);

export const useSession = () => {
    const { loading, error, token, user, ready, hasRole } = useAuth();
    return { loading, 
        error, 
        token, 
        user, 
        ready,
        isAuthed: Boolean(token),
        hasRole,
    };
}

export const useLogin = () => {
    const { login } = useAuth();
    return login;
}

export const useLogout = () => {
    const { logout } = useAuth();
    return logout;
}

export const useRegister = () => {
    const { register } = useAuth();
    return register;
}

export const AuthProvider = ({
    children
}) => {
    const [ready, setReady] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
    const [user, setUser] = useState(null);

      const setSession = useCallback(async (token, user) => {
    const { exp, userId } = parseJwt(token);
    const expiry = parseExp(exp);
    const stillValid = expiry >= new Date();

    if (stillValid) {
      localStorage.setItem(JWT_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(JWT_TOKEN_KEY);
      token = null;
    }

    api.setAuthToken(token);
    setToken(token);
    setReady(token && stillValid);

    if (!user && stillValid) {
      user = await usersApi.getById(userId);
    }
    setUser(user);
  }, []);

    useEffect(() => {
        setSession(token, null);
    }, [setSession, token]);

    const login = useCallback( async (email, password) => {
        try {
            setError('');
            setLoading(true);
            const {token, user} = await usersApi.login(email, password);
            await setSession(token, user);
            return true;
        } catch (error) {
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [setSession]);

    const logout = useCallback(() => {
        setSession(null, null);
    }, [setSession]);

    const register = useCallback( async ({name, email, password}) => {
        try {
            setError('');
            setLoading(true);
            const {token, user} = await usersApi.register({name, email, password});
            await setSession(token, user);
            return true;
        } catch (error) {
            setError(error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [setSession]);

    const hasRole = useCallback((role) => {
        if (!user) return false;
        return user.roles.includes(role);
    }, [user])

    const value = useMemo(() => ({
        loading, 
        error,
        token,
        user,
        ready,
        login,
        logout,
        register,
        hasRole,
    }), [loading, error, token, user, ready, login, logout, register, hasRole]);

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
