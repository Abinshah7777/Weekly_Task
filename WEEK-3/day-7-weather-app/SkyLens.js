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
  }

  catch (err) {
    console.log("❌ SkyLens Error:", err.message);
  }
}

getWeather(10.0, 76.0);
