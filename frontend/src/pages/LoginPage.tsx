import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../services/auth/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔁 Redirect after login
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const loginWithGoogle = async () => {
    try {
      setSigningIn(true);
      await signInWithPopup(auth, googleProvider);
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="border border-gray-200 rounded-xl p-6 w-[360px] shadow-sm">
        <h1 className="text-xl font-semibold mb-1">Sign in</h1>
        <p className="text-sm text-gray-500 mb-5">
          Continue to Perspective
        </p>

        {/* Email input (future use) */}
        <div className="mb-4">
          <label className="text-xs text-gray-600 mb-1 block">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <button
          disabled
          className="w-full bg-gray-900 text-white rounded-md py-2 text-sm font-medium opacity-60 cursor-not-allowed"
        >
          Continue with email
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <button
          onClick={loginWithGoogle}
          disabled={signingIn}
          className="w-full border border-gray-300 rounded-md py-2 mb-2 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition"
        >
          {signingIn ? "Signing in…" : "Continue with Google"}
        </button>

        {/* GitHub (future) */}
        <button
          disabled
          className="w-full border border-gray-300 rounded-md py-2 flex items-center justify-center gap-2 text-sm opacity-60 cursor-not-allowed"
        >
          Continue with GitHub
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
