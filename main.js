
var zip = document.getElementById("input1");


// Make Fetch Happen - get weather API
var btn = document.getElementById("zipbtn");
var errorMsg = document.getElementById("error");

function Weather(e) {
    e.preventDefault()

    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip.value + ',&appid=ec6e5724614df85bf2ac4c7580608749')

        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            console.log(data);
            Convert(data);

        })

        .catch(e => {

        })
}




btn.addEventListener("click", Weather);

// Convert Kelvin to Celcius and Fahrenheit

var content = document.getElementById('content');
var modal = document.getElementById("errorModal");


content.style.display = "none";

function Convert(d) {

    if (d.cod == 200) {
        //errorMsg.Style.display = "none";
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
        //errorMsg.style.display = "block";

        content.style.display = "none";

        $("#errorModal").modal('show');
        document.getElementById("error").innerHTML = ("PLEASE ENTER A VAILID ZIP CODE!  COMPUTER MESSAGE SAYS: " + d.message);
    }

}
