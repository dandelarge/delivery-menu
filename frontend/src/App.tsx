import React from 'react';
import { ThemeProvider, CssBaseline,  } from '@mui/material';
import { appTheme } from './theme';
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { Users } from './components/Users';
import { Menu } from './components/Menu';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { AuthProvider } from './providers/auth-provider';
import { RequireRole } from './routeGuards/RequireRole';
import { RequireAuth } from './routeGuards/RequireAuth';

function App() {

  return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
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
