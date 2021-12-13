import React from 'react';
import { ThemeProvider, CssBaseline,  } from '@mui/material';
import { appTheme } from './theme';
import { Routes, Route, Outlet, BrowserRouter } from 'react-router-dom';
import { Login } from './components/Login';
import { Users } from './components/Users';
import { Menu, MenuItem } from './components/Menu';
import { Layout } from './components/Layout';
import { HomePage } from './components/HomePage';
import { AuthProvider } from './providers/auth-provider';
import { RequireRole } from './routeGuards/RequireRole';
import { RequireAuth } from './routeGuards/RequireAuth';
import { OrderWaveProvider } from './providers/orderwave-provider';
import { OrderProvider } from './providers/order-provider';
import { OrderSummary } from './components/OrderSumary';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/lab';
import MakeOrderWave from './components/MakeOrderWave';
import CreateMenu from './components/CreateMenu';


function handleMenuCreated(items: MenuItem[]) {
  console.log(items.map(item => item.name));
}
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
                        <LocalizationProvider dateAdapter={DateAdapter}>
                          <Layout />
                        </LocalizationProvider>
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
                <Route
                  path="make-orderwave"
                  element={
                    <MakeOrderWave />
                  }
                />
                <Route
                  path="create-menu"
                  element={
                    <CreateMenu/>
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
