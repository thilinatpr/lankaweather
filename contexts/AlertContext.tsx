// contexts/AlertContext.tsx
'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Alert } from '@/types/db';

interface AlertContextType {
  alerts: Alert[];
  dismissAlert: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'created_at' | 'status'>) => void;
  isLoading: boolean;
  error: string | null;
}

const AlertContext = createContext<AlertContextType | null>(null);

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
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/alerts');
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }
      const data = await response.json();
      setAlerts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
      console.error('Error fetching alerts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const dismissAlert = useCallback(async (id: string) => {
    try {
      await fetch(`/api/alerts/${id}`, { method: 'DELETE' });
      setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
    } catch (err) {
      console.error('Error dismissing alert:', err);
    }
  }, []);

  const addAlert = useCallback(async (alert: Omit<Alert, 'id' | 'created_at' | 'status'>) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alert),
      });

      if (!response.ok) {
        throw new Error('Failed to add alert');
      }

      // Refresh alerts after adding new one
      fetchAlerts();
    } catch (err) {
      console.error('Error adding alert:', err);
    }
  }, []);

  return (
    <AlertContext.Provider 
      value={{ alerts, dismissAlert, addAlert, isLoading, error }}
    >
      {children}
    </AlertContext.Provider>
  );
}