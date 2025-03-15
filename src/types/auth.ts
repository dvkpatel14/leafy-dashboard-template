
export interface UserPreferences {
  notifications: boolean;
  theme: "light" | "dark";
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
  preferences?: UserPreferences;
  password?: string;
}
