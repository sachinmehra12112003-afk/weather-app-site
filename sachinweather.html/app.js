let id = '3d50bc7876d04e1018cbe5bfee67ca86';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value !== '') {
        searchWeatherByCity(valueSearch.value);
    }
});

const searchWeatherByCity = (cityName) => {
    fetch(url + '&q=' + cityName)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(() => {
            showError();
        });
};

const searchWeatherByLocation = (lat, lon) => {
    fetch(`${url}&lat=${lat}&lon=${lon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(() => {
            showError();
        });
};

const displayWeather = (data) => {
    if (data.cod == 200) {
        city.querySelector('figcaption').innerHTML = data.name;
        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        temperature.querySelector('span').innerText = data.main.temp;
        description.innerText = data.weather[0].description;

        clouds.innerText = data.clouds.all;
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;

        const weatherMain = data.weather[0].main.toLowerCase();
        const weatherDesc = data.weather[0].description.toLowerCase();

        if (weatherMain === 'haze') {
            setBackgroundImage('https://cdn.pixabay.com/photo/2021/09/30/18/10/sunrise-6670717_1280.jpg');
        } else if (weatherMain === 'clouds' || weatherDesc.includes('clouds')) {
            setBackgroundImage('https://cdn.pixabay.com/photo/2018/01/23/23/34/nature-3102762_1280.jpg');
        } else if (weatherMain === 'fog') {
            setBackgroundImage('https://i.pinimg.com/236x/36/eb/9a/36eb9a184510dfff7beb86994be1fb8d.jpg');
        } else if (weatherMain === 'clear') {
            setBackgroundImage('https://cdn.pixabay.com/photo/2012/06/08/06/19/clouds-49520_640.jpg');
        } else if (weatherMain === 'rain' || weatherDesc.includes('moderate rain')) {
            setBackgroundImage('https://i.pinimg.com/736x/32/d9/9d/32d99d735d21667e49df5f6c974acae9.jpg');
        } else if (weatherMain === 'snow' || weatherDesc.includes('snow')) {
            setBackgroundImage('https://i.pinimg.com/736x/58/7d/7d/587d7d10ccaafb06558d002990ddba0b.jpg');
        } else {
            resetBackgroundImage();
        }
    } else {
        showError();
    }
    valueSearch.value = '';
};

const setBackgroundImage = (url) => {
    document.body.style.backgroundImage = `url('${url}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
};

const resetBackgroundImage = () => {
    document.body.style.backgroundImage = '';
};

const showError = () => {
    main.classList.add('error');
    setTimeout(() => {
        main.classList.remove('error');
    }, 1000);
};

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                searchWeatherByLocation(latitude, longitude);
            },
            () => {
                initApp();
            }
        );
    } else {
        initApp();
    }
};

const initApp = () => {
    searchWeatherByCity('Washington');
};

getUserLocation();
