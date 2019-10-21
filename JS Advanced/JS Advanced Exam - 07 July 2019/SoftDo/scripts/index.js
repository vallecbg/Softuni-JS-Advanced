// NOTE: The comment sections inside the index.html file is an example of how suppose to be structured the current elements.
//       - You can use them as an example when you create those elements, to check how they will be displayed, just uncomment them.
//       - Also keep in mind that, the actual skeleton in judge does not have this comment sections. So do not be dependent on them!
//       - Тhey are present in the skeleton just to help you!


// This function will be invoked when the html is loaded. Check the console in the browser or index.html file.
function mySolution() {
    let btn = document.querySelector("#inputSection > div > button").addEventListener("click", sendToPending);

    function sendToPending() {
        let div = document.createElement("div");
        div.className = "pendingQuestion";

        const img = document.createElement("img");
        img.src = './images/user.png';
        img.width = 32;
        img.height = 32;
        div.appendChild(img);

        let username = document.querySelector("#inputSection > div > input[type=username]").value;
        if (username === "") {
            username = "Anonymous";
        }

        let span = document.createElement("span");
        //TODO: think about innerhtml
        span.textContent = username;
        div.appendChild(span);

        let question = document.querySelector("#inputSection > textarea").value;
        let p = document.createElement("p");
        p.textContent = question;
        div.appendChild(p);

        let actions = document.createElement("div");
        actions.classList.add("actions");
        let archiveBtn = document.createElement("button");
        archiveBtn.classList.add("archive");
        archiveBtn.textContent = "Archive";
        archiveBtn.addEventListener("click", archive);

        let openBtn = document.createElement("button");
        openBtn.classList.add("open");
        openBtn.textContent = "Open";
        openBtn.addEventListener("click", open);

        actions.appendChild(archiveBtn);
        actions.appendChild(openBtn);

        div.appendChild(actions);

        //Append
        let pendingQuestions = document.querySelector("#pendingQuestions");
        pendingQuestions.appendChild(div);

        function archive() {
            div.remove();
        }

        function open(){
            div.className = "openQuestion";

            let openDiv = document.querySelector("#openQuestions");

            let actions = div.querySelector(".actions");
            actions.innerHTML = "";
            let replyBtn = document.createElement("button");
            replyBtn.classList.add("reply");
            replyBtn.textContent = "Reply";
            replyBtn.addEventListener("click", replyShowHide);

            actions.appendChild(replyBtn);

            let replyDiv = document.createElement("div");
            replyDiv.classList.add("replySection");
            replyDiv.style.display = "none";
            let inputText = document.createElement("input");
            inputText.classList.add("replyInput");
            inputText.type = "text";
            inputText.placeholder = "Reply to this question here...";

            let inputButton = document.createElement("button");
            inputButton.classList.add("replyButton");
            inputButton.textContent = "Send";
            inputButton.addEventListener("click", reply);

            let inputOl = document.createElement("ol");
            inputOl.classList.add("reply");
            inputOl.type = "1";

            replyDiv.appendChild(inputText);
            replyDiv.appendChild(inputButton);
            replyDiv.appendChild(inputOl);

            div.appendChild(replyDiv);
            
            div.remove();
            openDiv.appendChild(div);

            function replyShowHide(){
                if(replyDiv.style.display === "none"){
                    replyDiv.style.display = "block";
                } else {
                    replyDiv.style.display = "none";
                }
            }

            function reply(){
                let li = document.createElement("li");
                li.textContent = inputText.value;
                inputOl.appendChild(li);
            }
        }
    }
}




// To check out your solution, just submit mySolution() function in judge system.