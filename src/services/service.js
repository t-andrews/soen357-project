import axios from "axios"


export const addToCourseCart = (courseToAdd) => {
    axios.post("http://localhost:5000/courseCart", courseToAdd).
    then(res => {
        console.log(res.data)
    })
}
export const deleteFromCourseCart = (courseToDelete) => {
    axios.delete("http://localhost:5000/courseCart/"+ courseToDelete.id).
    then(res => {
        console.log(res.data)
    })
}
//Cant add multiple classes at once :(
export const enroll = (courseToAdd) => {
    axios.post("http://localhost:5000/register", courseToAdd).
        then(res => {
            console.log(res.data)
    })

};

export const drop = (courseToDrop) => {
    axios.delete("http://localhost:5000/register/"+ courseToDrop.id).
    then(res => {
        console.log(res.data)
    })
};

export const swap = (courseToAdd, courseToDrop) => {
    drop(courseToDrop)
    enroll(courseToAdd)
};