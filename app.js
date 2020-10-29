window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temp-description');
    let temperatureDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api).then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                // Set DOM Elements from api
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Formula for celsius
                let celsius = (temperature - 32) * (5/9);

                // Set icon
                setIcons(icon, document.querySelector(".icon"));

                // change temperature C/F
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            });
        });
    }else {
        h1.textContent = "Hey this is not working because reasons"
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});