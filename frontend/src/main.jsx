import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import AdmPage from "./pages/AdmPage.jsx";
import Register from "./pages/Register.jsx";
import PrivateRoute from "./components/PrivateRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {}
        <Route path="/login" element={<Login />} /> {}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdmPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute>
              <Register />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
