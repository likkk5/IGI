// Начальные данные об учениках
const initialStudentsData = [
    { firstName: "Иван", lastName: "Иванов", grades: { physics: 4, math: 5, literature: 4 } },
    { firstName: "Мария", lastName: "Петрова", grades: { physics: 3, math: 4, literature: 5 } },
    { firstName: "Петр", lastName: "Сидоров", grades: { physics: 4, math: 4, literature: 4 } },
    { firstName: "Анна", lastName: "Кузнецова", grades: { physics: 5, math: 5, literature: 5 } }
];
function formatGrades(grades) {
    return `Физика - ${grades.physics}, Математика - ${grades.math}, Литература - ${grades.literature}`;
}

// 1) Прототипное наследование
// Базовый класс Person
function PersonProto(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// Геттер для полного имени
PersonProto.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
};

// Сеттер для имени
PersonProto.prototype.setFirstName = function(newFirstName) {
    this.firstName = newFirstName;
};

// Сеттер для фамилии
PersonProto.prototype.setLastName = function(newLastName) {
    this.lastName = newLastName;
};

// Класс-наследник Student
function StudentProto(firstName, lastName, grades) {
    PersonProto.call(this, firstName, lastName); // вызов конструктора базового класса
    this.grades = grades;
}

StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;

// Геттер для оценок
StudentProto.prototype.getGrades = function() {
    return this.grades;
};

// Проверка на проходной балл
StudentProto.prototype.hasPassingGrades = function() {
    return Object.values(this.grades).every(grade => grade >= 4);
};

const studentsPrototype = initialStudentsData.map(data => 
    new StudentProto(data.firstName, data.lastName, data.grades)
);

function displayAllStudentsPrototype(students) {
    const container = document.getElementById('students-list-all-prototype');
    container.innerHTML = '';
    students.forEach(student => {
        const studentDiv = document.createElement('div');
        // studentDiv.textContent = `${student.getFullName()} - Оценки: ${JSON.stringify(student.getGrades())}`;
        studentDiv.textContent = `${student.getFullName()} - Оценки: ${formatGrades(student.getGrades())}`;
        container.appendChild(studentDiv);
    });
}

function displayPassingStudentsPrototype(students) {
    const container = document.getElementById('students-list-prototype');
    container.innerHTML = '';
    students
        .filter(student => student.hasPassingGrades())
        .forEach(student => {
            const studentDiv = document.createElement('div');
            // studentDiv.textContent = `${student.getFullName()} - Оценки: ${JSON.stringify(student.getGrades())}`;
            studentDiv.textContent = `${student.getFullName()} - Оценки: ${formatGrades(student.getGrades())}`;
            container.appendChild(studentDiv);
        });
}

function addStudentPrototype(form) {
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const grades = {
        physics: Number(form.physics.value),
        math: Number(form.math.value),
        literature: Number(form.literature.value)
    };
    const newStudent = new StudentProto(firstName, lastName, grades);
    studentsPrototype.push(newStudent);
    displayAllStudentsPrototype(studentsPrototype);
    displayPassingStudentsPrototype(studentsPrototype);
}

// 2) Классы и extends

class PersonClass {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    setFirstName(newFirstName) {
        this.firstName = newFirstName;
    }

    setLastName(newLastName) {
        this.lastName = newLastName;
    }
}

class StudentClass extends PersonClass {
    constructor(firstName, lastName, grades) {
        super(firstName, lastName);
        this.grades = grades;
    }

    getGrades() {
        return this.grades;
    }

    hasPassingGrades() {
        return Object.values(this.grades).every(grade => grade >= 4);
    }
}

const studentsClass = initialStudentsData.map(data =>
    new StudentClass(data.firstName, data.lastName, data.grades)
);

function displayAllStudentsClass(students) {
    const container = document.getElementById('students-list-all-class');
    container.innerHTML = '';
    students.forEach(student => {
        const studentDiv = document.createElement('div');
        studentDiv.textContent = `${student.getFullName()} - Оценки: ${formatGrades(student.getGrades())}`;
        container.appendChild(studentDiv);
    });
}

function displayPassingStudentsClass(students) {
    const container = document.getElementById('students-list-class');
    container.innerHTML = '';
    students
        .filter(student => student.hasPassingGrades())
        .forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.textContent = `${student.getFullName()} - Оценки: ${formatGrades(student.getGrades())}`;
            container.appendChild(studentDiv);
        });
}

function addStudentClass(form) {
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const grades = {
        physics: Number(form.physics.value),
        math: Number(form.math.value),
        literature: Number(form.literature.value)
    };
    const newStudent = new StudentClass(firstName, lastName, grades);
    studentsClass.push(newStudent);
    displayAllStudentsClass(studentsClass);
    displayPassingStudentsClass(studentsClass);
}

// Переключение и добавление студентов

let currentAddStudentFunction = addStudentPrototype;
let currentDisplayAllFunction = displayAllStudentsPrototype;
let currentDisplayPassingFunction = displayPassingStudentsPrototype;

function usePrototypeInheritance() {
    currentAddStudentFunction = addStudentPrototype;
    currentDisplayAllFunction = displayAllStudentsPrototype;
    currentDisplayPassingFunction = displayPassingStudentsPrototype;
    document.getElementById('students-list-class').innerHTML = '';
    document.getElementById('students-list-all-class').innerHTML = '';
    displayAllStudentsPrototype(studentsPrototype);
    displayPassingStudentsPrototype(studentsPrototype);
}

function useClassInheritance() {
    currentAddStudentFunction = addStudentClass;
    currentDisplayAllFunction = displayAllStudentsClass;
    currentDisplayPassingFunction = displayPassingStudentsClass;
    document.getElementById('students-list-prototype').innerHTML = '';
    document.getElementById('students-list-all-prototype').innerHTML = '';
    displayAllStudentsClass(studentsClass);
    displayPassingStudentsClass(studentsClass);
}

function addStudent() {
    const form = document.getElementById('studentForm');
    currentAddStudentFunction(form);
}

// Показать данные по умолчанию при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    usePrototypeInheritance();
});
