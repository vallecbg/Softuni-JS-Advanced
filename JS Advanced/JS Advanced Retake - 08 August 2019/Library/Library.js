class Library {
    constructor(libraryName) {
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscriptionTypes = {
            normal: libraryName.length,
            special: libraryName.length * 2,
            vip: Number.MAX_SAFE_INTEGER
        };
    }

    subscribe(name, type) {
        if (!this.subscriptionTypes.hasOwnProperty(type)) {
            throw new Error(`The type ${type} is invalid`);
        }

        let subscriber = this.subscribers.filter(w => w.name === name)[0]
        if (!subscriber) {
            subscriber = {
                name: name,
                type: type,
                books: []
            };
            this.subscribers.push(subscriber);
        } else {
            subscriber.type = type;
        }

        return subscriber;
    }

    unsubscribe(name) {
        let subscriber = this.subscribers.filter(w => w.name === name)[0]

        if (!subscriber) {
            throw new Error(`There is no such subscriber as ${name}`);
        }
        let index = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index, 1);

        return this.subscribers;
    }

    receiveBook(subscriberName, bookTitle, bookAuthor) {
        let subscriber = this.subscribers.filter(w => w.name === subscriberName)[0]

        if (!subscriber) {
            throw new Error(`There is no such subscriber as ${subscriberName}`);
        }

        if (this.subscriptionTypes.hasOwnProperty(subscriber.type)) {
            let maxBooks = this.subscriptionTypes[subscriber.type];

            //TODO: check < or <=
            if (subscriber.books.length < maxBooks) {
                let book = {
                    title: bookTitle,
                    author: bookAuthor
                };

                subscriber.books.push(book);
            } else {
                throw new Error(`You have reached your subscription limit ${maxBooks}!`)
            }
        }

        return subscriber;
    }

    showInfo() {
        let result = "";
        this.subscribers.forEach(s => {
            result += `Subscriber: ${s.name}, Type: ${s.type}\n`;

            let subscriberBooks = [];
            for (let line in s.books) {
                let currBook = s.books[line];
                subscriberBooks.push(`${currBook.title} by ${currBook.author}`);
            }

            result += `Received books: ${subscriberBooks.join(", ")}\n`;
        });



        if (result === "") {
            return `${this.libraryName} has no information about any subscribers`
        }

        return result.trim();
    }
}

let lib = new Library('Lib');

lib.subscribe('Peter', 'normal');
lib.subscribe('John', 'special')

lib.receiveBook('John', 'A Song of Ice and Fire', 'George R. R. Martin');
lib.receiveBook('Peter', 'Lord of the rings', 'J. R. R. Tolkien');
lib.receiveBook('John', 'Harry Potter', 'J. K. Rowling');

console.log(lib.showInfo());