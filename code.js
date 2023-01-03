// Define Elements 
const temprature = document.getElementById("temp");
const my_city = document.getElementById("cityName");
const icon = document.getElementById("icon");
const condition = document.getElementById("conditionText");
const update = document.getElementById("lastUpdate");
const details = document.querySelector(".details");
const searchLocation = document.getElementById("location");
const change = document.getElementById("change-form");

// Fetch API
function currentFetch(city) {
    let fetchUrl = `https://api.weatherapi.com/v1/current.json?key=47e11b60964c4ae79bf61816221612&q=${city}&aqi=no`
    fetch(fetchUrl)
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                alert("Location is invalid. Try again, please!");
                searchLocation.value = "";
            }
        })
        .then((data) => this.showWeather(data));
}

// Display Information
function showWeather(data) {
    temprature.innerText = `${data.current.temp_c}°C`;
    my_city.innerText = data.location.name;
    icon.setAttribute("src", data.current.condition.icon);
    condition.innerHTML = data.current.condition.text;
    update.innerHTML = `Last Updated: ${data.current.last_updated}`;
    details.innerHTML = `<p class="item">Cloud: <span class="value">${data.current.cloud}</span></p><p class="item">Humidity: <span class="value">${data.current.humidity}</span></p>`;
}

// Default City On Load
window.onload = () => currentFetch("Tehran");

// Search Location
change.addEventListener("submit", function (e) {
    e.preventDefault();
    currentFetch(searchLocation.value);
    searchLocation.value = "";
});