export const enroll = (courseList, courseToAdd) => {
    if(!(courseToAdd.courseName in courseList)) {
        courseList[courseToAdd.courseName] = courseToAdd
        return courseList
    }
    else{
        console.log("Already registered")
    }

};

export const drop = (courseList, courseToDrop) => {
    if((courseToDrop in courseList)){
        delete courseList[courseToDrop]
    }
    return courseList
};

export const swap = (courseList, courseToAdd, courseToDrop) => {

    courseList[courseToAdd.courseName] = courseToAdd
    delete courseList[courseToDrop]
    return courseList
};