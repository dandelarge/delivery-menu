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
}

export const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({children}: {children: JSX.Element}) {

  const {name, id, role} = getUserInfoFromLocalStorage();

  const token = getAccessTokenFromLocalStorage();
  const [authenticated, setAuthenticated] = useState(!!token);
  const [userName, setUserName] = useState(name);
  const [userId, setUserId] = useState(id);
  const [userRole, setUserRole] = useState(role);

  async function login(username:string, password:string){
    const userData = await authorization.login(username,password);
    setUserName(userData.name);
    setUserId(userData.id);
    setUserRole(userData.role);
    setAuthenticated(true);
    return userData;
  }

  async function logout(){
    setAuthenticated(false);
    return await authorization.logout()
  }

  const value = {
    authenticated,
    token,
    userName,
    userId,
    userRole,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext);
}