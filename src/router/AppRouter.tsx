import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Login, Register } from './routes';
import { RouteWrapper } from './RouteWrapper';

export function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RouteWrapper element={<Login />} isPrivate title='Pidão | Login' />}
        />
        <Route
          path="/register"
          element={<RouteWrapper element={<Register />} isPrivate title='Pidão | Cadastro de Cliente' />}
        />
      </Routes>
    </BrowserRouter>
  );
}