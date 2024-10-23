const weatherLocation = document.querySelector(".weather__location");
const weatherTemp = document.querySelector(".weather__temperature");
const weatherTempMax = document.querySelector(".weather__temperatureMax");
const weatherTempMin = document.querySelector(".weather__temperatureMin");
const weatherData = document.querySelector(".weather__date");
const weatherDescr = document.querySelector(".weather__description");
const weatherImage = document.querySelector(".weather__imageStatus");
const weatherTable = document.querySelector(".weather__table");

weatherResponce("-0.118092", "51.509865"); // London

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    geolocationSuccess,
    geolocationError
  );
}

function geolocationSuccess(pos) {
  let lon, lat;
  if (pos) {
    lon = pos.coords.longitude;
    lat = pos.coords.latitude;
    weatherResponce(lon, lat);
  } else {
    console.log("No coords");
  }
}

function geolocationError(error) {
  console.log("Geolocation error: " + error);
}

function createWeatherElement(data) {
  weatherTable.innerHTML = "";
  data.forEach((element, index) => {
    if (index < 8) {
      const tableElement = document.createElement("li");
      const tableElementIcon = document.createElement("div");
      const date = element.data.split(" ");
      tableElement.innerHTML =
        "<span>" +
        date[0].split("-")[2] +
        "</span><span>" +
        date[1].split(":")[0] +
        ":00 " +
        "</span>";
      tableElementIcon.style.backgroundImage = `url(https://openweathermap.org/img/wn/${element.icon}@4x.png)`;
      tableElement.innerHTML +=
        "<span>" + Math.floor(element.temp) + "°C </span>" + " ";
      tableElement.innerHTML += "<span>" + element.descr + "</span>";
      weatherTable.appendChild(tableElement);
      tableElement.prepend(tableElementIcon);
    }
    return;
  });
}

function weatherUpdate(weatherNow, data) {
  const date = new Date();
  let toTable = [];
  const { name, temp, descr, icon } = weatherNow;
  // Main temp
  weatherLocation.textContent = name;
  weatherTemp.textContent = Math.floor(temp) + "°C";
  weatherData.textContent =
    date.getDate() + " " + date.toLocaleString("en-US", { month: "long" });
  weatherDescr.textContent = descr;
  weatherImage.style.backgroundImage = `url(https://openweathermap.org/img/wn/${icon}@4x.png)`;
  // Other temp
  data.forEach((element) => {
    const obj = {
      data: element.dt_txt,
      icon: element.weather[0].icon,
      temp: element.main.temp,
      descr: element.weather[0].description,
    };
    toTable.push(obj);
  });
  createWeatherElement(toTable);
}

function weatherResponce(lon, lat) {
  getWeather(lon, lat)
    .then((data) => {
      const weatherNow = {
        name: data.city.name,
        temp: data.list[0].main.temp,
        descr: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon,
      };
      weatherUpdate(weatherNow, data.list);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getWeather(lon, lat) {
  const apiKey = "4b7d76697e3d96596942ca77d8f4fe88";
  const request = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const weatherData = await fetch(request);
  if (!weatherData.ok) {
    throw new Error("Network error");
  }
  return weatherData.json();
}
