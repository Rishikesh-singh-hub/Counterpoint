import { signInWithPopup, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../services/auth/firebase";
import { useState } from "react";
import { Link } from "react-router-dom"

type Props = {
  user: User | null;
};

export default function HomePage({ user }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
    setOpen(false);
  };

  const goToDebate = () => {
    navigate("/debate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* ================= HEADER ================= */}
      <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6">
        {/* Left: Brand / Logo */}
        <Link
          to="/"
          className="text-xl font-bold tracking-wide select-none hover:opacity-80 transition"
        >
          <h1 className="text-xl font-bold tracking-wide select-none">
            Perspective
          </h1>
        </Link>
        {/* Right: Auth / Profile */}
        <div className="flex items-center gap-3">
          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Sign in
            </button>
          ) : (
            <button
              onClick={goToDebate}
              className="flex items-center gap-2"
              title={user.email}
            >
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-full border border-gray-300"
              />
            </button>
          )}
        </div>

      </header>



      {/* ================= MAIN ================= */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl w-full text-center px-6">
          {/* Hero */}
          <h2 className="text-4xl font-bold mb-3">
            Debate Ideas, Not People
          </h2>

          <p className="text-gray-500 mb-8">
            Perspective enables structured, persona-driven debates
            focused on logic, clarity, and respectful disagreement.
          </p>

          {/* CTA */}
          {user ? (
            <button
              onClick={goToDebate}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              Start session →
            </button>

          ) : (
            <p className="text-sm text-gray-500 mb-10">
              Sign in to begin a debate.
            </p>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
              <h3 className="font-semibold mb-2">🎭 Personas</h3>
              <p className="text-sm text-gray-500">
                Debate through distinct intellectual perspectives
                instead of generic AI responses.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
              <h3 className="font-semibold mb-2">🧠 Structured</h3>
              <p className="text-sm text-gray-500">
                One topic, focused arguments, and logical progression
                without distractions.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition">
              <h3 className="font-semibold mb-2">⚖️ Respectful</h3>
              <p className="text-sm text-gray-500">
                No personal attacks. Ideas stand or fall on merit alone.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="h-12 border-t border-gray-200 flex items-center justify-center text-xs text-gray-400">
        Built for thinkers • Perspective
      </footer>
    </div>
  );

}
