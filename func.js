// Place to input your API key don't make any
const apiKey = ""; 
        // This link is for api call
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            try {
                const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                
                // Use for get the data in server to use 
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

                // Set weather icon based on weather condition
                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "./img/cloud.png";
                } else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "./img/clear.png";
                } else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "./img/Rain_Animated_Icon___Free_weather_Animated_Icon-removebg-preview.png";
                } else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "./img/drizzle.png";
                } else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "./img/mist.png";
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
                alert("Unable to fetch weather data. Please check your internet connection or try again later.");
            }
        }

        searchBtn.addEventListener("click", () => {
            const city = searchBox.value.trim();
            if (city) {
                checkWeather(city);
            } else {
                alert("Please enter a city name.");
            }
        });