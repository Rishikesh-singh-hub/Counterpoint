export interface DebateArgument {
  persona: string;
  content: string;
  timestamp: number;
}

export interface DebateResponse {
  position: string;
  coreReasoning: string;
  whereYoureRight: string;
  whereYoureWeak: string;
  strongerVersion: string;
}

export interface DebateSession {
  id: string;
  personaId: string;
  argument: DebateArgument;
  response: DebateResponse | null;
  createdAt: number;
}
