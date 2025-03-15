
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const profileSchema = z.object({
  email: z.string().email(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email || "",
    },
  });
  
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const onUpdateProfile = async (values: z.infer<typeof profileSchema>) => {
    setIsUpdating(true);
    try {
      // In a real app, you would update the email, but for now, we'll just show a toast
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const onChangePassword = async (values: z.infer<typeof passwordSchema>) => {
    setIsChangingPassword(true);
    try {
      await updateProfile({
        password: values.newPassword,
      });
      toast.success("Password changed successfully");
      passwordForm.reset();
    } catch (error) {
      toast.error("Failed to change password");
      console.error(error);
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  const onToggleNotifications = async (checked: boolean) => {
    setIsUpdating(true);
    try {
      await updateProfile({
        preferences: {
          ...(user?.preferences || { theme: "light" }),
          notifications: checked,
        },
      });
      toast.success("Notification settings updated");
    } catch (error) {
      toast.error("Failed to update notification settings");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  if (!user) return null;
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <Section>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </Section>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-1 glass-card animate-fade-in">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage alt={user.email} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">{user.email.split("@")[0]}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <div className="mt-2">
                <Badge variant="outline" className="capitalize">
                  {user.role}
                </Badge>
              </div>
              <Button variant="outline" className="mt-4 w-full">Change Avatar</Button>
            </CardContent>
          </Card>
          
          <div className="md:col-span-3 space-y-6 animate-fade-in">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>
                      Update your account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} readOnly />
                              </FormControl>
                              <FormDescription>
                                Your email address is also your username.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Updating...
                            </>
                          ) : (
                            "Update Profile"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="password" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" disabled={isChangingPassword}>
                          {isChangingPassword ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Changing Password...
                            </>
                          ) : (
                            "Change Password"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Customize your application experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Notifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications about household activity
                        </p>
                      </div>
                      <Switch 
                        checked={user.preferences?.notifications || false}
                        onCheckedChange={onToggleNotifications}
                        disabled={isUpdating}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Missing import for Badge component
import { Badge } from "@/components/ui/badge";
