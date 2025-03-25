
import React from 'react';
import { Car, Clock, MapPin, ArrowRight, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusCard from '@/components/StatusCard';
import ParkingMap from '@/components/ParkingMap';
import ReservationCard, { ReservationData } from '@/components/ReservationCard';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Dashboard: React.FC = () => {
  const recentReservations: ReservationData[] = [
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
  ];

  const handleSpotSelect = (spotId: string) => {
    console.log(`Selected spot: ${spotId}`);
    // Show detailed information about the spot
  };

  const handleCancelReservation = (id: string) => {
    toast({
      title: "Reservation Cancelled",
      description: `Reservation ${id} has been cancelled.`,
    });
  };

  const handleExtendReservation = (id: string) => {
    toast({
      title: "Reservation Extended",
      description: `Reservation ${id} has been extended by 1 hour.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your parking information.
          </p>
        </div>
        <Link to="/find-parking">
          <Button className="gap-2">
            Find Parking <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatusCard
          title="Available Spots"
          value="24"
          icon={<MapPin className="h-4 w-4" />}
          trend={{ value: 10, isPositive: true }}
        />
        <StatusCard
          title="Active Reservations"
          value="1"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatusCard
          title="Registered Vehicles"
          value="2"
          icon={<Car className="h-4 w-4" />}
        />
        <StatusCard
          title="Monthly Usage"
          value="12 hrs"
          icon={<BarChart4 className="h-4 w-4" />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="map" className="animate-fade-in">
        <TabsList className="mb-4">
          <TabsTrigger value="map">Parking Map</TabsTrigger>
          <TabsTrigger value="reservations">Recent Reservations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="space-y-4">
          <ParkingMap onSpotSelect={handleSpotSelect} />
        </TabsContent>
        
        <TabsContent value="reservations">
          <div className="grid gap-4 md:grid-cols-2">
            {recentReservations.map(reservation => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onCancel={handleCancelReservation}
                onExtend={handleExtendReservation}
              />
            ))}
            
            {recentReservations.length === 0 && (
              <Card className="col-span-full py-8">
                <CardContent className="flex flex-col items-center justify-center">
                  <p className="text-muted-foreground mb-4">You don't have any reservations yet.</p>
                  <Link to="/find-parking">
                    <Button>Find Parking</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
