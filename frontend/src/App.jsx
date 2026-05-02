import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView";
import Navbar from "./components/Navbar";

// ✅ Token check
function isValidToken() {
  const token = localStorage.getItem("token");
  return token && token !== "undefined" && token !== "null";
}

// ✅ Private Route
function PrivateRoute({ children }) {
  return isValidToken() ? children : <Navigate to="/login" replace />;
}

// ✅ Public Route
function PublicRoute({ children }) {
  return isValidToken() ? <Navigate to="/dashboard" replace /> : children;
}

// ✅ Layout
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && isValidToken() && <Navbar />}
      {children}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/projects" element={<PrivateRoute><ProjectView /></PrivateRoute>} />

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}