
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Filter, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Family Dinner",
      description: "Weekly family dinner",
      date: new Date(),
      time: "7:00 PM",
      attendees: ["Taylor", "Sam", "Alex"],
      category: "Family",
    },
    {
      id: 2,
      title: "Grocery Shopping",
      description: "Weekly grocery run",
      date: new Date(),
      time: "10:00 AM",
      attendees: ["Taylor"],
      category: "Errands",
    },
    {
      id: 3,
      title: "Movie Night",
      description: "Watch the new Marvel movie",
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      time: "8:00 PM",
      attendees: ["Taylor", "Sam", "Alex"],
      category: "Entertainment",
    },
  ];
  
  // Filter events for the selected date
  const filteredEvents = events.filter(
    (event) =>
      event.date.toDateString() === (date?.toDateString() || new Date().toDateString())
  );
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Section>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your household schedule and events
            </p>
          </Section>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-4 glass-card animate-fade-in">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full border-0"
              />
            </CardContent>
          </Card>
          
          <div className="lg:col-span-8 space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>
                  Events for {date?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardTitle>
                <CardDescription>
                  {filteredEvents.length} events scheduled
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredEvents.length > 0 ? (
                  <div className="space-y-4">
                    {filteredEvents.map((event) => (
                      <div 
                        key={event.id} 
                        className="border-l-4 border-primary pl-4 py-2 animate-fade-in"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{event.title}</h3>
                          <Badge>{event.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        <div className="flex flex-wrap gap-6 mt-2 text-sm">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{event.attendees.length} attendees</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-3">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No events scheduled for this day</p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>
                  Your upcoming household events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events
                    .filter((event) => new Date(event.date) >= new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 3)
                    .map((event) => (
                      <div 
                        key={event.id} 
                        className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex flex-col items-center justify-center">
                            <span className="text-sm font-semibold">{event.date.getDate()}</span>
                            <span className="text-xs text-muted-foreground">
                              {event.date.toLocaleDateString(undefined, { month: 'short' })}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {event.time}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Events</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
