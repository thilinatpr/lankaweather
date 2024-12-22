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
    <div className="alerts-container max-w-4xl mx-auto space-y-3" role="alert" aria-label="Weather Alerts">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg shadow-lg border-l-4 ${getAlertClass(alert.type)} 
            transition-all duration-300 ${dismissingIds.has(alert.id) ? 'opacity-50' : 'opacity-100'}`}
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`${getAlertIconClass(alert.type)} p-2 rounded-full`}>
                  <i className={`fas ${alert.icon}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {alert.message}
                  </h3>
                  {expandedAlertId === alert.id && (
                    <div className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-clock" aria-hidden="true" />
                        <span>
                          {new Date(alert.created_at * 1000).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-signal" aria-hidden="true" />
                        <span>Priority: {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleExpand(alert.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                    dark:hover:text-gray-300 rounded-full hover:bg-gray-100 
                    dark:hover:bg-gray-700 transition-colors"
                  aria-label={expandedAlertId === alert.id ? "Show less" : "Show more"}
                  disabled={dismissingIds.has(alert.id)}
                >
                  <i className={`fas fa-chevron-${expandedAlertId === alert.id ? 'up' : 'down'}`} />
                </button>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                    dark:hover:text-gray-300 rounded-full hover:bg-gray-100 
                    dark:hover:bg-gray-700 transition-colors"
                  aria-label="Dismiss alert"
                  disabled={dismissingIds.has(alert.id)}
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
  // Helper function for alert icon colors
  function getAlertIconClass(type: Alert['type']) {
    const classes = {
      high: 'text-red-500 bg-red-100 dark:bg-red-900/30',
      medium: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
      low: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
    };
    return classes[type];
  }
  
  // Updated getAlertClass function
  function getAlertClass(type: Alert['type']) {
    const classes = {
      high: 'border-red-500',
      medium: 'border-orange-500',
      low: 'border-yellow-500'
    };
    return classes[type];
  }
}