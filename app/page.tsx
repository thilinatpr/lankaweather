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

  const handleAddTestAlert = () => {
    // Array of different test alerts to cycle through
    const testAlerts = [
      {
        type: 'high' as const,
        icon: 'fa-exclamation-triangle',
        message: 'Test Alert: Severe weather warning in your area'
      },
      {
        type: 'medium' as const,
        icon: 'fa-info-circle',
        message: 'Test Alert: Moderate traffic delays expected'
      },
      {
        type: 'low' as const,
        icon: 'fa-bell',
        message: 'Test Alert: Light rain forecasted for tomorrow'
      }
    ];

    // Pick a random alert from the array
    const randomAlert = testAlerts[Math.floor(Math.random() * testAlerts.length)];
    addAlert(randomAlert);
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="mb-4">
        <button
          onClick={handleAddTestAlert}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Test Alert
        </button>
      </div>
      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />
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