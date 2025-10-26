
import {createContext, useContext, useState, useEffect } from "react";
import { authUtils } from "../utils/auth";

const AuthContext = createContext();
import React from 'react'


export const useAuth = () =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const savedUser = authUtils.getUser();
      const hasToken = authUtils.isAuthenticated();

      if (savedUser && hasToken){
        setUser(savedUser);
        setIsAuthenticated(true);
      }

      setLoading(false);
    }, []);

    const login = (userData, tokens) => {
        authUtils.setUser(userData);
        authUtils.setTokens(tokens);
        setUser(userData);
        setIsAuthenticated(true)
    };

    const logout = () => {
        authUtils.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
    };
    
    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
