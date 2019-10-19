function solve() {
    let array = JSON.parse(document.getElementById('array').value);
    let result = document.getElementById('result');
 
    let regex = new RegExp(`(\\s|^)(${array[0]}\\s+)([A-Z!#$%]{8,})(\\.|,|\\s|$)`, 'gi');
 
    for (let i = 1; i < array.length; i++) {
        let str = array[i];
        let match = regex.exec(str);
        while (match) {
            let encodeMessage = match[3];
            if (encodeMessage.toUpperCase() !== encodeMessage) {
                match = regex.exec(str);
                continue;
            }
            let decodeMessage = decodeMessageFunc(encodeMessage);
            let message = match[1] + match[2] + decodeMessage + match[4];
            str = str.replace(match[0], message);
            match = regex.exec(str);
        }
 
        let pElement = document.createElement('p');
        pElement.textContent = str;
        result.appendChild(pElement);
    }
 
    function decodeMessageFunc(encodeMessage) {
        while (encodeMessage.indexOf('!') !== -1) {
            encodeMessage = encodeMessage.replace('!', '1')
        }
 
        while (encodeMessage.indexOf('%') !== -1) {
            encodeMessage = encodeMessage.replace('%', '2')
        }
 
        while (encodeMessage.indexOf('#') !== -1) {
            encodeMessage = encodeMessage.replace('#', '3')
        }
 
        while (encodeMessage.indexOf('$') !== -1) {
            encodeMessage = encodeMessage.replace('$', '4')
        }
 
        return encodeMessage.toLowerCase()
    }
}