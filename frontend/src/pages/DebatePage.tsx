import { useState } from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../services/auth/firebase";
import { authFetch } from "../services/ai/authFetch"



const PERSONAS = [
  { id: "apj", name: "APJ Abdul Kalam" },
  { id: "gandhi", name: "Mahatma Gandhi" },
  { id: "chanakya", name: "Chanakya" },
];

export default function DebatePage() {
  const [persona, setPersona] = useState("apj");
  const [topic, setTopic] = useState("");
  const [debateStarted, setDebateStarted] = useState(false);
  const [message, setMessage] = useState("");

  const logout = async () => {
    await signOut(auth);
  };

  const [debateId, setDebateId] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string }[]>([]);


  // STEP 1: start debate (topic + persona)
  const handleStartDebate = async () => {
    const user = auth.currentUser;
    if (!topic.trim()) return;
    if (!user) return; // safety

    try {
      const debateId = await authFetch(user, "/bot/deb", {
        method: "POST",
        body: JSON.stringify({
          persona,
          topic,
        }),
      });

      setDebateId(debateId);
      setDebateStarted(true);
      // optionally: setDebateId(response.debateId);
    } catch (err) {
      console.error("Failed to start debate", err);
    }
  };


  // STEP 2: send chat messages
  const sendChatMessage = async () => {
    if (!message.trim()) return;
    if (!debateId) return;

    const user = auth.currentUser;
    if (!user) return;

    const userMessage = message;

    try {
      const data = await authFetch(user, "/bot/msg", {
        method: "POST",
        body: JSON.stringify({
          debateId,
          message: userMessage,
          role: "user",
        }),
      });
      console.log(data)

      // expected backend response: { reply: "AI response text" }

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
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="h-14 border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-bold">Shastrarth</h1>

        <button
          onClick={logout}
          className="text-sm text-red-500 underline"
        >
          Logout
        </button>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center">
        {!debateStarted ? (
          /* ===== PHASE 1: SETUP ===== */
          <div className="w-full max-w-xl space-y-4 px-4">
            <h2 className="text-xl font-semibold text-center">
              Start a Debate
            </h2>

            {/* PERSONA SELECT */}
            <select
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* TOPIC INPUT */}
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter debate topic…"
              className="w-full border rounded-md px-4 py-2"
            />

            {/* START BUTTON */}
            <button
              onClick={handleStartDebate}
              className="w-full bg-black text-white py-2 rounded-md"
            >
              Start Debate
            </button>
          </div>
        ) : (
          /* ===== PHASE 2: CHAT AREA ===== */
          <div className="w-full max-w-4xl mx-auto px-4 space-y-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-md w-fit max-w-[80%] ${msg.role === "user"
                  ? "ml-auto bg-black text-white"
                  : "mr-auto bg-gray-100 text-black"
                  }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CHAT INPUT (ONLY AFTER DEBATE STARTS) */}
      {debateStarted && (
        <footer className="border-t px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendChatMessage()
              }
              placeholder="Enter your argument…"
              className="flex-1 border rounded-md px-4 py-2"
            />
            <button
              onClick={sendChatMessage}
              className="bg-black text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
