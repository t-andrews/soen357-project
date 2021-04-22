export function updateDb(newValue) {
    localStorage.setItem("db", JSON.stringify(newValue));
}

export function getDb() {
    return JSON.parse(localStorage.getItem("db"));
}

export function getEnrolledCourses () {
    return getDb().register;
}

export function getCourseCart () {
    return getDb().courseCart;
}

function appendUniqueName(course) {
    course.uniqueName = `${course.courseName} ${course.sections.find(s => s.component === 'Lecture').section}`;
    return course;
}

export function addToCourseCart(courseToAdd) {
    const _db = getDb();
    _db.courseCart.push(appendUniqueName(courseToAdd));
    updateDb(_db);
}

export function deleteFromCourseCart(courseToDelete) {
    const _db = getDb();
    _db.courseCart = _db.courseCart.filter(c => c.uniqueName !== courseToDelete.uniqueName);
    updateDb(_db);
}

function assignColor(course) {
    const _db = getDb();
    for (const prop in _db.colors) {
        if (_db.colors.hasOwnProperty(prop) && _db.colors[prop] === false) {
            course.color = prop;
            _db.colors[prop] = true;
            break;
        }
    }

    updateDb(_db);
    return course;
}

function freeColor(color) {
    const _db = getDb();
    _db.colors[color] = false;
    updateDb(_db);
}

export function enroll(coursesToAdd) {
    const courses = coursesToAdd.map(c => assignColor(appendUniqueName(c)))
    const _db = getDb();
    _db.register.push.apply(_db.register, courses);
    updateDb(_db);
}

export function drop(coursesToDrop) {
    coursesToDrop.forEach(c=> freeColor(c.color));

    const _db = getDb();
    _db.register = _db.register.filter(c => !coursesToDrop.some(cd => cd.uniqueName === c.uniqueName));
    updateDb(_db);
}

export function swap(courseToAdd, courseToDrop) {
    drop(courseToDrop)
    enroll([appendUniqueName(courseToAdd)])
}
