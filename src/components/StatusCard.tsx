
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn("glass-card overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={cn(
            "text-xs mt-1",
            trend.isPositive ? "text-spot-available" : "text-spot-occupied"
          )}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            <span className="text-muted-foreground ml-1">from last period</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
