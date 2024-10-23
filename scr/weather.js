const weatherLocation = document.querySelector(".weather__location");
const weatherTemp = document.querySelector(".weather__temperature");
const weatherTempMax = document.querySelector(".weather__temperatureMax");
const weatherTempMin = document.querySelector(".weather__temperatureMin");
const weatherData = document.querySelector(".weather__date");
const weatherDescr = document.querySelector(".weather__description");

weatherResponce("-0.118092", "51.509865"); // London

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    geolocationSuccess,
    geolocationError
  );
}

function geolocationSuccess(pos) {
  const lon = pos.coords.longitude;
  const lat = pos.coords.latitude;
  weatherResponce(lon, lat);
}

function geolocationError(error) {
  console.log("Geolocation error: " + error);
}

function weatherUpdate(weatherNow) {
  const date = new Date();
  const { name, temp, tempMax, tempMin, descr } = weatherNow;
  weatherLocation.textContent = name;
  weatherTemp.textContent = Math.floor(temp) + "°C";
  //weatherTempMax.textContent = tempMax;
  //weatherTempMin.textContent = tempMin;
  weatherData.textContent =
    date.getDate() + " " + date.toLocaleString("en-US", { month: "long" });
  weatherDescr.textContent = descr;
}

function weatherResponce(lon, lat) {
  getWeather(lon, lat)
    .then((data) => {
      console.log(data);
      const weatherNow = {
        name: data.name,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        descr: data.weather[0].description,
      };
      weatherUpdate(weatherNow);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getWeather(lon, lat) {
  const apiKey = "4b7d76697e3d96596942ca77d8f4fe88";
  const request = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${apiKey}&units=metric`;
  const weatherData = await fetch(request);
  if (!weatherData.ok) {
    throw new Error("Network error");
  }
  return weatherData.json();
}
