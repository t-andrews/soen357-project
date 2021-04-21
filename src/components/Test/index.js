import React, {useEffect, useState} from "react";
import * as Service from "../../services/service";

//Example
export default function Test() {
    const courseToAdd = {
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
                "section": "S",
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
                "section": "S",
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
        "courseName": "SOEN 456",
        "courseTitle": "Testing",
        "color": "#A25100",
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
                "section": "J",
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
                "section": "J SA",
                "startTime": "8:45AM",
                "endTime": "9:55AM",
                "location": "H-345 SGW",
                "days": [
                    "Tuesday"
                ]
            }
        ]
    }

    const enrollClass = () => {
        Service.enroll([courseToAdd]);
        console.log(Service.getEnrolledCourses())
    }
    const dropClass = () => {
        Service.drop(courseToDrop);
        console.log(Service.getEnrolledCourses())

    }
    const swapClasses = () => {
        Service.swap(courseToSwapIn, courseToDrop);
        console.log(Service.getEnrolledCourses())
    }

    return (
      <div>
          <button onClick={() => enrollClass()}>Enroll SOEN 345</button>
          <button onClick={() => dropClass()}>Drop SOEN 345</button>
          <button onClick={() => swapClasses()}>Swap SOEN 345 for SOEN 456</button>

      </div>
    );
}
