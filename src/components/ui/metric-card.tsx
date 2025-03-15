
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-1">
            <span
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? "+" : "-"}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">from last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
