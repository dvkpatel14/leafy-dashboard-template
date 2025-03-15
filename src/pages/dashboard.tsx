import { AppLayout } from "@/components/layout/app-layout";
import { Section } from "@/components/ui/section";
import { MetricCard } from "@/components/ui/metric-card";
import { 
  CheckCircle, 
  Clock, 
  Home, 
  ListTodo, 
  Users, 
  Calendar as CalendarIcon 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";

export default function Dashboard() {
  const { user } = useAuth();
  
  // Sample metrics data - in a real app this would come from API
  const metrics = [
    {
      title: "Total Tasks",
      value: "12",
      icon: ListTodo,
      trend: {
        value: 12,
        positive: true,
      },
    },
    {
      title: "Completed Tasks",
      value: "8",
      icon: CheckCircle,
      trend: {
        value: 16,
        positive: true,
      },
    },
    {
      title: "Upcoming Events",
      value: "4",
      icon: CalendarIcon,
      description: "Next event in 2 days",
    },
    {
      title: "Household Members",
      value: "3",
      icon: Users,
    },
  ];

  // Sample tasks data
  const tasks = [
    {
      id: 1,
      title: "Grocery shopping",
      due: "Today",
      priority: "High",
    },
    {
      id: 2,
      title: "Clean kitchen",
      due: "Tomorrow",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Pay utility bills",
      due: "In 3 days",
      priority: "Low",
    },
  ];
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <Section>
          <h1 className="text-3xl font-bold">Welcome back{user ? ", " + user.email.split("@")[0] : ""}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your household today.
          </p>
        </Section>
        
        <Section title="Overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                description={metric.description}
                trend={metric.trend}
                className={`animate-fade-in delay-${i * 100}`}
              />
            ))}
          </div>
        </Section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Section title="Upcoming Tasks">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Tasks Due Soon</CardTitle>
                <CardDescription>
                  Manage and track your upcoming tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <div 
                            className={`w-2 h-2 rounded-full ${
                              task.priority === "High" 
                                ? "bg-red-500" 
                                : task.priority === "Medium" 
                                ? "bg-yellow-500" 
                                : "bg-green-500"
                            }`} 
                          />
                        </div>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Due {task.due}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="w-full">View All Tasks</Button>
                </div>
              </CardContent>
            </Card>
          </Section>
          
          <Section title="Recent Activity">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Household Activity</CardTitle>
                <CardDescription>
                  Recent activity from your household
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Home className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Groceries purchased</p>
                        <p className="text-sm text-muted-foreground">
                          Sam bought groceries for $45.50
                        </p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CalendarIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Movie Night added</p>
                        <p className="text-sm text-muted-foreground">
                          Alex scheduled a movie night event
                        </p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Task completed</p>
                        <p className="text-sm text-muted-foreground">
                          Taylor completed "Clean the bathroom"
                        </p>
                        <p className="text-xs text-muted-foreground">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" className="w-full">View All Activity</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>
        </div>
      </div>
    </AppLayout>
  );
}
