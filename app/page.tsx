// app/page.tsx
'use client'

//import { useEffect } from 'react';
import Header from '@/components/Header';
import AlertBanner from '@/components/AlertBanner';
import TripPlanner from '@/components/TripPlanner';
import WeatherDisplay from '@/components/WeatherDisplay';
import OfflineSection from '@/components/OfflineSection';
import { AlertProvider, useAlerts } from '@/contexts/AlertContext';

function MainContent() {
  const { alerts, dismissAlert, isLoading } = useAlerts();


  return (
    <div className="container mx-auto p-4">
      <Header />
      <AlertBanner
        alerts={alerts}
        onDismiss={dismissAlert}
        isLoading={isLoading}
      />
      <TripPlanner />
      <WeatherDisplay />
      <OfflineSection />
    </div>
  );
}

export default function Home() {
  return (
    <AlertProvider>
      <MainContent />
    </AlertProvider>
  );
}