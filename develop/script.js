const {apiKey} = ('./api.js')
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=(-90;90)&lon=(180;180)&appid=${apiKey}`

function weather() {

fetch(url)
.then(response => response.json())
.then(console.log(response)
)}
weather()

console.log(response)