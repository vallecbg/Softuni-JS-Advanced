function attachEvents() {
    const mainDiv = document.getElementById("content");

    const messagesTextarea = document.getElementById("messages");
    const authorInput = document.getElementById("author");
    const contentInput = document.getElementById("content");

    const submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", submitMessage);
    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refreshMessage);

    function submitMessage(){
        const author = authorInput.value;
        const content = contentInput.value;

        const headers = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author,
                content
            })
        }

        fetch(`https://rest-messanger.firebaseio.com/messanger.json`, headers)
            .then(() => {
                clearOutput();
                authorInput.value = "";
                contentInput.value = "";

                refreshMessage();
            })
        .catch(handleError);
    }

    function refreshMessage(){
        clearOutput();
        fetch(`https://rest-messanger.firebaseio.com/messanger.json`)
            .then((res) => res.json())
            .then(data => {
                Object.entries(data)
                    .forEach(([elId, messageData]) => {
                        const {author, content} = messageData;

                        const li = document.createElement("li");
                        li.textContent = `${author}: ${content}`;
                        messagesTextarea.append(li.textContent + "\n")
                    })
            })
            .catch(handleError); 
    }

    function clearOutput(){
        messagesTextarea.innerText = "";
    }

    function handleError(){
        messagesTextarea.innerText = "An error occurred";
    }

    return {
        submitMessage,
        refreshMessage
    }
}

let result = attachEvents();