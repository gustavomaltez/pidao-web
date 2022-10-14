import { AdminDashboardScreen, ClientDashboardScreen } from '@screens';

export function Dashboard(): JSX.Element {
  // Add logic to redirect to admin or client dashboard
  const isAdmin = window.location.hash.includes('#adm');
  return isAdmin ? <AdminDashboardScreen /> : <ClientDashboardScreen />;
}
