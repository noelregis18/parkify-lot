
import React, { useState } from 'react';
import { 
  CalendarIcon, 
  Clock, 
  Search, 
  CalendarCheck2, 
  LocateFixed 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import ParkingMap from '@/components/ParkingMap';
import { toast } from '@/components/ui/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const FindParking: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showReservationDialog, setShowReservationDialog] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null);
  
  const handleSpotSelect = (spotId: string) => {
    setSelectedSpot(spotId);
    setShowReservationDialog(true);
  };
  
  const handleReservation = () => {
    toast({
      title: "Reservation Confirmed",
      description: `You have successfully reserved spot ${selectedSpot} for ${format(date!, 'PPP')}.`,
    });
    setShowReservationDialog(false);
  };

  const handleUseCurrentLocation = () => {
    toast({
      title: "Location Detected",
      description: "Using your current location: Downtown Parking Garage.",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find Parking</h1>
        <p className="text-muted-foreground mt-1">
          Search and reserve available parking spots in real-time.
        </p>
      </div>
      
      <Card className="glass-card animate-fade-in">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="col-span-4 md:col-span-1 space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="flex">
                <Input 
                  placeholder="Enter location" 
                  className="rounded-r-none"
                  defaultValue="Downtown Parking Garage"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-l-none border-l-0"
                  onClick={handleUseCurrentLocation}
                >
                  <LocateFixed className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-1 space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-1 space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Select defaultValue="10:00">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8:00">8:00 AM</SelectItem>
                  <SelectItem value="9:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="17:00">5:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-1 space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select defaultValue="2">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="5">5 hours</SelectItem>
                  <SelectItem value="6">6+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="col-span-4">
              <Search className="h-4 w-4 mr-2" /> Search Available Spots
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Available Parking Spots</h2>
        <ParkingMap onSpotSelect={handleSpotSelect} />
      </div>
      
      <Dialog open={showReservationDialog} onOpenChange={setShowReservationDialog}>
        <DialogContent className="glass-card animate-scale-in">
          <DialogHeader>
            <DialogTitle>Reserve Parking Spot {selectedSpot}</DialogTitle>
            <DialogDescription>
              Confirm your parking reservation details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <CalendarCheck2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">
                  {date ? format(date, 'PPP') : 'Today'} • 10:00 AM - 12:00 PM
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">2 hours</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReservationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReservation}>
              Confirm Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FindParking;
