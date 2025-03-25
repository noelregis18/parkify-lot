
import React from 'react';
import { cn } from '@/lib/utils';
import { Car } from 'lucide-react';

export type SpotStatus = 'available' | 'occupied' | 'reserved';

interface ParkingSpotProps {
  id: string;
  status: SpotStatus;
  onClick?: (id: string) => void;
}

const statusClasses: Record<SpotStatus, string> = {
  available: 'parking-spot-available',
  occupied: 'parking-spot-occupied',
  reserved: 'parking-spot-reserved',
};

const ParkingSpot: React.FC<ParkingSpotProps> = ({ id, status, onClick }) => {
  const handleClick = () => {
    if (status !== 'occupied' && onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className={cn(statusClasses[status], 'animate-scale-in')}
      onClick={handleClick}
    >
      {status === 'occupied' && (
        <Car className="text-spot-occupied h-10 w-10" />
      )}
      <span className="absolute bottom-2 right-2 text-xs font-semibold">{id}</span>
    </div>
  );
};

export default ParkingSpot;
