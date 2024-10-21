const weatherLocation = document.querySelector(".weather__location");
const weatherTemp = document.querySelector(".weather__temperature");
const weatherData = document.querySelector(".weather__date");

geolocationError();

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
  weatherResponce("-0.118092", "51.509865"); // London
}

function weatherUpdate(city, temp) {
  const date = new Date();
  weatherLocation.textContent = city;
  weatherTemp.textContent = temp;
  weatherData.textContent =
    date.getDay() + " " + date.toLocaleString("en-US", { month: "long" });
}

function weatherResponce(lon, lat) {
  getWeather(lon, lat)
    .then((data) => {
      console.log(data);
      weatherUpdate(data.name, data.main.temp);
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
