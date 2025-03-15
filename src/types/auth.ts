export interface UserPreferences {
  notifications: boolean;
  theme: "dark" | "light";
}

export interface User {
  email: string;
  role: string;
  preferences: UserPreferences;
  households: number[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user_id: number;
  role: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  preferences: UserPreferences;
}

export interface UpdateProfileRequest {
  password?: string;
  preferences?: Partial<UserPreferences>;
}

export interface AuthService {
  login(credentials: LoginRequest): Promise<LoginResponse>;
  register(request: RegisterRequest): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  updateProfile(updates: UpdateProfileRequest): Promise<User>;
  logout(): Promise<void>;
  isAuthenticated(): boolean;
}
