import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { AppRouter } from './router/AppRouter';

export function App(): JSX.Element {

  useEffect(() => {
    window.localStorage.clear();
  }, []);

  return (
    <>
      <AppRouter />
      <ToastContainer />
    </>
  );
}