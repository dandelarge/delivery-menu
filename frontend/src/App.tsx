import React, { useState, useEffect } from 'react';
import { Container, ThemeProvider, Typography, CssBaseline, Button } from '@mui/material';
import { appTheme } from './theme';
import { client, getAccessTokenFromLocalStorage } from './api-client';
import { Navigate, Routes, useLocation, Route, Outlet, BrowserRouter, useNavigate } from 'react-router-dom';
import { Login } from './login/Login';
import { authorization, getUserInfoFromLocalStorage } from './login/login.provider';
import { Users } from './users';
import { Menu } from './menu';
import { Layout } from './layout';
import { HomePage } from './HomePage';

interface ContextType {
  token: string | null;
  authenticated: boolean;
  userId?: string;
  userName?: string;
  userRole?: string;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;

}

export const AuthContext = React.createContext<ContextType>(null!);

export function AuthProvider({children}: {children: JSX.Element}) {

  const {name, id, role} = getUserInfoFromLocalStorage();

  console.log({name, id, role});

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

export function RequireAuth({children}: {children: JSX.Element}): JSX.Element {
  const auth = useAuth();
  const location = useLocation();

  if(!auth.authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export function RequireRole({children, role}: {children: JSX.Element, role: string}) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.userRole !== role) {
    return <Navigate to="/menu" state={{ from: location }} />;
  }
  return children;
}

export function PublicPage() {
  return <Typography variant='h2'>Public! :D</Typography>;
}

function App() {

  return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />

          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                <Route
                    path=""
                    element={
                      <HomePage />
                    }
                  />
                  <Route
                    path="menu"
                    element={
                      <Menu />
                    }/>
                  <Route
                    path="users"
                    element={
                      <RequireRole role='handler'>
                        <Users></Users>
                      </RequireRole>
                    }
                  />

                </Route>
                <Route path="/login" element={<><Outlet /></>}>
                  <Route path="" element={<Login />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
      </ThemeProvider>
  );
}

export default App;
