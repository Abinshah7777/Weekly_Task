fetch("https://api.open-meteo.com/v1/forecast?latitude=10.0&longitude=76.0&current_weather=true")
  .then(res => res.json())
  .then(data => console.log("Current Weather:", data.current_weather))
  .catch(err => console.log("Error:", err));


