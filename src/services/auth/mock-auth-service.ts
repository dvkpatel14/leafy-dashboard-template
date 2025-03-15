
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  User, 
  UpdateProfileRequest,
  UserPreferences
} from "@/types/auth";
import { toast } from "sonner";

// Sample mock user data
const mockUsers = [
  {
    email: "demo@example.com",
    password: "password",
    userId: 1,
    role: "user",
    preferences: {
      notifications: true,
      theme: "dark" as const
    },
    households: [1, 2]
  }
];

// Mock localStorage key
const AUTH_TOKEN_KEY = "leaf-auth-token";

export class MockAuthService {
  private delayMs = 800; // Simulate network delay

  // Helper to simulate API delay
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await this.delay(this.delayMs);
    
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user || user.password !== credentials.password) {
      toast.error("Invalid email or password");
      throw new Error("Invalid credentials");
    }
    
    const response: LoginResponse = {
      access_token: `mock-token-${user.userId}-${Date.now()}`,
      user_id: user.userId,
      role: user.role
    };
    
    // Save to localStorage to persist session
    localStorage.setItem(AUTH_TOKEN_KEY, response.access_token);
    
    return response;
  }

  async register(request: RegisterRequest): Promise<void> {
    await this.delay(this.delayMs);
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === request.email)) {
      toast.error("User already exists");
      throw new Error("User already exists");
    }
    
    // Create new user (in a real app, we'd push to a database)
    const newUser = {
      email: request.email,
      password: request.password,
      userId: mockUsers.length + 1,
      role: "user",
      preferences: {
        notifications: request.preferences.notifications,
        theme: request.preferences.theme
      },
      households: [] as number[]
    };
    
    mockUsers.push(newUser);
    toast.success("Registration successful");
  }

  async getCurrentUser(): Promise<User | null> {
    await this.delay(this.delayMs);
    
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) return null;
    
    // Extract userId from token (in real app we'd verify the token)
    const parts = token.split('-');
    const userId = parseInt(parts[1]);
    
    const user = mockUsers.find(u => u.userId === userId);
    if (!user) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      return null;
    }
    
    return {
      email: user.email,
      role: user.role,
      preferences: {
        notifications: user.preferences.notifications,
        theme: user.preferences.theme
      },
      households: user.households
    };
  }

  async updateProfile(updates: UpdateProfileRequest): Promise<User> {
    await this.delay(this.delayMs);
    
    const currentUser = await this.getCurrentUser();
    if (!currentUser) {
      toast.error("Not logged in");
      throw new Error("User not authenticated");
    }
    
    const user = mockUsers.find(u => u.email === currentUser.email);
    if (!user) throw new Error("User not found");
    
    // Update user details
    if (updates.preferences) {
      user.preferences = { 
        ...user.preferences, 
        ...updates.preferences 
      };
    }
    
    if (updates.password) {
      user.password = updates.password;
    }
    
    toast.success("Profile updated successfully");
    
    return {
      email: user.email,
      role: user.role,
      preferences: {
        notifications: user.preferences.notifications,
        theme: user.preferences.theme
      },
      households: user.households
    };
  }

  async logout(): Promise<void> {
    await this.delay(200);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    toast.info("Logged out successfully");
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_TOKEN_KEY) !== null;
  }
}

export const mockAuthService = new MockAuthService();
