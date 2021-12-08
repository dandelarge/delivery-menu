import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

export function RequireRole({children, role}: {children: JSX.Element, role: string}) {
  const auth = useAuth();
  const location = useLocation();

  if (auth.userRole !== role) {
    return <Navigate to="/menu" state={{ from: location }} />;
  }

  return children;
}