function encodeAndDecodeMessages() {
    document.querySelector("#main > div:nth-child(1) > button").addEventListener("click", encode);
    document.querySelector("#main > div:nth-child(2) > button").addEventListener("click", decode);
    let messageInput = document.querySelector("#main > div:nth-child(1) > textarea");
    let messageOutput = document.querySelector("#main > div:nth-child(2) > textarea");

    function encode(){
        let output = '';
        for (const char of messageInput.value) {
            output += nextChar(char);
        }

        messageInput.value = '';
        messageOutput.value = output;
    }

    function decode(){
        let output = '';
        for (const char of messageOutput.value) {
            output += previousChar(char);
        }

        messageOutput.value = '';
        messageInput.value = output;
    }

    function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }

    function previousChar(c) {
        return String.fromCharCode(c.charCodeAt(0) - 1);
    }
}