import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

export function Redirect(): JSX.Element {
  const navigate = useNavigate();

  // ToDo: add logic to redirect to the correct page
  navigate('/login');

  return <Fragment />;
}