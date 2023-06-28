document.addEventListener("DOMContentLoaded", () => {
  fetch("./json/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      const directory = document.getElementById("businessDirectory");
      data.businesses.forEach((business) => {
        const businessCard = createBusinessCard(business);
        directory.appendChild(businessCard);
      });
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
});

function createBusinessCard(business) {
  const businessCard = document.createElement("div");
  businessCard.classList.add("business-card");

  const businessImg = document.createElement("img");
  businessImg.classList.add("business-card__image");

  businessImg.setAttribute("src", business.imageUrl);
  businessImg.setAttribute("alt", `${business.name} Logo`);
  businessImg.setAttribute("loading", "lazy");
  businessImg.setAttribute("width", "340");
  businessImg.setAttribute("height", "440");

  const businessInfo = document.createElement("div");
  businessInfo.classList.add("business-card__info");

  const businessName = document.createElement("h2");
  businessName.textContent = business.name;
  businessName.classList.add("business-card__name");

  const businessAddress = document.createElement("p");
  businessAddress.textContent = business.address;
  businessAddress.classList.add("business-card__address");

  const businessPhone = document.createElement("p");
  businessPhone.textContent = business.phoneNumber;
  businessPhone.classList.add("business-card__phone");

  const businessWebsite = document.createElement("a");
  businessWebsite.href = business.websiteUrl;
  businessWebsite.textContent = "Visit Website";
  businessWebsite.classList.add("business-card__website");

  businessInfo.appendChild(businessName);
  businessInfo.appendChild(businessAddress);
  businessInfo.appendChild(businessPhone);
  businessInfo.appendChild(businessWebsite);

  businessCard.appendChild(businessImg);
  businessCard.appendChild(businessInfo);

  return businessCard;
}
