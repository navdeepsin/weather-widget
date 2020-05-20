const apiKey = "4f4ae9f965cf307b8658cdd4a0458dba";
const currentConditions = document.querySelector('.current-conditions');
const forecast = document.querySelector('.forecast');

if(navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then (resp => {
        if (resp.ok) {
          return(resp.json());
        }
      }).then(data => {
        console.log(data);
        insertCurrentWeather(data);
      })  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
      .then (resp => {
        if (resp.ok) {
          return(resp.json());
        }
      }).then(data => {
        console.log(data);
        insertForecast(data);
      }) 
  })
} else {
  console.log("Geolocation is not supported");
} 

function insertCurrentWeather(data) {

  currentConditions.insertAdjacentHTML('afterbegin', `
    <h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    <div class="current">
      <div class="temp">${data.main.temp}℃</div>
      <div class="condition">${data.weather[0].description}</div>
    </div>
  `)
}

function insertForecast(data) {
  for(i = 0; i < data.cnt; i += 8) {
    forecast.insertAdjacentHTML('afterbegin', `
    <div class="day">
    <h3>Tuesday</h3>
    <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" />
    <div class="description">${data.list[i].weather[0].description}</div>
    <div class="temp">
      <span class="high">${data.list[i].main.temp_max}</span>/<span class="low">${data.list[i].main.temp_min}</span>
    </div>
  </div>
  `)
  }

}

