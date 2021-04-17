import React, {useState} from "react";
import { enroll, drop, swap} from "../../services/service";


export default function Test(){
    const courseToAdd = {
        "courseName": "SOEN 123",
        "courseTitle": "Data Systems for Software Engineers",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "Introduction to the current data ecosystem, relational databases,\nkey-value databases, document databases, column databases, graph databases, RDF\nstores, parallel and distributed file systems, data processing engines, data stream\nanalytics, and data infrastructure. Lectures: three hours per week. Tutorial: one hour per\nweek.",
        "instructor": "Essam Mansour",
        "sections": [
            {
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": ["Monday, Wednesday"],
            },
            {
                "component": "Tutorial",
                "section": "S SA",
                "startTime": "8:45AM",
                "endTime": "9:35PM",
                "location": "H-345 SGW",
                "days": ["Monday"]
            }
        ]
    }

    const courseToSwapIn = {
        "courseName": "SOEN 456",
        "courseTitle": "Testing",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "jweofwejofwifw",
        "instructor": "Essam Mansour",
        "sections": [
            {
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": ["Monday, Wednesday"],
            },
            {
                "component": "Tutorial",
                "section": "S SA",
                "startTime": "8:45AM",
                "endTime": "9:35PM",
                "location": "H-345 SGW",
                "days": ["Monday"]
            }
        ]

    }
    const courseList = require("../../services/registeredCourses.json")
    const [courses, setCourses] = useState(courseList);
    const enrollClass = (courseToAdd) => {
        setCourses(enroll(courses, courseToAdd))
        console.log(courses)
    }
    const dropClass = (courseToDrop) => {
        setCourses(drop(courses,courseToDrop))
        console.log(courses)
    }
    const swapClasses = (courseToSwap, courseToDrop) => {
        setCourses((swap(courses, courseToSwap, courseToDrop)))
        console.log(courses)
    }

    return (
      <div>
          <button onClick={() => enrollClass(courseToAdd)}>Enroll SOEN 123</button>
          <button onClick={() => dropClass("SOEN 357")}>Drop SOEN 357</button>
          <button onClick={() => swapClasses(courseToSwapIn,"SOEN 363")}>Swap SOEN363 for SOEN456</button>

      </div>
    );
}