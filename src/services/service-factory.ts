
import { MockAuthService, mockAuthService } from "@/services/auth/mock-auth-service";

// In a real app, you would also have:
// import { RealAuthService } from "@/services/auth/real-auth-service";

// Environment setting for toggling between mock and real services
// This would be controlled by your app settings or environment
const USE_MOCK_SERVICES = true;

export function getAuthService(): MockAuthService {
  // In a real implementation, you would choose based on the setting:
  // return USE_MOCK_SERVICES ? mockAuthService : new RealAuthService();
  return mockAuthService;
}
