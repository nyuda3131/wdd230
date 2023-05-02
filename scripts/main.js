document.querySelectorAll(".currentYear").forEach(function (element) {
  element.textContent = new Date().getFullYear();
});
document.querySelectorAll(".lastModified").forEach(function (element) {
  element.textContent = document.lastModified;
});
