// contexts/AlertContext.tsx
'use client'

import { createContext, useContext, useState, useCallback } from 'react';
import { Alert, alerts as initialAlerts } from '@/data/alerts';

interface AlertContextType {
  alerts: Alert[];
  dismissAlert: (id: string) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const dismissAlert = useCallback((id: string) => {
    setAlerts(currentAlerts => currentAlerts.filter(alert => alert.id !== id));
  }, []);

  const addAlert = useCallback((alert: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    setAlerts(currentAlerts => [newAlert, ...currentAlerts]);
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, dismissAlert, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
}