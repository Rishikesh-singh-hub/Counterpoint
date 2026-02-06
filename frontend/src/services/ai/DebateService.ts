import { DebateResponse } from '@/types/debate';

export interface DebateService {
  generateResponse(personaId: string, argument: string): Promise<DebateResponse>;
}
