import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-foreground mb-2">404</h1>
        <p className="text-sm text-muted-foreground mb-6">Page not found.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
