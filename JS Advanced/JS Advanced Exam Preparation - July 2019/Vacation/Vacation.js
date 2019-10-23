class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    get numberOfChildren() {
        this._numberOfChildren = 0;

        for (const grade in this.kids) {
            this._numberOfChildren += this.kids[grade].length;
        }

        return this._numberOfChildren;
    }

    registerChild(name, grade, budget) {
        if (budget < this.budget) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`;
        }

        if (!this.kids.hasOwnProperty(grade)) {
            this.kids[grade] = [];
        }

        const index = this.kids[grade].findIndex(k => k.startsWith(name));

        if (index > -1) {
            return `${name} is already in the list for this ${this.destination} vacation.`;
        }

        this.kids[grade].push(`${name}-${budget}`);
        return this.kids[grade];
    }

    removeChild(name, grade) {
        if (!this.kids.hasOwnProperty(grade)) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        const index = this.kids[grade].findIndex(k => k.startsWith(name));

        if (index === -1) {
            return `We couldn't find ${name} in ${grade} grade.`;
        }

        this.kids[grade].splice(index, 1);
        return this.kids[grade];
    }

    toString() {
        


        if (this.numberOfChildren > 0 || this.kids === []) {
            let result = "";
            result += `${this.organizer} will take ${this.numberOfChildren} children on trip to ${this.destination}\n`;

            for (const grade in this.kids) {
                result += `Grade: ${grade}\n`;
                let count = 1;
                for (const kid of this.kids[grade]) {
                    result += `${count}. ${kid}\n`
                    count++;
                }
            }
            
            return result;
        } else {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }
    }
}
let vacation = new Vacation('Miss Elizabeth', 'Dubai', 2000);
vacation.registerChild('Gosho', 5, 3000);
vacation.registerChild('Lilly', 6, 1500);
vacation.registerChild('Pesho', 7, 4000);
vacation.registerChild('Tanya', 5, 5000);
vacation.registerChild('Mitko', 10, 5500)
console.log(vacation.toString());