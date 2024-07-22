const input = document.querySelector('.input');
const button = document.querySelector('#search-btn');
const city = document.querySelector('.location');
const weather = document.querySelector('.weather-clear');
const img = document.querySelector('#img');
const temperature = document.querySelector('#temp');
const exactTemperature = document.querySelector('#exact-temp');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const visibility = document.querySelector('#visibility');
const pressure = document.querySelector('#pressure');
const time = document.querySelector('#time-zone')

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const APIkey = 'dba0d28dd05ad04c5573095bfd0d6926';

// Events
button.addEventListener('click', () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        city.innerText = data.name;
        temperature.innerText = Math.floor(data.main.temp);
        exactTemperature.innerText = `/ Real Feel ${ data.main.temp }`;
        wind.innerHTML = `${ data.wind.speed } <span>km/h</span>`;
        humidity.innerHTML = `${ data.main.humidity } <span>%</span>`;
        visibility.innerText = `${data.visibility / 1000} km`;
        pressure.innerHTML = `${ data.main.pressure } <span>hpa</span>`;
        timeZone(data)

        updateWeatherStatus(data.weather[0].main);

        addAnimations();
    })
    .catch(error => {
        console.log(error);
    });
});

const updateWeatherStatus = (weatherStatus) => {
    let styleWeather;

    if (weatherStatus === 'Drizzle') {
        img.src = 'image/drizzle.png';
        weather.innerHTML = `Drizzle & Little Rainy <br> Day`;
        styleWeather = `
            .container {
                box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px #163c50; 
                background-image: linear-gradient(#91B2CA, #192c3a);
                width: 375px;
                height: 600px;
                border-radius: 16px;
            }`;
    } else if (weatherStatus === 'Clear') {
        img.src = 'image/sunny.png';
        weather.innerHTML = `Clear & Sunny <br> Day`;
        styleWeather = `
            .container {
                box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px #F24C00; 
                background-image: linear-gradient(#F9C784, #FC7A1E);
                width: 375px;
                height: 600px;
                border-radius: 16px;
            }`;
    } else if (weatherStatus === 'Rain') {
        img.src = 'image/rainy.png';
        weather.innerHTML = `Rainy <br> Day`;
        styleWeather = `
            .container {
                box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px #163c50; 
                background-image: linear-gradient(#91B2CA, #192c3a);
                width: 375px;
                height: 600px;
                border-radius: 16px;
            }`;
    } else if (weatherStatus === 'Snow') {
        img.src = 'image/snow.png';
        weather.innerHTML = `Snowy & Cold <br> Day`;
        styleWeather = `
            .container {
                box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px #163c50; 
                background-image: linear-gradient(#91B2CA, #192c3a);
                width: 375px;
                height: 600px;
                border-radius: 16px;
            }`;
    } else if (weatherStatus === 'Clouds') {
        img.src = 'image/cloud.png';
        weather.innerHTML = `Cloudy <br> Day`;
        styleWeather = `
            .container {
                box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px #163c50; 
                background-image: linear-gradient(#91B2CA, #192c3a);
                width: 375px;
                height: 600px;
                border-radius: 16px;
            }`;
    } else if (weatherStatus === 'Haze') {
        img.src = 'image/haze.png';
        weather.innerHTML = `Hazy & Sleepy <br> Day`;
        styleWeather = `
            .container {
                box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.5), -10px -10px 10px #163c50; 
                background-image: linear-gradient(#91B2CA, #192c3a);
                width: 375px;
                height: 600px;
                border-radius: 16px;
            }`;
    }

    styleElement.innerHTML = styleWeather;
};

const addAnimations = () => {
    img.classList.add('fadeIn');
    temperature.classList.add('fadeIn');

    setTimeout(() => {
        removeAnimations();
    }, 800);
};

const removeAnimations = () => {
    img.classList.remove('fadeIn');
    temperature.classList.remove('fadeIn');
};

const initialWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=philippines&appid=${APIkey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        city.innerText = data.name;
        temperature.innerText = Math.floor(data.main.temp);
        exactTemperature.innerText = `/ Real Feel ${ data.main.temp }`;
        wind.innerHTML = `${ data.wind.speed } <span>km/h</span>`;
        humidity.innerHTML = `${ data.main.humidity } <span>%</span>`;
        visibility.innerText = `${data.visibility / 1000} km`;
        pressure.innerHTML = `${ data.main.pressure } <span>hpa</span>`;

        timeZone(data)
        updateWeatherStatus(data.weather[0].main);

        addAnimations();
    })
    .catch(error => {
        console.log(error);
    });
}

const timeZone = (data) => {
    const timezoneOffset = data.timezone / 3600;
    const minutes = (timezoneOffset % 1) * 60;
    const hours = Math.floor(timezoneOffset);
    time.innerText = `UTC${hours > 0 ? '+' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

initialWeather()