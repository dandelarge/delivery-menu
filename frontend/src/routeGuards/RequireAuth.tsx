import React from 'react';
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";

export function RequireAuth({children}: {children: JSX.Element}): JSX.Element {
  const auth = useAuth();
  const location = useLocation();

  if(!auth.authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}