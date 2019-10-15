class CheckingAccount{

    constructor(clientId, email, firstName, lastName){
        this.clientId = clientId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    get clientId(){
        return this._clientId;
    }

    set clientId(value){
        let clientRegex = /^[0-9]{6}$/gm;
        if(!clientRegex.test(value)){
            throw new TypeError("Client ID must be a 6-digit number");
        }

        this._clientId = value;
    }

    get email(){
        return this._email;
    }

    set email(value){
        let emailRegex = /[A-Za-z0-9\,\_\.]+@[A-Za-z0-9\,\_\.]+\.[A-Za-z0-9]+/gm;

        if(!emailRegex.test(value)){
            throw new TypeError("Invalid e-mail");
        }
    }

    get firstName(){
        return this._firstName;
    }

    set firstName(value){
        this.validateName(value, 'First');

        this._firstName = value;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(value){
        this.validateName(value, 'Last');

        this._lastName = value;
    }

    validateName(value, prop){
        if(value.length < 3 || value.length > 20){
            throw new TypeError(`${prop} name must be between 3 and 20 characters long`)
        }

        let nameRegex = /[A-Za-z]+/gm;
        if(!nameRegex.test(value)){
            throw new TypeError(`${prop} name must contain only Latin characters`)
        }

        return value;
    }
}

let acc = new CheckingAccount('131455', 'ivan@some.com', 'Ivan', 'P3trov')