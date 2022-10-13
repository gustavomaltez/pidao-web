import { Fragment } from 'react';

export function Redirect(): JSX.Element {

  // ToDo: add logic to redirect to the correct page
  window.location.pathname = '/login';

  return <Fragment />;
}