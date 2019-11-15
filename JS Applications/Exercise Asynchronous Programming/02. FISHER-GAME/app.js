function attachEvents() {
    let anglerInp = document.getElementById("anglerVal");
    let weightInp = document.getElementById("weightVal");
    let speciesInp = document.getElementById("speciesVal");
    let locationInp = document.getElementById("locationVal");
    let baitInp = document.getElementById("baitVal");
    let captureTimeInp = document.getElementById("captureTimeVal");

    let catchesDiv = document.getElementById("catches");


    let addBtn = document.getElementsByClassName("add")[0];
    //this works
    addBtn.addEventListener("click", function () {
        clearErrorMessage();
        let angler = anglerInp.value;
        let weight = weightInp.value;
        let species = speciesInp.value;
        let location = locationInp.value;
        let bait = baitInp.value;
        let captureTime = captureTimeInp.value;
        let newCatch = {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        }

        fetch("https://fisher-game.firebaseio.com/catches.json", {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(newCatch)
            })
            .catch(handleError);

        clearInputs();

        function clearInputs() {
            anglerInp.value = "";
            weightInp.value = "";
            speciesInp.value = "";
            locationInp.value = "";
            baitInp.value = "";
            captureTimeInp.value = "";
        }
    })


    let loadBtn = document.getElementsByClassName("load")[0];

    loadBtn.addEventListener("click", load);

    function load() {
        clearErrorMessage();
        catchesDiv.innerHTML = "";
        fetch("https://fisher-game.firebaseio.com/catches.json")
            .then(result => result.json())
            .then(data => {
                let dataArr = Object.entries(data);
                console.log(dataArr);
                dataArr.forEach(c => {
                    let newDiv = document.createElement("div");
                    // newDiv.setAttribute("data-id", `${c[0]}`);
                    newDiv.setAttribute("id", `${c[0]}`)
                    newDiv.className = "catch";

                    //angler
                    let anglLab = document.createElement("label");
                    anglLab.textContent = "Angler";
                    newDiv.appendChild(anglLab);

                    let anglInp = document.createElement("input");
                    anglInp.value = `${c[1].angler}`
                    anglInp.className = "input";
                    newDiv.appendChild(anglInp);
                    newDiv.appendChild(document.createElement("hr"));

                    //  weight
                    let wLab = document.createElement("label");
                    wLab.textContent = "Weight";
                    newDiv.appendChild(wLab);

                    let wInp = document.createElement("input");
                    wInp.value = `${c[1].weight}`
                    wInp.className = "input";
                    wInp.setAttribute("type", "number")
                    newDiv.appendChild(wInp);
                    newDiv.appendChild(document.createElement("hr"));


                    //species
                    let sLab = document.createElement("label");
                    sLab.textContent = "Species";
                    newDiv.appendChild(sLab);

                    let sInp = document.createElement("input");
                    sInp.value = `${c[1].species}`
                    sInp.className = "input";
                    newDiv.appendChild(sInp);
                    newDiv.appendChild(document.createElement("hr"));

                    //location
                    let lLab = document.createElement("label");
                    lLab.textContent = "Location";
                    newDiv.appendChild(lLab);

                    let lInp = document.createElement("input");
                    lInp.value = `${c[1].location}`
                    lInp.className = "input";
                    newDiv.appendChild(lInp);
                    newDiv.appendChild(document.createElement("hr"));

                    //bait
                    let bLab = document.createElement("label");
                    bLab.textContent = "Bait";
                    newDiv.appendChild(bLab);

                    let bInp = document.createElement("input");
                    bInp.value = `${c[1].bait}`
                    bInp.className = "input";
                    newDiv.appendChild(bInp);
                    newDiv.appendChild(document.createElement("hr"));

                    //capture time
                    let cLab = document.createElement("label");
                    cLab.textContent = "Capture time";
                    newDiv.appendChild(cLab);

                    let cInp = document.createElement("input");
                    cInp.value = `${c[1].captureTime}`
                    cInp.className = "input";
                    cInp.setAttribute("type", "number")
                    newDiv.appendChild(cInp);
                    newDiv.appendChild(document.createElement("hr"));

                    //update
                    let updateBtn = document.createElement("button");
                    updateBtn.className = "button";
                    updateBtn.textContent = "UPDATE";
                    updateBtn.addEventListener("click", function () {
                        update(newDiv.id)
                    });
                    newDiv.appendChild(updateBtn)

                    //delete
                    let deleteBtn = document.createElement("button");
                    deleteBtn.className = "button";
                    deleteBtn.textContent = "DELETE";
                    deleteBtn.addEventListener("click", function () {
                        del(newDiv.id)
                    })
                    newDiv.appendChild(deleteBtn)

                    //append the new div
                    catchesDiv.appendChild(newDiv)
                });
            })
            .catch(handleError);
    }
    //this works too
    function del(id) {
        clearErrorMessage();
        fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
                method: 'DELETE'
            })
            .then(() => {
                let divToDelete = document.getElementById(id);
                divToDelete.remove();
            })
            .catch(handleError);
    }

    function update(id) {
        clearErrorMessage();
        let updateDiv = document.getElementById(id);
        let allInputs = updateDiv.getElementsByClassName("input");
        //console.log(allInputs);
        let newCatch = {
            angler: allInputs[0].value,
            weight: allInputs[1].value,
            species: allInputs[2].value,
            location: allInputs[3].value,
            bait: allInputs[4].value,
            captureTime: allInputs[5].value
        }

        //debugger;
        fetch(`https://fisher-game.firebaseio.com/catches/${id}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCatch)
            })
            .catch(handleError)
    }


    function handleError() {
        if (document.getElementById("errorText") === null) {
            let h1 = document.createElement("h1");
            h1.textContent = "An error occurred, try again!";
            h1.id = "errorText";
            catchesDiv.insertBefore(h1, catchesDiv.firstChild);
        }
    }

    function clearErrorMessage() {
        let h1 = document.getElementById("errorText");
        if (h1 !== null) {
            h1.remove();
        }
    }

}

attachEvents();