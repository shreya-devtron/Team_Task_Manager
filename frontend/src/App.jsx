import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView";
import Navbar from "./components/Navbar";

import "./App.css";

// ✅ Strong token check
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

// ✅ Navbar control (hide on login/signup)
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

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
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <ProjectView />
              </PrivateRoute>
            }
          />

          {/* ✅ Default routes */}
          <Route
            path="/"
            element={
              isValidToken() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="*"
            element={
              isValidToken() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}