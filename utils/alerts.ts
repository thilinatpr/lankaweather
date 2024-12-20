// utils/alerts.ts
import { Alert } from '@/data/alerts';

export const sortAlertsByPriority = (alerts: Alert[]): Alert[] => {
  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2
  };

  return [...alerts].sort((a, b) => {
    const priorityDiff = priorityOrder[a.type] - priorityOrder[b.type];
    if (priorityDiff === 0) {
      // If same priority, sort by timestamp (newest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    return priorityDiff;
  });
};

export const filterActiveAlerts = (alerts: Alert[]): Alert[] => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
  return alerts.filter(alert => {
    const alertDate = new Date(alert.timestamp);
    return alertDate > twentyFourHoursAgo;
  });
};