import { useState, useEffect } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../services/auth/firebase";
import { authFetch } from "../services/ai/authFetch";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User | null;
};

export default function DebatePage({ user }: Props) {
  const [persona, setPersona] = useState<string>("apj");
  const [personaName, setPersonaName] = useState<string>("Persona");
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("selectedPersona");

    if (stored) {
      const parsed = JSON.parse(stored);
      setPersona(parsed._id);
      setPersonaName(parsed.name);
    }
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const sendChatMessage = async () => {
    if (!message.trim()) return;

    const user = auth.currentUser;
    if (!user) return;

    const userMessage = message;
    console.log(["DebatePage.tsx"],persona)
    try {
      const data = await authFetch(user, "/bot/msg", {
        method: "POST",
        body: JSON.stringify({
          message: userMessage,
          persona: persona,
        }),
      });

      setChatMessages((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: data.content },
      ]);

      setMessage("");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="h-screen flex bg-white relative overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <span className="text-sm font-semibold">Sessions</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="p-4 text-sm text-gray-400">
          Sessions history coming soon
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-xl leading-none"
            >
              ☰
            </button>

            <h1
              onClick={() => navigate("/")}
              className="text-lg font-bold tracking-wide cursor-pointer"
            >
              Perspective
            </h1>
          </div>

          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              Sign in
            </button>
          ) : (
            <img
              src={user.photoURL ?? ""}
              alt="Profile"
              className="h-8 w-8 rounded-full border"
            />
          )}
        </header>

        {/* Chat */}
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {chatMessages.length === 0 && (
            <p className="text-sm text-gray-400 text-center mt-10">
              Start the session by sharing your perspective.
            </p>
          )}

          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] px-4 py-2 rounded-md text-sm ${
                msg.role === "user"
                  ? "ml-auto bg-black text-white"
                  : "mr-auto bg-gray-100 text-gray-900"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </main>

        {/* Input */}
        <footer className="border-t border-gray-200 px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/persona")}
              className="text-sm px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
            >
              {personaName}
            </button>

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
              placeholder="Enter your argument…"
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />

            <button
              onClick={sendChatMessage}
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}