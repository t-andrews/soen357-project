import React, {useEffect, useState} from "react";
import * as Service from "../../services/service";

//Example
export default function Test() {
    const courseToAdd = {
        "id": 3,
        "courseName": "SOEN 345",
        "courseTitle": "Testing",
        "color": "#C63A3A",
        "units": "3.00",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "jweofwejofwifw",
        "instructor": "Essam Mansour",
        "term": "Winter 2021",
        "status": "waitlisted",
        "sections": [
            {
                "number": 3356,
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": [
                    "Monday", "Wednesday"
                ]
            },
            {
                "number": 3357,
                "component": "Tutorial",
                "section": "S SA",
                "startTime": "8:45AM",
                "endTime": "9:55AM",
                "location": "H-345 SGW",
                "days": [
                    "Tuesday"
                ]
            }
        ]
    }
    //once added there will be id associated
    const courseToDrop = {
        "id": 3,
        "courseName": "SOEN 345",
        "courseTitle": "Testing",
        "color": "#C63A3A",
        "units": "3.00",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "jweofwejofwifw",
        "instructor": "Essam Mansour",
        "term": "Winter 2021",
        "status": "waitlisted",
        "sections": [
            {
                "number": 3356,
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": [
                    "Monday", "Wednesday"
                ]
            },
            {
                "number": 3357,
                "component": "Tutorial",
                "section": "S SA",
                "startTime": "8:45AM",
                "endTime": "9:55AM",
                "location": "H-345 SGW",
                "days": [
                    "Tuesday"
                ]
            }
        ]
    }

    const courseToSwapIn = {
        "id": 5,
        "courseName": "SOEN 456",
        "courseTitle": "Testing",
        "color": "#C63A3A",
        "units": "3.00",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "jweofwejofwifw",
        "instructor": "Essam Mansour",
        "term": "Winter 2021",
        "status": "waitlisted",
        "sections": [
            {
                "number": 3356,
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": [
                    "Monday", "Wednesday"
                ]
            },
            {
                "number": 3357,
                "component": "Tutorial",
                "section": "S SA",
                "startTime": "8:45AM",
                "endTime": "9:55AM",
                "location": "H-345 SGW",
                "days": [
                    "Tuesday"
                ]
            }
        ]
    }

    const [courses, setCourses] = useState(Service.getDb());

    const enrollClass = () => {
        Service.enroll([courseToAdd]);
        setCourses(Service.getDb());
        console.log(Service.getEnrolledCourses())
    }
    const dropClass = () => {
        Service.drop(courseToDrop);
        setCourses(Service.getDb());
        console.log(Service.getCourseCart())

    }
    const swapClasses = () => {
        Service.swap(courseToSwapIn, courseToDrop);
        setCourses(Service.getCourseCart());
        console.log(Service.getCourseCart())
    }

    return (
      <div>
          <button onClick={() => enrollClass()}>Enroll SOEN 345</button>
          <button onClick={() => dropClass()}>Drop SOEN 345</button>
          <button onClick={() => swapClasses()}>Swap SOEN 345 for SOEN 456</button>

      </div>
    );
}
