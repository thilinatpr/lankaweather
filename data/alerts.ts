export interface Alert {
    id: string;
    type: 'high' | 'medium' | 'low';
    icon: string;
    message: string;
    timestamp: string;
  }
  
  export const alerts: Alert[] = [
    {
      id: '1',
      type: 'high',
      icon: 'fa-exclamation-triangle',
      message: 'Severe Weather Alert: Heavy thunderstorms expected',
      timestamp: '2024-12-20T10:00:00Z'
    },
    {
      id: '2',
      type: 'medium',
      icon: 'fa-info-circle',
      message: 'Travel Advisory: Delayed flights in affected areas',
      timestamp: '2024-12-20T09:30:00Z'
    },
    {
      id: '3',
      type: 'low',
      icon: 'fa-cloud',
      message: 'Light rainfall expected in the evening',
      timestamp: '2024-12-20T08:45:00Z'
    }
  ];