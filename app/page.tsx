// app/page.tsx
'use client'

import Header from '@/components/Header';
import AlertBanner from '@/components/AlertBanner';
import TripPlanner from '@/components/TripPlanner';
import WeatherDisplay from '@/components/WeatherDisplay';
import OfflineSection from '@/components/OfflineSection';
import { AlertProvider, useAlerts } from '@/contexts/AlertContext';

function MainContent() {
  const { alerts, dismissAlert, addAlert } = useAlerts();

  // Example of how to add a new alert
  const handleAddTestAlert = () => {
    addAlert({
      type: 'medium',
      icon: 'fa-info-circle',
      message: 'This is a test alert'
    });
  };

  return (
    <>
      <Header />
      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />
      <TripPlanner />
      <WeatherDisplay />
      <OfflineSection />
    </>
  );
}

export default function Home() {
  return (
    <AlertProvider>
      <MainContent />
    </AlertProvider>
  );
}