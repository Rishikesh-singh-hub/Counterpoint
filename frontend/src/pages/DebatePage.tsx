import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/auth/firebase";

const PERSONAS = [
  { id: "apj", name: "APJ Abdul Kalam" },
  { id: "gandhi", name: "Mahatma Gandhi" },
  { id: "chanakya", name: "Chanakya" },
];

export default function DebatePage() {
  const [persona, setPersona] = useState("apj");
  const [topic, setTopic] = useState("");

  const logout = async () => {
    await signOut(auth);
  };

  const handleSubmit = () => {
    if (!topic.trim()) return;

    console.log("Debate started:", {
      persona,
      topic,
    });

    // next step: send this to backend
    setTopic("");
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

      {/* MAIN (empty chat area for now) */}
      <main className="flex-1 flex items-center justify-center text-muted-foreground">
        <p>Select a persona and enter a topic to begin the debate</p>
      </main>

      {/* INPUT BAR (ChatGPT style) */}
      <footer className="border-t px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">

          {/* PERSONA SELECTOR */}
          <select
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm bg-background"
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
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Enter debate topic…"
            className="flex-1 border rounded-md px-4 py-2"
          />
        </div>
      </footer>
    </div>
  );
}
