import { useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, Component }) => {
  const nav = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      nav("/signin", { replace: true })
    }
  }, [isAuthenticated, nav])

  return <Component />
};

export default ProtectedRoute;
