// components/WeatherDisplay.tsx
'use client'

import { useEffect, useState } from 'react';

interface Weather {
  id: string;
  location: string;
  temperature: number;
  condition: string;
  timestamp: number;
}

export default function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/weather');
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error('Error fetching weather:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    const icons = {
      'sunny': 'fa-sun',
      'cloudy': 'fa-cloud',
      'rainy': 'fa-cloud-rain',
      'stormy': 'fa-cloud-bolt',
      'snowy': 'fa-snowflake'
    };
    return icons[condition as keyof typeof icons] || 'fa-cloud';
  };

  if (isLoading) {
    return (
      <div className="weather-display">
        <h2 className="text-xl font-bold mb-4">
          <i className="fas fa-cloud-sun mr-2"></i> Weather Forecast
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse bg-gray-200 h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  return (
    <div className="weather-display">
      <h2 className="text-xl font-bold mb-4">
        <i className="fas fa-cloud-sun mr-2"></i> Weather Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {weatherData.map((weather) => (
          <div 
            key={weather.id} 
            className="weather-card bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105"
          >
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">
                {weather.location}
              </h3>
              <i className={`fas ${getWeatherIcon(weather.condition)} fa-2x text-blue-500 mb-2`}></i>
              <p className="text-3xl font-bold mb-2">{weather.temperature}°C</p>
              <p className="text-gray-700 capitalize">{weather.condition}</p>
              <p className="text-sm text-gray-500 mt-2">
                Updated: {new Date(weather.timestamp * 1000).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}