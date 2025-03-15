
import { AppLayout } from "@/components/layout/app-layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Filter, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Tasks() {
  // Sample tasks data - in a real app this would come from an API
  const tasks = {
    pending: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy vegetables, milk, and bread",
        due: "Today",
        priority: "High",
        assigned: "Me",
      },
      {
        id: 2,
        title: "Clean kitchen",
        description: "Wipe counters, clean stove, and sweep floor",
        due: "Tomorrow",
        priority: "Medium",
        assigned: "Sam",
      },
      {
        id: 3,
        title: "Pay utility bills",
        description: "Pay electricity and water bills",
        due: "In 3 days",
        priority: "Low",
        assigned: "Me",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Take out trash",
        description: "Empty all bins and take to curb",
        completed: "Yesterday",
        priority: "Medium",
        assigned: "Taylor",
      },
      {
        id: 5,
        title: "Mow the lawn",
        description: "Mow front and back yard",
        completed: "2 days ago",
        priority: "Low",
        assigned: "Alex",
      },
    ],
  };
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Section>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">
              Manage and track household tasks
            </p>
          </Section>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4 space-y-4">
            {tasks.pending.map((task) => (
              <Card key={task.id} className="transition-all hover:shadow-md animate-fade-in">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <Badge 
                        variant={
                          task.priority === "High" 
                            ? "destructive" 
                            : task.priority === "Medium" 
                            ? "default" 
                            : "secondary"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Due {task.due}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Assigned to: </span>
                      <span>{task.assigned}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4 space-y-4">
            {tasks.completed.map((task) => (
              <Card key={task.id} className="transition-all hover:shadow-md animate-fade-in opacity-80">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold line-through">{task.title}</h3>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-primary" />
                      <span>Completed {task.completed}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed by: </span>
                      <span>{task.assigned}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
