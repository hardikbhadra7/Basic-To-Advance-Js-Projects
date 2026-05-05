const apiKey = "e72a8d10ea3a42ea944134335250809";

// selected all important classes and id 
const cityName = document.getElementById("city-name");
const weatherImg = document.getElementById("weather-img");
const temperature = document.getElementById("temperature");
const conditionName = document.getElementById("condition-name");
const searchInput = document.getElementById("inputBox");
const searchBtn = document.getElementById("search");
const forecastTemp = document.querySelectorAll(".temp");
const weekForecast = document.querySelector(".week-forcast");
const tempList = document.querySelector(".temp-list");

// search button nd search input field 
searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city === "") return;
    getFetchData(city)
    searchInput.value = "";
})

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const city = searchInput.value.trim();

        if (city === "") return;
        getFetchData(city);

        searchInput.value = "";
    }
})

// fetch api function
const getFetchData = async (city) => {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data)
    console.log(data.forecast.forecastday)
    // console.log(data.forecast.forecastday[0].hour.length); 
    updateWeatherInfo(data)
}

// updateWeather ui function 
function updateWeatherInfo(data) {
    const weatherData = {
        country: data.location.country,
        region: data.location.region,
        name: data.location.name,
        icon: data.current.condition.icon,
        text: data.current.condition.text,
        temp: data.current.temp_c
    }

    cityName.innerText = `${weatherData.name} ${weatherData.region}, ${weatherData.country}`;
    weatherImg.src = `https:${weatherData.icon}`;
    temperature.innerText = `${weatherData.temp} °C`;
    conditionName.innerText = `${weatherData.text}`;

    weekForecast.innerHTML = "";

    for (let i = 0; i < 3; i++) {
        let forecastArr = data.forecast.forecastday;
        let day = forecastArr[i]
        let date = day.date;
        let maxtemp_c = day.day.maxtemp_c;
        let mintemp_c = day.day.mintemp_c;
        let condition = day.day.condition.text;

        const div = document.createElement("div")
        div.classList.add("day-forcast");

        div.innerHTML = `
        <p class="date">${date}</p>
        <p class="temp">${maxtemp_c} °C / ${mintemp_c} °C</p>
        <p class="desc">${condition}</p>
        `
        weekForecast.appendChild(div);
    }

    tempList.innerHTML = "";
    let selectedHour = [12, 15, 18, 21, 0];

    for (let i = 0; i < selectedHour.length; i++) {
        let index = selectedHour[i]
        let hourArr = data.forecast.forecastday[0].hour;
        let hour = hourArr[index];
        let time = hour.time;
        let temp_c = hour.temp_c;
        let condition = hour.condition.text;

        let hourDiv = document.createElement("div");
        hourDiv.classList.add("nextDay-cast")

        let fullTime = hour.time;
        let timePart = fullTime.split(" ")[1];   // "15:00"

        let hourNum = parseInt(timePart.split(":")[0]); // 15

        let ampm = hourNum >= 12 ? "PM" : "AM";

        // 12-hour conversion
        let formattedHour = hourNum % 12;
        if (formattedHour === 0) formattedHour = 12;

        let finalTime = `${formattedHour}:00 ${ampm}`;

        hourDiv.innerHTML = `
<div>
<p class="time">${finalTime}</p>
<p>${temp_c} °C</p>
</div>
<p class="desc">${condition}</p>
`
        tempList.appendChild(hourDiv)
    }
}
