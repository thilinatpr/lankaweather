// components/AlertBanner.tsx
'use client'

import { useState } from 'react';
import { Alert } from '@/types/db';

interface AlertBannerProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function AlertBanner({ 
  alerts, 
  onDismiss, 
  isLoading = false,
  error = null 
}: AlertBannerProps) {
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);
  const [dismissingIds, setDismissingIds] = useState<Set<string>>(new Set());

  const handleDismiss = async (id: string) => {
    try {
      setDismissingIds(prev => new Set([...prev, id]));
      await onDismiss(id);
    } catch (error) {
      console.error('Failed to dismiss alert:', error);
    } finally {
      setDismissingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  const getAlertClass = (type: Alert['type']) => {
    const baseClasses = 'alert-banner mb-2 rounded-lg shadow-md transition-all duration-300';
    const typeClasses = {
      high: 'bg-red-600',
      medium: 'bg-orange-500',
      low: 'bg-yellow-500'
    };
    return `${baseClasses} ${typeClasses[type]}`;
  };

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2].map((n) => (
          <div 
            key={n}
            className="animate-pulse bg-gray-200 h-16 rounded-lg"
            aria-label="Loading alerts..."
          />
        ))}
      </div>
    );
  }

  if (!alerts || alerts.length === 0) {
    return null;
  }

  return (
    <div className="alerts-container space-y-2" role="alert" aria-label="Alerts section">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`${getAlertClass(alert.type)} ${
            dismissingIds.has(alert.id) ? 'opacity-50' : 'opacity-100'
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <i 
                className={`fas ${alert.icon} text-white`} 
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="text-white font-medium">
                  {alert.message}
                </p>
                {expandedAlertId === alert.id && (
                  <div className="text-white text-sm mt-2 space-y-1">
                    <p>
                      Posted: {new Date(alert.created_at * 1000).toLocaleString()}
                    </p>
                    <p>
                      Priority: {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleExpand(alert.id)}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded"
                aria-label={expandedAlertId === alert.id ? "Show less details" : "Show more details"}
                disabled={dismissingIds.has(alert.id)}
              >
                <i 
                  className={`fas fa-chevron-${expandedAlertId === alert.id ? 'up' : 'down'}`}
                  aria-hidden="true"
                />
              </button>
              <button
                onClick={() => handleDismiss(alert.id)}
                className="text-white hover:text-gray-200 transition-colors p-2 rounded"
                aria-label="Dismiss alert"
                disabled={dismissingIds.has(alert.id)}
              >
                <i 
                  className="fas fa-times"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}