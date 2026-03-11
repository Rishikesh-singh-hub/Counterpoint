import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../services/ai/authFetch";

interface Persona {
  _id: string;
  name: string;
  description: string;
}

export default function Personas(): JSX.Element {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      try {
        const data = await authFetch(user, "/persona");
        setPersonas(data.allPersona);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectPersona = (persona: Persona) => {
    localStorage.setItem("selectedPersona", JSON.stringify(persona));
    navigate("/debate");
  };

  if (loading) {
    return <div className="p-6">Loading personas...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Personas</h1>

      {personas.length === 0 ? (
        <div className="text-gray-500">No personas available</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div
              key={persona._id}
              onClick={() => handleSelectPersona(persona)}
              className="bg-white shadow-md rounded-lg p-5 border cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all"
            >
              <h2 className="text-lg font-semibold mb-2">{persona.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {persona.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}