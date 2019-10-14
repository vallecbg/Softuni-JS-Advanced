class Request{
    constructor(method, uri, version, message){
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message,
        this.response = undefined,
        this.fulfilled = false
    }
}

console.log([new Request("a", "b", "c", "d"), new Request("a", "b", "c", "d")])