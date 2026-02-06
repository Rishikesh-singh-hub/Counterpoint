import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Persona } from '@/types/persona';
import { DebateResponse } from '@/types/debate';
import { MockAuthService } from '@/services/auth/MockAuthService';
import { MockDebateService } from '@/services/ai/MockDebateService';
import { AuthService, User } from '@/services/auth/AuthService';
import { DebateService } from '@/services/ai/DebateService';
import { personas } from '@/data/personas';

type Theme = 'light' | 'dark';

interface AppState {
  user: User | null;
  selectedPersona: Persona | null;
  currentResponse: DebateResponse | null;
  isLoading: boolean;
  sidebarCollapsed: boolean;
  theme: Theme;
}

interface AppContextValue extends AppState {
  authService: AuthService;
  debateService: DebateService;
  personas: Persona[];
  selectPersona: (persona: Persona) => void;
  submitArgument: (argument: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

const authService = new MockAuthService();
const debateService = new MockDebateService();

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [currentResponse, setCurrentResponse] = useState<DebateResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const selectPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    setCurrentResponse(null);
  };

  const submitArgument = async (argument: string) => {
    if (!selectedPersona) return;
    setIsLoading(true);
    setCurrentResponse(null);
    try {
      const response = await debateService.generateResponse(selectedPersona.id, argument);
      setCurrentResponse(response);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const u = await authService.login(email, password);
    setUser(u);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <AppContext.Provider
      value={{
        user,
        selectedPersona,
        currentResponse,
        isLoading,
        sidebarCollapsed,
        theme,
        authService,
        debateService,
        personas,
        selectPersona,
        submitArgument,
        login,
        logout,
        toggleSidebar,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
