const API_URL =
  'https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const API_ROME =
  'https://api.openweathermap.org/data/2.5/weather?q=Rome,%20Italy&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const API_HURGHADA =
  'https://api.openweathermap.org/data/2.5/weather?q=hurghada,%20egypt&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const API_ZAGREB =
  'https://api.openweathermap.org/data/2.5/weather?q=Zagreb,%20Croatia&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';
const API_FORECAST =
  'https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=c51f401bafb99cdf6e4b149c98e89cc3';

const body = document.getElementById('body');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const sunTime = document.getElementById('suntimes');
const image = document.getElementById('image');
const cityName = document.getElementById('name');
const dayZero = document.getElementById('dayZero');
const dayOne = document.getElementById('dayOne');
const dayTwo = document.getElementById('dayTwo');
const dayThree = document.getElementById('dayThree');
const dayFour = document.getElementById('dayFour');
const cityContainer = document.getElementById('cityContainer');

fetch(API_URL)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    const currentTemp = json.main.temp.toFixed(0);
    // display current description and temperature
    description.innerHTML = `
    <p>${json.weather[0].description} | ${currentTemp}°</p>`;

    //display current humidity
    humidity.innerHTML = `
    <p>${json.main.humidity}% relative humidity</p>`;

    // new Date() shows todays date. The json.sys.sunrise gets the time for the
    // sunrise in ms x 1000 to get a whole second
    const rise = new Date(json.sys.sunrise * 1000);
    const up = rise.toLocaleTimeString([], {
      // returns the date object as a string, using local (timezone) conventions
      hour: '2-digit', // show the time as 00:00 hour/minute
      minute: '2-digit',
    });
    sunTime.innerHTML = `<p>sunrise ${up}</p>`;

    const set = new Date(json.sys.sunset * 1000);
    const down = set.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    sunTime.innerHTML += `<p>sunset ${down}</p>`;

    // Theme changes based on weather
    if (json.weather[0].main === 'Clear') {
      body.style.background = '#F7E9B9';
      body.style.color = '#2A5510';
      image.innerHTML = `<img src="./Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt=" sunglasses icon"/>`;
      cityName.innerHTML += `Get your sunnies on. ${json.name} is looking rather great today.`;
    } else if (json.weather[0].main === 'Rain') {
      body.style.background = '#A3DEF7';
      body.style.color = '#164A68';
      image.innerHTML = `<img src="./Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="umbrella icon"/>`;
      cityName.innerHTML += `Don’t forget your umbrella. It’s wet in ${json.name} today.`;
    } else {
      body.style.background = '#F4F7F8';
      body.style.color = '#F47775';
      image.innerHTML = `<img src="./Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="cloud icon"/>`;
      cityName.innerHTML += `Light a fire and get cosy. ${json.name} is looking grey today.`;
    }
  });

fetch(API_FORECAST)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // use the filter to just include the data from 12:00 of each day
    const filteredForecast = json.list.filter((item) =>
      item.dt_txt.includes('12:00')
    );

    // find all CSS selectors 'forecast-description' and for each of them display the description
    document
      .querySelectorAll('.forecast-description')
      .forEach((description, index) => {
        const descriptNow = filteredForecast[index].weather[0].description;

        description.innerHTML += `
        ${descriptNow}`;
      });

    // find all CSS selectors 'temperature' and for each of them display the temperature
    document.querySelectorAll('.temperature').forEach((temp, index) => {
      const tempOfTheDay = filteredForecast[index].main.temp.toFixed(0);

      temp.innerHTML += `
      ${tempOfTheDay}°C`;
    });

    // an array where we store the names. weekday[0]='sun', weekday[1]='mon' and so on
    const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

    // local variable where we can store the weekdays from the forecast data
    const weekdaysNamesArray = [];

    filteredForecast.forEach((_, index) => {
      // for all of the five arrays in 'filteredForecast' we want to get the Date and Time
      // we can get the data from 'filteredForecast[index].dt' and multiply it with 1000
      // store each data in a variable named 'dateAndTime'
      const dateAndTime = new Date(filteredForecast[index].dt * 1000);
      // store the data that define which weekday it is in an array named 'weekdaysNamesArray'
      weekdaysNamesArray[index] = dateAndTime.getDay();
    });

    // display the days in another way (otherwise we can also apply querySelectorAll and forEach here too)
    dayZero.innerHTML += `
    ${weekday[weekdaysNamesArray[0]]}
    `;

    dayOne.innerHTML += `
    ${weekday[weekdaysNamesArray[1]]}
    `;

    dayTwo.innerHTML += `
    ${weekday[weekdaysNamesArray[2]]}
    `;

    dayThree.innerHTML += `
    ${weekday[weekdaysNamesArray[3]]}
    `;

    dayFour.innerHTML += `
    ${weekday[weekdaysNamesArray[4]]}
    `;
  });

fetch(API_ROME)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // display the city name and temperature with the function 'generateCity'
    cityContainer.innerHTML += generateCity(json);
  });
let generateCity = (city) => {
  const cityName = city.name;
  const cityTemp = city.main.temp;

  let cityHTML = '';
  cityHTML += `
  <div class="cityCard">
    <p>${cityName} ${cityTemp.toFixed()}°C</p>
    <img class="city-photo" src="./images/${cityName}.jpg" alt="city photo" />
  </div>`;

  return cityHTML;
};

fetch(API_HURGHADA)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // display the city name and temperature with the function 'generateCity'
    cityContainer.innerHTML += generateCity(json);
  });
fetch(API_ZAGREB)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    // display the city name and temperature with the function 'generateCity'
    cityContainer.innerHTML += generateCity(json);
  });
