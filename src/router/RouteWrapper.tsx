import { Navigate } from 'react-router-dom';

// Types -----------------------------------------------------------------------

interface RouteWrapperProps {
  /** Whether the route should be available only to authenticated users. **/
  isPrivate?: boolean;
  /** Element to be rendered when the user access the route. **/
  element: JSX.Element;
  /** Title to be displayed on the current tab. **/
  title?: string;
}

// Component -------------------------------------------------------------------

export function RouteWrapper(props: RouteWrapperProps): JSX.Element {
  const { isAuthenticated } = useAuth();

  if (props.title)
    document.title = props.title;

  if (props.isPrivate && !isAuthenticated)
    return <Navigate to="/login" />;

  return props.element;
}

// Stubs -----------------------------------------------------------------------

function useAuth() {
  return {
    isAuthenticated: true,
  };
}