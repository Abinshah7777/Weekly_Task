 
    const latitude = 10.0;
    const longitude = 76.0;

    const weatherConditions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };

    function getWeatherCondition(code) {
      return weatherConditions[code] || `Code ${code}`;
    }

    async function getWeather(latitude, longitude) {
      const appTitle = "🌤 SkyLens — Weather App";
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

      try {
        console.log("Fetching weather...");

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Network response failed");
        }

        const data = await res.json();
        const weather = data.current_weather;

        console.log(`
==============================
${appTitle}
==============================

Location   : ${latitude}, ${longitude}
Temperature: ${weather.temperature} °C
Windspeed  : ${weather.windspeed} km/h
Condition  : ${weather.weathercode}
Time       : ${weather.time}

------------------------------
        `);

        // Update UI
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('weather-content').classList.remove('hidden');
        
        document.getElementById('temperature').textContent = `${weather.temperature}°C`;
        document.getElementById('condition').textContent = getWeatherCondition(weather.weathercode);
        document.getElementById('location').textContent = `${latitude}, ${longitude}`;
        document.getElementById('windspeed').textContent = `${weather.windspeed} km/h`;
        document.getElementById('weathercode').textContent = weather.weathercode;
        document.getElementById('time').textContent = new Date(weather.time).toLocaleString();
      }
      catch (err) {
        console.log("❌ SkyLens Error:", err.message);
        
        // Update UI for error
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('error-message').textContent = err.message;
        document.body.classList.add('error-state');
      }
    }

    // Initialize
    getWeather(latitude, longitude);
  