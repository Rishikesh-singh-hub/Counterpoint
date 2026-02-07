import { signInWithPopup, signOut, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../services/auth/firebase";
import { useState } from "react";

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
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="h-14 border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-bold">Shastrarth</h1>

        {/* Right side */}
        {!user ? (
          <button
            onClick={loginWithGoogle}
            className="border rounded-md px-4 py-1.5 text-sm hover:bg-muted"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              <img
                src={user.photoURL || ""}
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 border rounded-md bg-background shadow-md p-2">
                <p className="text-xs text-muted-foreground px-2 truncate">
                  {user.email}
                </p>

                <button
                  onClick={goToDebate}
                  className="w-full text-left px-2 py-1.5 text-sm hover:bg-muted rounded"
                >
                  Start Debate
                </button>

                <button
                  onClick={logout}
                  className="w-full text-left px-2 py-1.5 text-sm text-red-500 hover:bg-muted rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex items-center justify-center">
  <div className="max-w-xl w-full text-center px-6">
    <h2 className="text-4xl font-bold mb-2">Welcome to Shastrarth</h2>
    <p className="text-muted-foreground mb-6">
      Structured debate with logic, respect, and ideas.
    </p>

    {/* 🔥 MAIN CTA: Start Debate */}
    {user && (
      <button
        onClick={goToDebate}
        className="w-full bg-black text-white rounded-md py-3 mb-8 hover:opacity-90"
      >
        Start Debate
      </button>
    )}

    <div className="text-left border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Shastrarth Rules
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• One topic per debate</li>
        <li>• Persona-based arguments</li>
        <li>• Stay on topic</li>
        <li>• No personal attacks</li>
        <li>• Logic over emotion</li>
      </ul>
    </div>
  </div>
</main>

    </div>
  );
}
