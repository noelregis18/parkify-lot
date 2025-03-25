
import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background antialiased">
      <AppHeader />
      <AppSidebar />
      <main className="pt-16 pl-64">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
