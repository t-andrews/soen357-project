import axios from "axios"

const host = (process.env.SERVICE_HOST ?? "http://localhost:5000/")

export const getEnrolledCourses = async () => {
    try {
        return (await axios.get( host+ "register")).data;
    } catch (err) {
        console.log(err)
        return [];
    }
}

export const addToCourseCart = (courseToAdd) => {
    axios.post(host + "courseCart", courseToAdd).then(res => {console.log(res.data)});
}

export const deleteFromCourseCart = (courseToDelete) => {
    axios.delete(host + "courseCart/"+ courseToDelete.id).then(res => {console.log(res.data)});
}
//Cant add multiple classes at once :(
export const enroll = (courseToAdd) => {
    axios.post(host + "register", courseToAdd).then(res => {console.log(res.data)});
};

export const drop = (courseToDrop) => {
    axios.delete(host + "register/"+ courseToDrop.id).then(res => {console.log(res.data)});
};

export const swap = (courseToAdd, courseToDrop) => {
    drop(courseToDrop)
    enroll(courseToAdd)
};
