import {
    get,
    post,
    put,
    del
} from "./requester.js";

const html = {
    'getAllStudents': () => document.getElementById("all-students"),

    'getStudentFirstName': () => document.getElementById("firstName"),
    'getStudentLastName': () => document.getElementById("lastName"),
    'getStudentFacultyNumber': () => document.getElementById("facultyNumber"),
    'getStudentGrade': () => document.getElementById("grade"),
    'getStudentId': () => document.getElementById("id")
}

const actions = {
    'load-students': async function () {
        try {
            const students = await get("appdata", "students");
            const studentsContainer = html.getAllStudents();
            const fragment = document.createDocumentFragment();

            students.sort((a, b) => a.id - b.id);
            students.forEach(s => {
                const tr = document.createElement("tr");

                const idTd = document.createElement("td");
                const firstNameTd = document.createElement("td");
                const lastNameTd = document.createElement("td");
                const facultyNumberTd = document.createElement("td");
                const gradeTd = document.createElement("td");

                idTd.textContent = s.id;
                firstNameTd.textContent = s.firstName;
                lastNameTd.textContent = s.lastName;
                facultyNumberTd.textContent = s.facultyNumber;
                gradeTd.textContent = s.grade;

                tr.append(idTd, firstNameTd, lastNameTd, facultyNumberTd, gradeTd);

                fragment.appendChild(tr);
            })

            studentsContainer.innerHTML = "";
            studentsContainer.appendChild(fragment);

        } catch (err) {
            alert(err);
        }
    },
    'create-student': async function(){
        const id = html.getStudentId();
        const firstName = html.getStudentFirstName();
        const lastName = html.getStudentLastName();
        const facultyNumber = html.getStudentFacultyNumber();
        const grade = html.getStudentGrade();

        if(firstName !== null && lastName !== null && facultyNumber !== null && grade !== null && id !== null){
            const data = {
                id: id.value,
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value
            }

            try{
                await post("appdata", "students", data);

                id.value = "";
                firstName.value = "";
                lastName.value = "";
                facultyNumber.value = "";
                grade.value = "";

                actions['load-students']();
            } catch (err) {
                alert(err);
            }
        }
    }
}

function handleEvent(e) {
    if (typeof actions[e.target.id] === "function") {
        e.preventDefault();

        actions[e.target.id]();
    }
}

(function attachEvents() {
    document.addEventListener("click", handleEvent);
}())