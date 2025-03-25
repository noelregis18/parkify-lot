
import React, { useState } from 'react';
import ParkingSpot, { SpotStatus } from './ParkingSpot';
import { toast } from '@/components/ui/use-toast';

interface ParkingSpotData {
  id: string;
  status: SpotStatus;
}

const generateParkingSpots = (): ParkingSpotData[] => {
  const sections = ['A', 'B', 'C'];
  const spots: ParkingSpotData[] = [];
  
  sections.forEach(section => {
    for (let i = 1; i <= 8; i++) {
      const spotId = `${section}${i < 10 ? '0' : ''}${i}`;
      // Randomly assign status for demo purposes
      const randomStatus = Math.random();
      let status: SpotStatus;
      
      if (randomStatus < 0.5) {
        status = 'available';
      } else if (randomStatus < 0.8) {
        status = 'occupied';
      } else {
        status = 'reserved';
      }
      
      spots.push({ id: spotId, status });
    }
  });
  
  return spots;
};

interface ParkingMapProps {
  onSpotSelect?: (spotId: string) => void;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ onSpotSelect }) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpotData[]>(generateParkingSpots());

  const handleSpotClick = (spotId: string) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    
    if (spot) {
      if (spot.status === 'available') {
        toast({
          title: "Spot Selected",
          description: `Parking spot ${spotId} has been selected.`,
        });
      } else if (spot.status === 'reserved') {
        toast({
          title: "Reserved Spot",
          description: `Parking spot ${spotId} is already reserved by you.`,
          variant: "destructive"
        });
      }
      
      if (onSpotSelect) {
        onSpotSelect(spotId);
      }
    }
  };

  return (
    <div className="bg-secondary/50 rounded-xl p-6 border border-border/50 overflow-hidden animate-fade-in">
      <div className="flex justify-center mb-6">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-spot-available"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-spot-occupied"></div>
            <span className="text-sm">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-spot-reserved"></div>
            <span className="text-sm">Reserved</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['A', 'B', 'C'].map((section) => (
          <div key={section} className="border border-border/50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-4">Section {section}</h3>
            <div className="flex flex-wrap justify-center">
              {parkingSpots
                .filter(spot => spot.id.startsWith(section))
                .map(spot => (
                  <ParkingSpot
                    key={spot.id}
                    id={spot.id}
                    status={spot.status}
                    onClick={handleSpotClick}
                  />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingMap;
