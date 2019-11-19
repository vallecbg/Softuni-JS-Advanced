const username = "guest";
const password = "guest";

const baseUrl = "https://baas.kinvey.com"
const appKey = "kid_H1IIaApiS";
const appSecret = "bc180a06ec9842a8bdb15fdd6551ff2c";

function makeHeaders(httpMethod, data){
    const headers = {
        method: httpMethod,
        headers: {
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`,
            "Content-Type": "application/json"
        }
    }

    if(httpMethod === "POST" || httpMethod === "PUT"){
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function handleError(e){
    if(!e.ok){
        throw new Error(e.statusText);
    }

    return e;
}

function serializeData(x){
    return x.json();
}

function fetchData(kinveyModule, endPoint, headers){
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(serializeData)
}

//GET
export function get(kinveyModule, endPoint){
    const headers = makeHeaders("GET");

    return fetchData(kinveyModule, endPoint, headers);
}

//POST
export function post(kinveyModule, endPoint, data){
    const headers = makeHeaders("POST", data);

    return fetchData(kinveyModule, endPoint, headers);
}

//PUT
export function put(kinveyModule, endPoint, data){
    const headers = makeHeaders("PUT", data);

    return fetchData(kinveyModule, endPoint, headers);
}

//DELETE
export function del(kinveyModule, endPoint){
    const headers = makeHeaders("DELETE");

    return fetchData(kinveyModule, endPoint, headers);
}