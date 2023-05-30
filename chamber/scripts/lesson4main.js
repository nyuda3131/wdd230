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

