class Company {
    constructor() {
        this.departments = [];
    }

    addEmployee(username, salary, position, department) {
        if (!username || !salary || !position || !department) {
            throw new Error("Invalid input!");
        }

        if (salary < 0 || salary === "" || salary === undefined || salary === null) {
            throw new Error("Invalid input!");
        }

        let currDepartment = this.departments.filter(u => u.department === department)[0];
        if (!currDepartment) {
            currDepartment = {
                department,
                employeers: [],
                averageSalary: function () {
                    return this.employeers.reduce((prev, current) => prev + current.salary, 0) / this.employeers.length;
                }
            }
            this.departments.push(currDepartment);
        }

        let employee = {
            username,
            salary,
            position
        }

        currDepartment.employeers.push(employee);

        return `New employee is hired. Name: ${username}. Position: ${position}`;
    }

    bestDepartment() {
        const [best] = [...this.departments]
        .sort((a, b) => {
            return b.averageSalary() - a.averageSalary()
        });

        let result = `Best Department is: ${best.department}\n`;
        result += `Average salary: ${best.averageSalary().toFixed(2)}\n`
        result += [...best.employeers]
            .sort((a, b) => b.salary - a.salary || a.username.localeCompare(b.username))
            .map(x => `${x.username} ${x.salary} ${x.position}`)
            .join("\n");

        return result;
    }
}

// function checkIsValid(input) {
//     if (input === "" || typeof input === undefined ||
//         typeof input === null) {
//         return false;
//     }

//     return true;
// }


let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());