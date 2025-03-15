
import { AppLayout } from "@/components/layout/app-layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/auth-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user, updateProfile } = useAuth();
  
  // This would typically be controlled by a real setting
  const [useMockData, setUseMockData] = React.useState(true);
  
  const handleToggleMockData = (checked: boolean) => {
    setUseMockData(checked);
    toast.success(`${checked ? "Now using mock data" : "Now using production API"}`);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <Section>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings and preferences
          </p>
        </Section>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="mt-4 space-y-4">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>
                  Customize the application appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      theme === "light" 
                        ? "border-primary bg-primary/5 ring-2 ring-primary/10" 
                        : "border-border"
                    }`}
                    onClick={() => toggleTheme()}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5" />
                        <span className="font-medium">Light</span>
                      </div>
                      <div className={`h-4 w-4 rounded-full ${theme === "light" ? "bg-primary" : "bg-muted"}`} />
                    </div>
                    <div className="h-20 bg-background border rounded">
                      <div className="h-3 w-3/4 bg-primary/20 rounded m-2" />
                      <div className="h-3 w-1/2 bg-primary/20 rounded mx-2" />
                    </div>
                  </div>
                  
                  <div
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      theme === "dark" 
                        ? "border-primary bg-primary/5 ring-2 ring-primary/10" 
                        : "border-border"
                    }`}
                    onClick={() => toggleTheme()}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Moon className="h-5 w-5" />
                        <span className="font-medium">Dark</span>
                      </div>
                      <div className={`h-4 w-4 rounded-full ${theme === "dark" ? "bg-primary" : "bg-muted"}`} />
                    </div>
                    <div className="h-20 bg-background dark:bg-gray-800 border rounded">
                      <div className="h-3 w-3/4 bg-primary/20 rounded m-2" />
                      <div className="h-3 w-1/2 bg-primary/20 rounded mx-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="developer" className="mt-4 space-y-4">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Developer Settings</CardTitle>
                <CardDescription>
                  Advanced settings for development and testing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Use Mock Data</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between mock data and production API
                    </p>
                  </div>
                  <Switch 
                    checked={useMockData}
                    onCheckedChange={handleToggleMockData}
                  />
                </div>
                
                <div className="rounded-lg border p-4 bg-muted/20">
                  <h3 className="font-medium mb-2">Current Data Source</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {useMockData 
                      ? "Using mock data for all services" 
                      : "Using production API endpoints"}
                  </p>
                  <p className="text-xs font-mono bg-background p-2 rounded">
                    {useMockData 
                      ? "mockAuthService.login()" 
                      : "realAuthService.login()"}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  These settings are only visible in development mode
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

import React from "react";
