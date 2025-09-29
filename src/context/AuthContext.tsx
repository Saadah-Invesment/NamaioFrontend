"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
    token_type: string;
    exp: number;
    iat: number;
    free_trial_active:boolean;
    free_trial_used:boolean;
    jti: string;
    user_id: string;
    role: string;
    subscription: string;
    subscription_start: string | null;
    subscription_expire: string | null;
    days_to_expire: number;
    is_pro: boolean;
    is_signal: boolean;
};

type AuthContextType = {
    token: string | null;
    users: DecodedToken | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [users, setUser] = useState<DecodedToken | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("tezcai_token");

        if (savedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(savedToken);
               
                setToken(savedToken);
                setUser(decoded);
                 
            } catch (err) {
                console.error("Invalid token:", err);

            }
        }
        setLoading(false);
    }, []);

    const login = (newToken: string) => {
        try {
            const decoded: DecodedToken = jwtDecode(newToken);
            localStorage.setItem("token", newToken);
            setToken(newToken);
            setUser(decoded);
        } catch (err) {
            console.error("Failed to decode token:", err);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, users, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
