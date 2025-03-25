
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const AppHeader: React.FC = () => {
  return (
    <header className="fixed top-0 inset-x-0 h-16 bg-background/80 backdrop-blur-md z-50 border-b border-border/40">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-primary-foreground">
            SP
          </div>
          <span className="text-xl font-semibold text-foreground">SmartPark</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-spot-available animate-pulse-gentle"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass-card">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[400px] overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium">Reservation Confirmed</span>
                    <span className="ml-auto text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Your parking spot A12 has been reserved for today at 4:00 PM.</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium">Spot Available</span>
                    <span className="ml-auto text-xs text-muted-foreground">15 min ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Spot B09 is now available for reservation.</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-medium">Reservation Ending</span>
                    <span className="ml-auto text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Your reservation for spot C03 will end in 30 minutes.</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
