export interface User {
  id: string;
  email: string;
  displayName: string;
}

export interface AuthService {
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
}
