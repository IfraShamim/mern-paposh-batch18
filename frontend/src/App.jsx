import { Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Apne existing CRUD component ka import yahan karein
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Routes>

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Protected Student Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;