class Computer {
    constructor(ramMemory, cpuGHz, hddMemory) {
        this.ramMemory = ramMemory;
        this.cpuGHz = cpuGHz;
        this.hddMemory = hddMemory;
        this.taskManager = [];
        this.installedPrograms = [];
        this.totalCpu = 0;
        this.totalRam = 0;
    }

    installAProgram(name, requiredSpace) {
        if (requiredSpace > this.hddMemory) {
            throw new Error("There is not enough space on the hard drive");
        }

        const program = {
            name,
            requiredSpace
        };

        this.installedPrograms.push(program);

        this.hddMemory -= requiredSpace;

        return program;
    }

    uninstallAProgram(name) {
        if (!this.installedPrograms.some(a => a.name === name)) {
            throw new Error("Control panel is not responding");
        }
        let index = this.installedPrograms.findIndex(x => x.name === name);
        let memory = this.installedPrograms[index].requiredSpace;
        this.hddMemory += memory;
        this.installedPrograms.splice(index, 1);

        return this.installedPrograms;
    }

    openAProgram(name) {
        if (!this.installedPrograms.some(a => a.name === name)) {
            throw new Error(`The ${name} is not recognized`);
        }
        if (this.taskManager.some(a => a.name === name)) {
            throw new Error(`The ${name} is already open`);
        }
        
        let programsWithDuplicateName = this.installedPrograms.filter(a => a.name === name).length
        let program;
        if (programsWithDuplicateName > 1) {
            program = this.installedPrograms.filter(a => a.name === name)[1];
        } else {
            program = this.installedPrograms.filter(a => a.name === name)[0];
        }

        let ramConsumation = (program.requiredSpace / this.ramMemory) * 1.5;
        let cpuConsumation = ((program.requiredSpace / this.cpuGHz) / 500) * 1.5;

        this.totalRam += ramConsumation;
        this.totalCpu += cpuConsumation;

        //TODO: Check [for all opened programs]
        if (this.totalRam >= 100) {
            throw new Error(`${program.name} caused out of memory exception`);
        }
        if (this.totalCpu >= 100) {
            throw new Error(`${program.name} caused out of cpu exception`);
        }

        let obj = {
            name: program.name,
            ramUsage: ramConsumation,
            cpuUsage: cpuConsumation
        }

        this.taskManager.push(obj);

        return obj;
    }

    taskManagerView() {
        if (this.taskManager.length === 0) {
            return `All running smooth so far`;
        }
        let output = ``;
        for (const x of this.taskManager) {
            output += `Name - ${x.name} | Usage - CPU: ${x.cpuUsage.toFixed(0)}%, RAM: ${x.ramUsage.toFixed(0)}%\n`
        }

        return output.trim("\n");
    }
}

// Zero Test - Task Manager View

// arrange
let computer = new Computer(4096, 7.5, 250000);

// act
computer.installAProgram('Word', 7300);
computer.installAProgram('Excel', 10240);
computer.installAProgram('PowerPoint', 12288);
computer.installAProgram('Solitare', 1500);

computer.openAProgram('Word');
computer.openAProgram('Excel');
computer.openAProgram('PowerPoint');
computer.openAProgram('Solitare');

let actualResult = computer.taskManagerView();
console.log(actualResult);