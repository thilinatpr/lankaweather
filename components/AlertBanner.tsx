// components/AlertBanner.tsx
'use client'

import { useState } from 'react';
import { Alert } from '@/data/alerts';

interface AlertBannerProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

export default function AlertBanner({ alerts, onDismiss }: AlertBannerProps) {
  const [expandedAlertId, setExpandedAlertId] = useState<string | null>(null);

  const handleDismiss = (id: string) => {
    onDismiss(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedAlertId(expandedAlertId === id ? null : id);
  };

  const getAlertClass = (type: Alert['type']) => {
    const baseClasses = 'alert-banner mb-2 transition-all duration-300';
    const typeClasses = {
      high: 'bg-red-600',
      medium: 'bg-orange-500',
      low: 'bg-yellow-500'
    };
    return `${baseClasses} ${typeClasses[type]}`;
  };

  return (
    <div className="alerts-container">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={getAlertClass(alert.type)}
          role="alert"
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <i className={`fas ${alert.icon} text-white`} aria-hidden="true"></i>
              <div>
                <p className="text-white font-medium">
                  {alert.message}
                </p>
                {expandedAlertId === alert.id && (
                  <p className="text-white text-sm mt-1">
                    Posted: {new Date(alert.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleExpand(alert.id)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label={expandedAlertId === alert.id ? "Show less" : "Show more"}
              >
                <i className={`fas fa-chevron-${expandedAlertId === alert.id ? 'up' : 'down'}`}></i>
              </button>
              <button
                onClick={() => handleDismiss(alert.id)}
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Dismiss alert"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}