//Define variables
var zip = document.getElementById("input1");
var content = document.getElementById('content');
var modal = document.getElementById("errorModal");
var btn = document.getElementById("zipbtn");
var errorMsg = document.getElementById("error");

// Make Fetch Happen - get weather API
function Weather(e) {
    e.preventDefault()
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip.value + ',&appid=ec6e5724614df85bf2ac4c7580608749')

        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            console.log(data);
            getData(data);
        })
        .catch(e => {
        })
}

//event listener for weather button
btn.addEventListener("click", Weather);

// Hide content
content.style.display = "none";

//function to convert temperature, populate fields, run if statement for error alert modal, and display content.
function getData(d) {
    if (d.cod == 200) {
        content.style.display = "block";
        var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
        var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);
        document.getElementById('condition').innerHTML = d.weather[0].description;
        document.getElementById('celcius').innerHTML = celcius + '&deg;';
        document.getElementById('fah').innerHTML = fahrenheit + '&deg';
        document.getElementById('kelvin').innerHTML = d.main.temp;
        document.getElementById('location').innerHTML = d.name;
        document.getElementById("sdisplay").setAttribute("src", 'http://openweathermap.org/img/wn/' + d.weather[0].icon + '@2x.png');
    } else {
        content.style.display = "none";
        $("#errorModal").modal('show');
        document.getElementById("error").innerHTML = ("PLEASE ENTER A VAILID ZIP CODE!  COMPUTER MESSAGE SAYS: " + d.message);
    }

}
