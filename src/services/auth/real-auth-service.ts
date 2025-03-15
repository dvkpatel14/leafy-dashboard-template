
import { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  User, 
  UpdateProfileRequest,
  AuthService
} from "@/types/auth";
import { toast } from "sonner";

/**
 * Real implementation of the AuthService
 * This would connect to your actual backend API
 */
export class RealAuthService implements AuthService {
  private apiUrl = "https://api.yourdomain.com"; // Replace with your actual API URL
  private tokenKey = "leaf-auth-token";
  
  // Helper method to handle API requests
  private async apiRequest<T>(
    endpoint: string, 
    method: string = "GET", 
    data?: any
  ): Promise<T> {
    const token = localStorage.getItem(this.tokenKey);
    
    const headers: HeadersInit = {
      "Content-Type": "application/json"
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const config: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined
    };
    
    const response = await fetch(`${this.apiUrl}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return response.json();
  }
  
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.apiRequest<LoginResponse>("/auth/login", "POST", credentials);
      
      // Save token to localStorage
      localStorage.setItem(this.tokenKey, response.access_token);
      
      return response;
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  }
  
  async register(request: RegisterRequest): Promise<void> {
    try {
      await this.apiRequest<void>("/auth/register", "POST", request);
      toast.success("Registration successful");
    } catch (error) {
      toast.error("Registration failed");
      throw error;
    }
  }
  
  async getCurrentUser(): Promise<User | null> {
    try {
      // Only attempt to get current user if we have a token
      const token = localStorage.getItem(this.tokenKey);
      if (!token) return null;
      
      return await this.apiRequest<User>("/auth/me");
    } catch (error) {
      // If token is invalid, clear it
      localStorage.removeItem(this.tokenKey);
      return null;
    }
  }
  
  async updateProfile(updates: UpdateProfileRequest): Promise<User> {
    try {
      const updatedUser = await this.apiRequest<User>("/auth/profile", "PUT", updates);
      toast.success("Profile updated successfully");
      return updatedUser;
    } catch (error) {
      toast.error("Failed to update profile");
      throw error;
    }
  }
  
  async logout(): Promise<void> {
    try {
      // In a real implementation, you may want to invalidate the token on the server
      await this.apiRequest<void>("/auth/logout", "POST");
    } catch (error) {
      console.error("Error during logout", error);
    } finally {
      // Always remove the token, even if the API call fails
      localStorage.removeItem(this.tokenKey);
      toast.info("Logged out successfully");
    }
  }
  
  isAuthenticated(): boolean {
    return localStorage.getItem(this.tokenKey) !== null;
  }
}

// Export a singleton instance
export const realAuthService = new RealAuthService();
