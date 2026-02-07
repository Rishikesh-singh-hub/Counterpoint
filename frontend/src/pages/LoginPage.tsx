import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "../services/auth/firebase";
import { useEffect, useState } from "react";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  // 🔑 Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Google login
  const loginWithGoogle = async () => {
    try {
      setSigningIn(true);
      await signInWithPopup(auth, googleProvider);
    } finally {
      setSigningIn(false);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading…</div>;
  }

  if (user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="border rounded-xl p-6 w-[360px]">
          <h2 className="text-lg font-semibold">
            Welcome, {user.displayName}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>

          <button
            onClick={logout}
            className="mt-4 text-sm text-red-500 underline"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border rounded-xl p-6 w-[360px]">
        <h1 className="text-xl font-semibold mb-4">
          Sign in to Counterpoint
        </h1>

        <button
          onClick={loginWithGoogle}
          disabled={signingIn}
          className="w-full border rounded-md py-2 flex items-center justify-center gap-2"
        >
          {signingIn ? "Signing in…" : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}
