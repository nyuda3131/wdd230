function toggleMenu() {
  const menuItems = document.querySelector(".menu-items");
  menuItems.style.display =
    menuItems.style.display === "flex" ? "none" : "flex";
}

document.querySelectorAll(".currentYear").forEach(function (element) {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll(".lastModified").forEach(function (element) {
  element.textContent = document.lastModified;
});

function getCurrentDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDate = new Date();
  const day = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
}

document.getElementById("currentDate").textContent = getCurrentDate();

let banner = document.createElement("div");
banner.style.display = "none";
banner.style.backgroundColor = "#708080";
banner.style.color = "white";
banner.style.padding = "10px";
banner.style.textAlign = "center";
banner.textContent =
  "Come join us for the chamber meet and greet every Wednesday at 7:00 p.m.";
document.body.insertBefore(banner, document.body.firstChild);

let today = new Date();
let dayOfWeek = today.getDay();

if (dayOfWeek === 1 || dayOfWeek === 2) {
  banner.style.display = "block";
}

document.addEventListener("DOMContentLoaded", (event) => {
  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  if (lastVisit) {
    const daysPassed = Math.round(
      Math.abs((currentDate - new Date(lastVisit)) / oneDay)
    );
    document.getElementById("lastVisited").textContent =
      "It's been " + daysPassed + " days since your last visit.";
  } else {
    document.getElementById("lastVisited").textContent =
      "This is your first visit to this page.";
  }

  localStorage.setItem("lastVisit", currentDate.toString());
});

// API call
const url = `https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=metric&appid=78289b32dcf3ae6c9a654988d9b49926`;

// fetch data from API
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

// display results
function displayResults(weatherData) {
  const weatherIcon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  document.getElementById("temp").textContent = weatherData.main.temp.toFixed(0);
  document.getElementById("weather-condition").textContent = weatherData.weather[0].description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");;
  document.getElementById("weather-icon").src = weatherIcon;
  document.getElementById("wind-speed").textContent = weatherData.wind.speed;

  let temperature = weatherData.main.temp;
  //  Default Metric: meter/sec, convert to km/h
  let windSpeed = weatherData.wind.speed * (1000/3600);

  //Wind Chill = 13.12 + (.6215 x 2) - (11.37 x 70.16) + (.3965 x 2 x 70.16)
  //Referred from "https://www.calcunation.com/calculator/wind-chill-celsius.php"
  let windChill = 13.12 + (0.6215 * temperature) - (11.37 * 70.16) + (0.3965 * temperature * 70.16);

  //Windchill temperature is defined only for temperatures at or below 10 °C (50 °F) and wind speeds above 4.8 km/h (3.0 mph).
  // Refered from "https://en.wikipedia.org/wiki/Wind_chill#:~:text=Windchill%20temperature%20is%20defined%20only,wind%20that%20is%20present%20increases."
  if (temperature <= 10 && windSpeed > 4.8) {
    document.getElementById("wind-chill").textContent = windChill.toFixed(2);
  } else {
    document.getElementById("wind-chill").textContent = "N/A";
  }
}
