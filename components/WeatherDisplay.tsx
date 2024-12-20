// components/WeatherDisplay.tsx
import { weatherForecasts } from '@/data/weather';

export default function WeatherDisplay() {
  return (
    <div className="weather-display">
      <h2><i className="fas fa-cloud-sun"></i> Weather Forecast</h2>
      <div className="weather-grid">
        {weatherForecasts.map((forecast) => (
          <div key={forecast.id} className="weather-card">
            <h3>{new Date(forecast.date).toLocaleDateString()}</h3>
            <i className={`fas ${forecast.condition.icon} fa-2x`}></i>
            <p>{forecast.temperature.current}°C</p>
            <p>{forecast.condition.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}