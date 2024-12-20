export interface WeatherCondition {
    id: string;
    type: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
    icon: string;
    description: string;
  }
  
  export interface WeatherForecast {
    id: string;
    date: string;
    temperature: {
      current: number;
      min: number;
      max: number;
      feels_like: number;
    };
    condition: WeatherCondition;
    humidity: number;
    wind_speed: number;
    precipitation_chance: number;
    location: string;
  }
  
  export const weatherConditions: WeatherCondition[] = [
    {
      id: '1',
      type: 'sunny',
      icon: 'fa-sun',
      description: 'Clear sky'
    },
    {
      id: '2',
      type: 'cloudy',
      icon: 'fa-cloud',
      description: 'Partly cloudy'
    },
    {
      id: '3',
      type: 'rainy',
      icon: 'fa-cloud-rain',
      description: 'Light rain'
    },
    {
      id: '4',
      type: 'stormy',
      icon: 'fa-cloud-bolt',
      description: 'Thunderstorm'
    },
    {
      id: '5',
      type: 'snowy',
      icon: 'fa-snowflake',
      description: 'Light snow'
    }
  ];
  
  export const weatherForecasts: WeatherForecast[] = [
    {
      id: '1',
      date: '2024-12-20',
      temperature: {
        current: 24,
        min: 20,
        max: 26,
        feels_like: 25
      },
      condition: weatherConditions[0],
      humidity: 65,
      wind_speed: 12,
      precipitation_chance: 10,
      location: 'Paris'
    },
    {
      id: '2',
      date: '2024-12-21',
      temperature: {
        current: 20,
        min: 18,
        max: 22,
        feels_like: 19
      },
      condition: weatherConditions[2],
      humidity: 80,
      wind_speed: 15,
      precipitation_chance: 70,
      location: 'Paris'
    }
  ];
  
  export function getWeatherForecast(location: string, date: string): WeatherForecast | undefined {
    return weatherForecasts.find(
      forecast => forecast.location === location && forecast.date === date
    );
  }
  
  export function getWeatherCondition(type: string): WeatherCondition | undefined {
    return weatherConditions.find(condition => condition.type === type);
  }