// contexts/AlertContext.tsx
'use client'

import PusherClient from 'pusher-js';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

interface Alert {
  id: string;
  type: 'high' | 'medium' | 'low';
  message: string;
  icon: string;
  status: 'draft' | 'published' | 'archived';
  created_at: number;
}

interface AlertContextType {
  alerts: Alert[];
  dismissAlert: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'created_at' | 'status'>) => void;
  isLoading: boolean;
  error: Error | null;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlerts() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Initial fetch of alerts
    fetch('/api/alerts')
      .then(res => res.json())
      .then(data => {
        setAlerts(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });

    // Initialize Pusher
    const pusher = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      enabledTransports: ['ws','wss'],
    });
    
      // Add console logs for debugging
    pusher.connection.bind('connected', () => {
      console.log('Connected to Pusher');
    });

    pusher.connection.bind('error', (err: any) => {
      console.error('Pusher connection error:', err);
    });
    const channel = pusher.subscribe('alerts');

    channel.bind('new-alert', (newAlert: Alert) => {
      console.log('Received new alert:', newAlert);
      setAlerts(prev => [newAlert, ...prev]);
    });
	
	    // Add binding for delete events from admin
    channel.bind('delete-alert', (deletedId: string) => {
      console.log('Received delete alert:', deletedId);
      setAlerts(prev => prev.filter(alert => alert.id !== deletedId));
    });

    channel.bind('pusher:subscription_succeeded', () => {
      console.log('Successfully subscribed to alerts channel');
    });

    channel.bind('pusher:subscription_error', (error: any) => {
      console.error('Subscription error:', error);
    });


    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const addAlert = useCallback(async (alert: Omit<Alert, 'id' | 'created_at' | 'status'>) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add alert');
      }
      // Actual addition will be handled by Pusher event
    } catch (err) {
      console.error('Error adding alert:', err);
      setError(err instanceof Error ? err : new Error('Failed to add alert'));
    }
  }, []);

  return (
    <AlertContext.Provider value={{ 
      alerts, 
      dismissAlert, 
      addAlert, 
      isLoading, 
      error 
    }}>
      {children}
    </AlertContext.Provider>
  );
}