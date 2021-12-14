import React, { useState } from "react";
import { getAccessTokenFromLocalStorage } from "../api-client";
import { getUserInfoFromLocalStorage, authorization } from "./login.provider";

interface AuthContextType {
  token: string | null;
  authenticated: boolean;
  userId?: string;
  userName?: string;
  userRole?: string;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isHandler:() => boolean;
  error: any;
  hasError: boolean;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({children}: {children: JSX.Element}) {

  const {name, id, role} = getUserInfoFromLocalStorage();

  const token = getAccessTokenFromLocalStorage();
  const [authenticated, setAuthenticated] = useState(!!token);
  const [userName, setUserName] = useState(name);
  const [userId, setUserId] = useState(id);
  const [userRole, setUserRole] = useState(role);
  const [error, setError] = useState<any>();
  const [hasError, setHasError] = useState(false)

  async function login(username:string, password:string){
    try {
      const userData = await authorization.login(username,password);
      setHasError(false);
      setUserName(userData.name);
      setUserId(userData.id);
      setUserRole(userData.role);
      setAuthenticated(true);
      return userData;
    } catch (error) {
      setError(error);
      setHasError(true);
    }
  }

  async function logout(){
    setAuthenticated(false);
    return await authorization.logout()
  }

  function isHandler(): boolean {
    return userRole === 'handler';
  }

  const value = {
    authenticated,
    token,
    userName,
    userId,
    userRole,
    login,
    logout,
    isHandler,
    error,
    hasError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext);
}