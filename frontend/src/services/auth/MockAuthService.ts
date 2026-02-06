import { AuthService, User } from './AuthService';

const mockUser: User = {
  id: 'mock-user-1',
  email: 'thinker@counterpoint.dev',
  displayName: 'Anonymous Thinker',
};

export class MockAuthService implements AuthService {
  private currentUser: User | null = null;

  async login(_email: string, _password: string): Promise<User> {
    this.currentUser = mockUser;
    return mockUser;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
