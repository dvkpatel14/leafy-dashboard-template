
import { AppLayout } from "@/components/layout/app-layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Mail, Plus, Settings, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Household() {
  // Sample household data
  const household = {
    name: "Smith Household",
    members: [
      {
        id: 1,
        name: "Taylor Smith",
        email: "taylor@example.com",
        role: "Admin",
        avatar: "",
        status: "Active",
      },
      {
        id: 2,
        name: "Sam Johnson",
        email: "sam@example.com",
        role: "Member",
        avatar: "",
        status: "Active",
      },
      {
        id: 3,
        name: "Alex Williams",
        email: "alex@example.com",
        role: "Member",
        avatar: "",
        status: "Away",
      },
    ],
    invites: [
      {
        id: 1,
        email: "jordan@example.com",
        sent: "2 days ago",
        status: "Pending",
      },
    ],
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Section>
            <h1 className="text-3xl font-bold">Household</h1>
            <p className="text-muted-foreground">
              Manage your household members and settings
            </p>
          </Section>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
          </div>
        </div>
        
        <Card className="glass-card animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{household.name}</CardTitle>
                <CardDescription>
                  {household.members.length} members
                </CardDescription>
              </div>
              <Button variant="outline">Edit Household</Button>
            </div>
          </CardHeader>
        </Card>
        
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="invites">Invites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="mt-4 space-y-4">
            {household.members.map((member, index) => (
              <Card 
                key={member.id} 
                className="transition-all hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={member.role === "Admin" ? "default" : "outline"}>
                          {member.role}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`${
                            member.status === "Active" 
                              ? "border-green-500 text-green-500" 
                              : "border-yellow-500 text-yellow-500"
                          }`}
                        >
                          {member.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="invites" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Invites</CardTitle>
                <CardDescription>
                  Manage your household invites
                </CardDescription>
              </CardHeader>
              <CardContent>
                {household.invites.length > 0 ? (
                  <div className="space-y-4">
                    {household.invites.map((invite) => (
                      <div 
                        key={invite.id} 
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{invite.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Sent {invite.sent}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Resend</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No pending invites</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invite
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
