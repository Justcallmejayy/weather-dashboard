// import {apiKey} from ('./api.js')
// const url = `https://api.openweathermap.org/data/2.5/forecast?lat=(-90;90)&lon=(180;180)&appid=${apiKey}`
const searchBtn = document.getElementById('searchBtn')
const apiKey = '47c143e4a6448512a9430d23e2d5f159';
// let city = ''

function FetchWeather(event) {
    event.preventDefault();
    //city = document.getElementById('city');
    const GeoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${apiKey}`;
  
    console.log(city.value);
  
    // Fetch geolocation data from API
    fetch(GeoLocationUrl)
      .then(response1 => response1.json())
      .then(data1 => {
        console.log(data1);
        console.log(data1[0].lat);
  
        const lat = data1[0].lat;
        const lon = data1[0].lon;
  
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
        // Fetch weather data from API
        fetch(weatherUrl)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            // console.log(data.weather);
  
            // Here, you can access the weather data from the 'data' object
            // and perform any necessary operations with it.
            // display the weather data on the page from the API
            let cityEl = document.getElementById('city-str');
            cityEl.text = city;
            const weather = document.getElementById('weather');

            const cityName = data.city.name 
            const dayTemp = data.list[0].main.temp
            const dayTempMin = data.list[0].main.temp_min
            const dayTempMax = data.list[0].main.temp_max
            const dayTempFeelLike = data.list[0].main.feels_like

            weather.innerHTML += `
            <div class="card shadow-0 d-flex w-100">
              <div class="card-body p-4">
                <h4 class="mb-1 sfw-normal">${cityName}</h4>
                <p class="mb-2">Current temperature: <strong>${dayTemp}°F</strong></p>
                <p>Feels like: <strong>${dayTempFeelLike}°F</strong></p>
                <p>Max: <strong>${dayTempMax}</strong>, Min: <strong>${dayTempMin}°F</strong></p>
      
                <div class="d-flex flex-row align-items-center">
                  <p class="mb-0 me-4">Scattered Clouds</p>
                  <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>
                </div>
              </div>
            </div>
          `;
                 const indices = [0, 7, 15, 23, 31];
            // Loop through the specified indices to fetch the desired days' data
              for (let i = 0; i < indices.length; i++) {
                 const currentIndex = indices[i];
                 const temp = data.list[currentIndex].main.temp;
                 const tempMin = data.list[currentIndex].main.temp_min;
                 const tempMax = data.list[currentIndex].main.temp_max;
                 const tempFeelLike = data.list[currentIndex].main.feels_like;
                console.log(data);
              
          

            let day1 = document.getElementById(`day${i+1}`)
            day1.innerHTML += `
              <div class="card shadow-0 border">
                <div class="card-body p-4">
                  <h4 class="mb-1 sfw-normal">${cityName}</h4>
                  <p class="mb-2">Current temperature: <strong>${temp}°F</strong></p>
                  <p>Feels like: <strong>${tempFeelLike}°F</strong></p>
                  <p>Max: <strong>${tempMax}°F</strong>, Min: <strong>${tempMin}°F</strong></p>
        
                  <div class="d-flex flex-row align-items-center">
                    <p class="mb-0 me-4">Scattered Clouds</p>
                    <i class="fas fa-cloud fa-3x" style="color: #eee;"></i>
                  </div>
                </div>
              </div>
            `;
              }
          })
          .catch(error => {
            console.log('Error:', error);
          });
      })
      .catch(error => {
        console.log('Error:', error);
      });
  
    city.value = '';
  }

  function clearWeather () {
    for (let i= 1; i < 6; i++) {
      let weatherBoxes = document.getElementById(`day${i}`);
      let weather = document.getElementById('weather')
      if (weatherBoxes.hasChildNodes()) {
        while (weatherBoxes.firstChild) {
           weatherBoxes.removeChild(weatherBoxes.firstChild);
           weather.removeChild(weather.firstChild)
      }
    }
      console.log(weatherBoxes)
    }
  }

searchBtn.addEventListener('click', FetchWeather)

