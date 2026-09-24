"use client";

import { useState, useEffect } from 'react';

const WEATHER_CACHE_KEY = 'portfolio_weather_cache';
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Maps OpenWeatherMap condition codes to simplified weather types
 */
function mapWeatherCondition(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
  if (weatherId >= 300 && weatherId < 400) return 'rain'; // drizzle
  if (weatherId >= 500 && weatherId < 600) return 'rain';
  if (weatherId >= 600 && weatherId < 700) return 'snow';
  if (weatherId >= 700 && weatherId < 800) return 'mist';
  if (weatherId === 800) return 'clear';
  if (weatherId > 800) return 'clouds';
  return 'clear';
}

/**
 * Weather emoji based on condition
 */
function getWeatherEmoji(condition) {
  const emojis = {
    thunderstorm: '⛈️',
    rain: '🌧️',
    snow: '❄️',
    mist: '🌫️',
    clear: '☀️',
    clouds: '☁️',
  };
  return emojis[condition] || '🌤️';
}

export function useWeather() {
  const [weather, setWeather] = useState({
    condition: 'clear',
    temperature: null,
    description: '',
    emoji: '☀️',
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check cache first
    const cached = sessionStorage.getItem(WEATHER_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          setWeather({ ...parsed.data, loading: false, error: null });
          return;
        }
      } catch {
        // Ignore bad cache
      }
    }

    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;
    if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
      // No API key — use a sensible default
      setWeather((prev) => ({ ...prev, loading: false }));
      return;
    }

    // Get geolocation
    if (!navigator.geolocation) {
      setWeather((prev) => ({ ...prev, loading: false }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
          );

          if (!res.ok) throw new Error('Weather API request failed');

          const data = await res.json();
          const condition = mapWeatherCondition(data.weather[0].id);
          const weatherData = {
            condition,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            emoji: getWeatherEmoji(condition),
          };

          // Cache it
          sessionStorage.setItem(
            WEATHER_CACHE_KEY,
            JSON.stringify({ data: weatherData, timestamp: Date.now() })
          );

          setWeather({ ...weatherData, loading: false, error: null });
        } catch (err) {
          setWeather((prev) => ({
            ...prev,
            loading: false,
            error: err.message,
          }));
        }
      },
      () => {
        // Geolocation denied — just use defaults
        setWeather((prev) => ({ ...prev, loading: false }));
      },
      { timeout: 10000 }
    );
  }, []);

  return weather;
}
