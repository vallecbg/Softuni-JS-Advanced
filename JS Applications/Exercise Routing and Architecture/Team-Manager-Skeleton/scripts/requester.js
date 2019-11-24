const baseUrl = "https://baas.kinvey.com"
const appKey = "kid_H1IIaApiS";
const appSecret = "bc180a06ec9842a8bdb15fdd6551ff2c";

function createAuthorization(type){
    return type === "Basic"
    ? `Basic ${btoa(`${appKey}:${appSecret}`)}`
    : `Kinvey ${sessionStorage.getItem("authtoken")}`
}

function makeHeaders(type, httpMethod, data){
    const headers = {
        method: httpMethod,
        headers: {
            "Authorization": createAuthorization(type),
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

function deserializeData(x){
    return x.json();
}

function fetchData(kinveyModule, endPoint, headers){
    const url = `${baseUrl}/${kinveyModule}/${appKey}/${endPoint}`;

    return fetch(url, headers)
        .then(handleError)
        .then(deserializeData)
}

//GET
export function get(kinveyModule, endPoint, type){
    const headers = makeHeaders(type, "GET");

    return fetchData(kinveyModule, endPoint, headers);
}

//POST
export function post(kinveyModule, endPoint, data, type){
    const headers = makeHeaders(type, "POST", data);

    return fetchData(kinveyModule, endPoint, headers);
}

//PUT
export function put(kinveyModule, endPoint, data, type){
    const headers = makeHeaders(type, "PUT", data);

    return fetchData(kinveyModule, endPoint, headers);
}

//DELETE
export function del(kinveyModule, endPoint, type){
    const headers = makeHeaders(type, "DELETE");

    return fetchData(kinveyModule, endPoint, headers);
}