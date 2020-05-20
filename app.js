const apiKey = "4f4ae9f965cf307b8658cdd4a0458dba";

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
      })  
  })
} else {
  console.log("Geolocation is not supported");
} 
