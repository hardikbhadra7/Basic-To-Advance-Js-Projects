// selected all important classes and id 

const searchinput = document.querySelector(".search-input");
const searchbtn = document.querySelector(".search-btn");
import { apikey } from "./apikey";
const weatherinfosection = document.querySelector(".weather-info");
const searchcitysection = document.querySelector(".search-city");
const notfoundsection = document.querySelector(".not-found");

const placeName = document.querySelector(".place-name");
const countryName = document.querySelector(".country-name");
const currentDate = document.querySelector(".current-date");
const weatherCondition = document.querySelector(".weather-condition");
const temperatureValue = document.querySelector(".temperature-value");
const conditionName = document.querySelector(".condition-name");
const windValue = document.querySelector(".wind-value");
const humidityValue = document.querySelector(".humidity-value");
const forecastcontainer = document.querySelector(".forecast-items-container");

// search input and search btn part 

searchbtn.addEventListener('click', () => {
    if (searchinput.value.trim() != "") {
        updateweatherinfo(searchinput.value)
        searchinput.value = ""
        searchinput.blur()
    }
})
searchinput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && searchinput.value.trim() != "") {
        updateweatherinfo(searchinput.value)
        searchinput.value = ""
        searchinput.blur()
    }
})

// api function and weather data update 


async function getfetchdata(endpoint, city) {
    const apiurl = `https://api.weatherapi.com/v1/${endpoint}.json?key=${apikey}&q=${city}`;
    const response = await fetch(apiurl)
    return response.json()
}
// forecast api fetch 

// all condition line weather icon location wind speed humidity all data update 

function getweathericon(code, isday) {
    if (code === 1000) {
        return isday ? "sunny-icon.png" : "moon.png";
    }
    else if (code === 1003) {
        return isday ? "day-partly-cloudy.png" : "night_partly_cloudy-removebg-preview.png";
    }
    else if (code === 1006) {
        return isday ? "cloudy-day.png" : "cloudy-day.png";
    }
    else if (code === 1009) {
        return isday ? "overcast-day-and-night.webp" : "overcast-day-and-night.webp";
    }
    else if ([1030, 1135, 1147].includes(code)) {
        return "fog-icon.png";
    }
    else if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1240].includes(code)) {
        return isday ? "light-rain-day.png" : "light-night-rain.png";
    }
    else if ([1192, 1195, 1243, 1246].includes(code)) {
        return isday ? "day-heavy-rain.png" : "night-heavy-rain.png";
    }
    else if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) {
        return "snow-icon.png";
    }
    else if ([1069, 1072, 1204, 1207, 1249, 1252, 1237, 1261, 1264].includes(code)) {
        return isday ? "day-sleet-ice-pellets-icon.png" : "night-sleet-ice-pellets.png";
    }
    else if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
        return isday ? "thunderstorm-icon.jpg" : "thunderstorm-icon.jpg"
    }
    else {
        return "default-icon.webp"
    }
}
// this function is for set the date in weather app 
function getcurrentdate() {
    const newdate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
    };
    return newdate.toLocaleDateString('en-GB', options) //this is for in which formet we have to set date
}
// update weather app like icons date weather condition location etc 
async function updateweatherinfo(city) {
    // getfetchdata function call here 
    const data = await getfetchdata('current', city)
    if (data.error) {
        showdisplaysection(notfoundsection)
        return
    }
    // object, api of weatherapi.com work in this ways 
    const weatherdata = {
        country: data.location.country,
        cityname: data.location.name,
        temp: Math.round(data.current.temp_c),
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        condition: data.current.condition.text,
        conditionicon: data.current.condition.code,
        isday: data.current.is_day
    }

    // this all display content on weather app 

    countryName.textContent = `${weatherdata.country}`
    placeName.textContent = `${weatherdata.cityname},`
    temperatureValue.textContent = `${weatherdata.temp} °C`
    humidityValue.textContent = `${weatherdata.humidity} %`
    windValue.textContent = `${weatherdata.wind} km/h`
    conditionName.textContent = `${weatherdata.condition}`

    currentDate.textContent = getcurrentdate()
    // getweathericon function call here 
    weatherCondition.src = `assets-weathers/${getweathericon(weatherdata.conditionicon, weatherdata.isday)}`
    showdisplaysection(weatherinfosection)

    const forecastdata = await getforecastdata(city, 5)
    console.log(forecastdata)
    forecastcontainer.innerHTML = '';
    forecastdata.forecast.forecastday.forEach(day => {
        const date = new Date(day.date).toLocaleDateString('en-GB', {
            day:'2-digit',
            month: 'short'
        })
        const temp = Math.round(day.day.avgtemp_c);
        const forecasticon = getweathericon(day.day.condition.code, day.day.condition.icon.includes('day') ? 1 : 0)
        forecastcontainer.innerHTML += ` <div class="forecast-item">
               <h5 class="forecast-item-date regular-txt">${date}</h5>
               <img class="forecast-item-img" src="assets-weathers/${forecasticon}" alt="Thunderstorm icon">
               <h5 class="forecast-item-temp">${temp} °C</h5></div>`
    })
}

// forecast item container part. call api for forecast f next 4 days 
async function getforecastdata(city, day = 5) {
    const apiurl = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=${day}`;
    const response = await fetch(apiurl)
    return response.json()
}
function showdisplaysection(section) {
    [weatherinfosection, searchcitysection, notfoundsection].forEach(sec => {
        sec.style.display = "none"
    })
    section.style.display = "block"
}