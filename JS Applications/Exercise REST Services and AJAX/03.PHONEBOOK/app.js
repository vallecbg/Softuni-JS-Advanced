function attachEvents() {
    const phoneBookContainer = document.getElementById("phonebook");
    const personInput = document.getElementById("person");
    const phoneInput = document.getElementById("phone");

    function loadPhonebook() {
        clearOutput();
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(res => res.json())
            .then(data => {
                Object.entries(data)
                    .forEach(([elId, phoneData]) => {
                        const {
                            phone,
                            person
                        } = phoneData;
                        const li = document.createElement("li");
                        li.textContent = `${person}: ${phone}`;
                        const deleteBtn = document.createElement("button");

                        deleteBtn.setAttribute("data-target", elId);
                        deleteBtn.addEventListener("click", deletePhonebook)
                        deleteBtn.textContent = "Delete";

                        li.appendChild(deleteBtn);
                        phoneBookContainer.appendChild(li);
                    })
            })
            .catch(handleError)
    }

    function createPhonebook() {
        const person = personInput.value;
        const phone = phoneInput.value;

        const headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                person,
                phone
            })
        }

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, headers)
            .then(() => {
                clearOutput();
                personInput.value = "";
                phoneInput.value = "";

                loadPhonebook();
            })
            .catch(handleError);
    }


    function deletePhonebook() {
        const phonebookId = (this.getAttribute("data-target"));

        const headers = {
            method : "DELETE"
        };

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${phonebookId}.json`, headers)
            .then(() => {
                clearOutput();
                loadPhonebook();
            })
            .catch(handleError);
    }

    function handleError() {
        phoneBookContainer.innerHTML = "There are no elements";
    }

    function clearOutput() {
        phoneBookContainer.innerHTML = "";
    }
    return {
        loadPhonebook,
        createPhonebook
    }
}

let result = attachEvents();