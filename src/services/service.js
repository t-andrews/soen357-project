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

export function addToCourseCart(courseToAdd) {
    const _db = getDb();
    _db.courseCart.push({...courseToAdd, uniqueName: `${courseToAdd.courseName} ${courseToAdd.sections.find(s => s.component === 'Lecture')}`});
    updateDb(_db);
}

export function deleteFromCourseCart(courseToDelete) {
    const _db = getDb();
    _db.courseCart = _db.courseCart.filter(c => c.uniqueName !== courseToDelete.uniqueName);
    updateDb(_db);
}

export function enroll(coursesToAdd) {
    const _db = getDb();
    _db.register.push.apply(_db.register, coursesToAdd);
    updateDb(_db);
}

export function drop(courseToDrop) {
    const _db = getDb();
    _db.register = _db.register.filter(c => c.uniqueName !== courseToDrop.uniqueName);
    updateDb(_db);
}

export function swap(courseToAdd, courseToDrop) {
    drop(courseToDrop)
    enroll([{...courseToAdd, uniqueName: `${courseToAdd.courseName} ${courseToAdd.sections.find(s => s.component === 'Lecture').section}`}])
}
