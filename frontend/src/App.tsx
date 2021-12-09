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
import { OrderWaveProvider } from './providers/orderwave-provider';
import { OrderProvider } from './providers/order-provider';
import { OrderSummary } from './components/OrderSumary';

function App() {

  return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <OrderWaveProvider>
                      <OrderProvider>
                        <Layout />
                      </OrderProvider>
                    </OrderWaveProvider>
                  </RequireAuth>
                }
              >
                <Route
                  path=""
                  element={
                    <HomePage />
                  }
                />
                <Route
                  path="menu/:id"
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
                <Route
                  path="order"
                  element={
                    <OrderSummary></OrderSummary>
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
