import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DebatePage from '@/pages/DebatePage';
import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/HomePage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/debate" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/debate" element={<DebatePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
