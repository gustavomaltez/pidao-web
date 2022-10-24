import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';

import { AppRouter } from './router/AppRouter';

export function App(): JSX.Element {
  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}