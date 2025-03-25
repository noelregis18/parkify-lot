
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Calendar } from 'lucide-react';

export interface ReservationData {
  id: string;
  spotId: string;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  status: 'active' | 'upcoming' | 'completed' | 'cancelled';
}

interface ReservationCardProps {
  reservation: ReservationData;
  onCancel?: (id: string) => void;
  onExtend?: (id: string) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation,
  onCancel,
  onExtend
}) => {
  const statusClasses = {
    active: "status-badge-available",
    upcoming: "status-badge-reserved",
    completed: "status-badge bg-muted text-muted-foreground",
    cancelled: "status-badge-occupied"
  };
  
  const statusLabel = {
    active: "Active",
    upcoming: "Upcoming",
    completed: "Completed",
    cancelled: "Cancelled"
  };

  return (
    <Card className="glass-card animate-scale-in overflow-hidden">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Spot {reservation.spotId}</h3>
            <span className={statusClasses[reservation.status]}>
              {statusLabel[reservation.status]}
            </span>
          </div>
          <div className="text-xl font-bold text-foreground">
            {reservation.startTime} - {reservation.endTime}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{reservation.date}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Duration: 2 hours</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{reservation.location}</span>
          </div>
        </div>
      </CardContent>
      
      {(reservation.status === 'active' || reservation.status === 'upcoming') && (
        <CardFooter className="flex justify-between pt-0 gap-2">
          {reservation.status === 'active' && (
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => onExtend && onExtend(reservation.id)}
            >
              Extend Time
            </Button>
          )}
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={() => onCancel && onCancel(reservation.id)}
          >
            Cancel
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ReservationCard;
