import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import AdmPage from "./pages/AdmPage.jsx";
import Register from "./pages/Register.jsx";
import CadastrarEstufa from "./pages/CadastrarEstufa.jsx";
import PrivateRoute from "./components/PrivateRoute";
import CadastrarSensor from "./pages/CadastrarSensor.jsx";
import SensoresList from "./pages/SensoresList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />

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
        <Route
          path="/cadastrar-estufa"
          element={
            <PrivateRoute>
              <CadastrarEstufa />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastrar-sensor"
          element={
            <PrivateRoute>
              <CadastrarSensor />
            </PrivateRoute>
          }
        />

        <Route
          path="/sensores"
          element={
            <PrivateRoute>
              <SensoresList />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
