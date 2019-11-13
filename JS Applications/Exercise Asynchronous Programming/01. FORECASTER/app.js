function attachEvents() {
    const forecastDiv = document.getElementById("forecast");
    const submitBtn = document.getElementById("submit");
    const currentForecastDiv = document.querySelector("#current");
    const currentAll = document.querySelector("#current > div.currentAll");
    const upcomingAll = document.querySelector("#upcoming > div.upcomingAll");
    submitBtn.addEventListener("click", getWeather);

    function getWeather() {
        currentAll.innerHTML = "";
        upcomingAll.innerHTML = "";
        const locationText = document.getElementById("location");
        const location = locationText.value;
        let allLocations = [];

        fetch(`https://judgetests.firebaseio.com/locations.json`)
            .then(x => x.json())
            .then((x) => {
                for (let i = 0; i < x.length; i++) {
                    let currentTown = x[i];
                    allLocations.push({
                        name: currentTown.name,
                        code: currentTown.code
                    });
                }

                let foundTown = allLocations.filter(c => c.name === location)[0];
                if (foundTown) {
                    fetch(`https://judgetests.firebaseio.com/forecast/today/${foundTown.code}.json`)
                        .then(x => x.json())
                        .then((data) => {
                            let forecastsDiv = document.createElement("div");
                            forecastsDiv.classList.add("forecasts");

                            let conditionSymbol = document.createElement("span");
                            conditionSymbol.classList.add("condition", "symbol");
                            conditionSymbol.textContent = checkWeatherCondition(data.forecast["condition"]);
                            forecastsDiv.appendChild(conditionSymbol);

                            let firstLine = document.createElement("span");
                            firstLine.classList.add("forecast-data");
                            firstLine.textContent = `${data.name}`;
                            forecastsDiv.appendChild(firstLine);

                            let currentForecast = data.forecast;

                            let secondLine = document.createElement("span");
                            secondLine.classList.add("forecast-data");
                            secondLine.textContent = `${currentForecast["low"]}°/${currentForecast["high"]}°`
                            forecastsDiv.appendChild(secondLine);

                            let thirdLine = document.createElement("span");
                            thirdLine.classList.add("forecast-data");
                            thirdLine.textContent = `${currentForecast["condition"]}`;
                            forecastsDiv.appendChild(thirdLine);



                            currentAll.appendChild(forecastsDiv);
                        })
                        .catch(handleError)


                    fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${foundTown.code}/forecast.json`)
                        .then(x => x.json())
                        .then((data) => {
                            let forecastInfoDiv = document.createElement("div");
                            forecastInfoDiv.classList.add("forecast-info");

                            for (let i = 0; i < data.length; i++) {
                                let currentForecast = data[i];

                                let upcomingSpan = document.createElement("span");
                                upcomingSpan.classList.add("upcoming");

                                let firstLine = document.createElement("span");
                                firstLine.classList.add("symbol");
                                firstLine.textContent = checkWeatherCondition(currentForecast["condition"]);
                                upcomingSpan.appendChild(firstLine);

                                let secondLine = document.createElement("span");
                                secondLine.classList.add("forecast-data");
                                secondLine.textContent = `${currentForecast["low"]}°/${currentForecast["high"]}°`
                                upcomingSpan.appendChild(secondLine);

                                let thirdLine = document.createElement("span");
                                thirdLine.classList.add("forecast-data");
                                thirdLine.textContent = `${currentForecast["condition"]}`;
                                upcomingSpan.appendChild(thirdLine);


                                forecastInfoDiv.appendChild(upcomingSpan);
                            }

                            upcomingAll.appendChild(forecastInfoDiv);
                        })
                        .catch(handleError)
                } else {
                    throw new Error();
                } //TODO: handle error
            })
            .catch(handleError);

        forecastDiv.style.display = "block";
        locationText.value = "";
    }

    function checkWeatherCondition(weather) {
        switch (weather) {
            case "Sunny":
                return "☀";
            case "Partly sunny":
                return "⛅";
            case "Overcast":
                return "☁";
            case "Rain":
                return "☂";
        }
    }

    function handleError() {
        let error = document.createElement("span");
        error.classList.add("forecast-data");
        error.textContent = "An error occurred!";

        currentAll.appendChild(error);
    }
}

attachEvents();