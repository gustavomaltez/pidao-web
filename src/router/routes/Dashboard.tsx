import { AdminDashboardScreen, ClientDashboardScreen } from '@screens';

export function Dashboard(): JSX.Element {
  const user = JSON.parse(window.localStorage.getItem('user') || '{}');
  const isAdmin = user.type === 'admin';
  return isAdmin ? <AdminDashboardScreen /> : <ClientDashboardScreen />;
}
