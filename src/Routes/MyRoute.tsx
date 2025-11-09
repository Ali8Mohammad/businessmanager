import React from 'react'
import { Navigate } from "react-router-dom";

type Props = {}

export default function MyRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("authToken");

   const isAuthenticated = token && token !== "null" && token !== "undefined" && token.trim() !== "";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
