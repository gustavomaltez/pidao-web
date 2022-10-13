import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Dashboard, Login, Redirect, Register } from './routes';
import { RouteWrapper } from './RouteWrapper';

// Routes definitions ----------------------------------------------------------

const RedirectElement = <Redirect />;
const LoginElement = <RouteWrapper element={<Login />} isPrivate title='Pidão | Login' />;
const RegisterElement = <RouteWrapper element={<Register />} isPrivate title='Pidão | Register' />;
const DashboardElement = <RouteWrapper element={<Dashboard />} isPrivate title='Pidão | Dashboard' />;

// Router ----------------------------------------------------------------------

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={RedirectElement}
        />
        <Route
          path="/login"
          element={LoginElement}
        />
        <Route
          path="/register"
          element={RegisterElement}
        />
        <Route
          path="/dashboard"
          element={DashboardElement}
        />
      </Routes>
    </BrowserRouter>
  );
}