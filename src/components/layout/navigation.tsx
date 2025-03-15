
import { cn } from "@/lib/utils";
import { CalendarDays, Home, ListTodo, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  horizontal?: boolean;
}

export function Navigation({ horizontal = false }: NavigationProps) {
  const navItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
    },
    {
      label: "Tasks",
      icon: ListTodo,
      href: "/tasks",
    },
    {
      label: "Household",
      icon: Users,
      href: "/household",
    },
    {
      label: "Calendar",
      icon: CalendarDays,
      href: "/calendar",
    },
  ];
  
  if (horizontal) {
    return (
      <nav className="flex justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) => cn(
              "flex flex-col items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors",
              isActive
                ? "text-primary font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    );
  }
  
  return (
    <nav className="space-y-1 p-2">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            isActive
              ? "bg-primary/10 text-primary font-medium"
              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
