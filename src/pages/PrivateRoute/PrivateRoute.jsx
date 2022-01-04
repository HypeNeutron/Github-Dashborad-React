import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;
  return isUser ? children : <Navigate to="/home" />;
}
