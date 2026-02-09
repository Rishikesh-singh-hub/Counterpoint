import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "../services/auth/firebase";

import HomePage from "../pages/HomePage";
import DebatePage from "../pages/DebatePage";
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound"

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage user={user} />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Debate (protected) */}
      <Route
        path="/debate"
        element={user ? <DebatePage /> : <Navigate to="/login" replace />}
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
