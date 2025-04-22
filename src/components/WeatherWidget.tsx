import React, { useState, useEffect } from 'react';
import { Cloud, Droplets, Sun, CloudRain, Snowflake, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  precipitation: number;
  windSpeed: number;
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get weather data
    const fetchWeather = async () => {
      try {
        // In a real app, you would fetch from a weather API
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API delay
        
        // Sample weather data
        const mockWeather: WeatherData = {
          temperature: 24,
          condition: 'sunny',
          humidity: 65,
          precipitation: 0,
          windSpeed: 5
        };
        
        setWeather(mockWeather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeather();
  }, []);
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-center h-32">
        <div className="animate-pulse text-gray-500">Loading weather data...</div>
      </div>
    );
  }
  
  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-5">
        <p className="text-gray-500">Weather data unavailable</p>
      </div>
    );
  }
  
  const renderWeatherIcon = () => {
    switch (weather.condition) {
      case 'sunny':
        return <Sun size={40} className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud size={40} className="text-gray-500" />;
      case 'rainy':
        return <CloudRain size={40} className="text-blue-500" />;
      case 'snowy':
        return <Snowflake size={40} className="text-blue-300" />;
      case 'windy':
        return <Wind size={40} className="text-gray-400" />;
      default:
        return <Cloud size={40} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="font-medium text-gray-700 mb-3">Current Weather</h3>
      <div className="flex items-center">
        {renderWeatherIcon()}
        <div className="ml-4">
          <div className="text-2xl font-bold text-gray-800">{weather.temperature}°C</div>
          <div className="text-gray-600 capitalize">{weather.condition}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="flex flex-col items-center">
          <Droplets size={16} className="text-blue-500 mb-1" />
          <span className="text-gray-600">{weather.humidity}%</span>
          <span className="text-xs text-gray-500">Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <CloudRain size={16} className="text-blue-400 mb-1" />
          <span className="text-gray-600">{weather.precipitation}mm</span>
          <span className="text-xs text-gray-500">Rain</span>
        </div>
        <div className="flex flex-col items-center">
          <Wind size={16} className="text-gray-500 mb-1" />
          <span className="text-gray-600">{weather.windSpeed} km/h</span>
          <span className="text-xs text-gray-500">Wind</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;