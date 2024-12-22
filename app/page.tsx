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
  const { alerts, dismissAlert, addAlert, isLoading } = useAlerts();

  const testPusher = async () => {
    const testAlert = {
      type: 'high' as const,
      message: 'Test Pusher Alert: ' + new Date().toISOString(),
      icon: 'fa-exclamation-triangle'
    };
    
    console.log('Sending test alert:', testAlert);
    await addAlert(testAlert);
  };

  const handleAddTestAlert = () => {
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
    const randomAlert = testAlerts[Math.floor(Math.random() * testAlerts.length)];
    addAlert(randomAlert);
  };

  return (
    <div className="container mx-auto p-4">
      <Header />
      <div className="mb-4 space-x-4">
        <button
          onClick={handleAddTestAlert}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Test Alert
        </button>
        <button
          onClick={testPusher}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          <i className="fas fa-broadcast-tower mr-2"></i>
          Test Pusher
        </button>
      </div>
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