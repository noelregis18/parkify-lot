
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReservationCard, { ReservationData } from '@/components/ReservationCard';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Reservations: React.FC = () => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<string | null>(null);
  
  const [activeReservations, setActiveReservations] = useState<ReservationData[]>([
    {
      id: '1',
      spotId: 'A03',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: 'Today',
      location: 'Main Garage, Level 2',
      status: 'active',
    },
    {
      id: '2',
      spotId: 'B07',
      startTime: '3:00 PM',
      endTime: '5:00 PM',
      date: 'Tomorrow',
      location: 'Main Garage, Level 1',
      status: 'upcoming',
    },
  ]);
  
  const [pastReservations, setPastReservations] = useState<ReservationData[]>([
    {
      id: '3',
      spotId: 'C04',
      startTime: '9:00 AM',
      endTime: '11:00 AM',
      date: 'May 15, 2023',
      location: 'Main Garage, Level 3',
      status: 'completed',
    },
    {
      id: '4',
      spotId: 'A12',
      startTime: '1:00 PM',
      endTime: '3:00 PM',
      date: 'May 10, 2023',
      location: 'Main Garage, Level 2',
      status: 'completed',
    },
    {
      id: '5',
      spotId: 'B09',
      startTime: '11:00 AM',
      endTime: '1:00 PM',
      date: 'May 5, 2023',
      location: 'Main Garage, Level 1',
      status: 'cancelled',
    },
  ]);

  const handleCancelReservation = (id: string) => {
    setReservationToCancel(id);
    setCancelDialogOpen(true);
  };

  const confirmCancelReservation = () => {
    if (reservationToCancel) {
      setActiveReservations(prev => 
        prev.map(res => 
          res.id === reservationToCancel 
            ? { ...res, status: 'cancelled' as const } 
            : res
        )
      );
      
      // Move cancelled reservation to past reservations
      const cancelledRes = activeReservations.find(r => r.id === reservationToCancel);
      if (cancelledRes) {
        setPastReservations(prev => [
          { ...cancelledRes, status: 'cancelled' as const },
          ...prev
        ]);
        
        setActiveReservations(prev => 
          prev.filter(res => res.id !== reservationToCancel)
        );
      }
      
      toast({
        title: "Reservation Cancelled",
        description: `Reservation for spot has been successfully cancelled.`,
      });
    }
    
    setCancelDialogOpen(false);
    setReservationToCancel(null);
  };

  const handleExtendReservation = (id: string) => {
    setActiveReservations(prev => 
      prev.map(res => 
        res.id === id 
          ? { ...res, endTime: '1:00 PM' } 
          : res
      )
    );
    
    toast({
      title: "Reservation Extended",
      description: `Your reservation has been extended by 1 hour.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Reservations</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active and past parking reservations.
          </p>
        </div>
        <Link to="/find-parking">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" /> New Reservation
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="active" className="animate-fade-in">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active & Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Reservations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {activeReservations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {activeReservations.map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  onCancel={handleCancelReservation}
                  onExtend={handleExtendReservation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border border-border/50">
              <h3 className="text-lg font-medium mb-2">No Active Reservations</h3>
              <p className="text-muted-foreground mb-4">You don't have any active or upcoming reservations.</p>
              <Link to="/find-parking">
                <Button>Find Parking</Button>
              </Link>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {pastReservations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {pastReservations.map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/50 rounded-lg border border-border/50">
              <h3 className="text-lg font-medium mb-2">No Past Reservations</h3>
              <p className="text-muted-foreground">You don't have any past reservations yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent className="glass-card animate-scale-in">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this reservation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancelReservation} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Cancel Reservation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Reservations;
