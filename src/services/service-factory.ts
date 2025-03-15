
import { MockAuthService, mockAuthService } from "@/services/auth/mock-auth-service";
import { AuthService } from "@/types/auth";

// Create service interface types
export interface AppServices {
  auth: AuthService;
  // Add other service types as needed
}

// Environment setting for toggling between mock and real services
type Environment = "development" | "staging" | "production";

// Determine current environment - in a real app this would come from env vars
// Using URL for now as requested, to determine environment
function getEnvironment(): Environment {
  const hostname = window.location.hostname;
  
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "development";
  } else if (hostname.includes("staging") || hostname.includes("test")) {
    return "staging";
  } else {
    return "production";
  }
}

// Create a service configuration based on environment
const serviceConfig = {
  development: {
    useMockServices: true
  },
  staging: {
    useMockServices: true
  },
  production: {
    useMockServices: false
  }
};

// Service factory
export function getServices(): AppServices {
  const env = getEnvironment();
  const config = serviceConfig[env];
  
  return {
    auth: getAuthService(config.useMockServices)
  };
}

// Individual service getters
export function getAuthService(useMock = serviceConfig[getEnvironment()].useMockServices): AuthService {
  if (useMock) {
    return mockAuthService;
  }
  
  // For real implementation, we would create and return a real auth service
  // In the future, you would uncomment and implement:
  // return new RealAuthService();
  
  // For now, still return mock service until real service is implemented
  console.warn("Real auth service not implemented yet, using mock service instead");
  return mockAuthService;
}
