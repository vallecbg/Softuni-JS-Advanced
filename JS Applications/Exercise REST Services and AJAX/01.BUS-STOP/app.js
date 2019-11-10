function getInfo() {
    const stopIdText = document.getElementById("stopId");
    const stopNameDiv = document.getElementById("stopName");
    const busesContainer = document.getElementById("buses");


    console.log(stopIdText.value);
    const busesUrl = `https://judgetests.firebaseio.com/businfo/${stopIdText.value}.json`;

    stopNameDiv.textContent = '';
    busesContainer.innerHTML = '';

    fetch(busesUrl)
        .then(res => res.json())
        .then(handleSuccess)
        .catch(handleError);
    
    function handleSuccess(data){
        const {name, buses} = data;
        stopNameDiv.textContent = name;

        Object.entries(buses)
        .forEach(([busId, busTime]) => {
            const li = document.createElement("li");
            li.textContent = `Bus ${busId} arrives in ${busTime} minutes.`;

            busesContainer.appendChild(li);
        })
    }

    function handleError(err){
        stopNameDiv.textContent = "Error";
    }
    
}