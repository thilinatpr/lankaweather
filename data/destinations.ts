export interface Destination {
    id: string;
    location: string;
    country: string;
    dates: {
      start: string;
      end: string;
    };
    coordinates: {
      lat: number;
      lng: number;
    };
  }
  
  export const destinations: Destination[] = [
    {
      id: '1',
      location: 'Paris',
      country: 'France',
      dates: {
        start: '2024-12-25',
        end: '2024-12-30'
      },
      coordinates: {
        lat: 48.8566,
        lng: 2.3522
      }
    },
    {
      id: '2',
      location: 'Tokyo',
      country: 'Japan',
      dates: {
        start: '2025-01-01',
        end: '2025-01-05'
      },
      coordinates: {
        lat: 35.6762,
        lng: 139.6503
      }
    },
    {
      id: '3',
      location: 'New York',
      country: 'United States',
      dates: {
        start: '2025-02-14',
        end: '2025-02-20'
      },
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    }
  ];