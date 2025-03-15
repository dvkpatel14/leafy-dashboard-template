
import { ReactNode, useState } from "react";
import { AppHeader } from "./app-header";
import { Navigation } from "./navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader onMenuToggle={() => setMobileNavOpen(!mobileNavOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <aside className="w-64 border-r border-border bg-sidebar">
            <Navigation />
          </aside>
        )}
        
        {/* Bottom navigation for mobile */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <div className="container py-6 animate-fade-in">
            {children}
          </div>
        </main>
      </div>
      
      {/* Mobile navigation bar at bottom */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background z-10">
          <Navigation horizontal />
        </div>
      )}
      
      {/* Mobile navigation slide-in panel */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
            mobileNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setMobileNavOpen(false)}
        >
          <div 
            className={cn(
              "fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-border transition-transform duration-300",
              mobileNavOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-semibold">Menu</h2>
            </div>
            <div className="p-2">
              <Navigation />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
