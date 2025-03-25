
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Car, Clock, Home, MapPin, BarChart, Settings } from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Find Parking', icon: MapPin, path: '/find-parking' },
  { name: 'Reservations', icon: Clock, path: '/reservations' },
  { name: 'My Vehicles', icon: Car, path: '/vehicles' },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

const AppSidebar: React.FC = () => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border/40 bg-background/80 backdrop-blur-md z-40">
      <div className="flex flex-col h-full py-6">
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">MAIN MENU</h2>
          </div>
        </div>
        
        <nav className="flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'menu-link-active' : 'menu-link-inactive'
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
        
        <div className="px-4 mt-6">
          <div className="glass-card p-4 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Need Help?</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Contact our support team for assistance with your parking experience.
            </p>
            <button className="w-full px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
