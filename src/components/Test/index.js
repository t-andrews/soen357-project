import React, {useEffect, useState} from "react";
import { enroll, drop, swap } from "../../services/service";
import axios from "axios";

//Example
export default function Test(){
    const courseToAdd = {
        "courseName": "SOEN 123",
        "courseTitle": "Data Systems for Software Engineers",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "Introduction to the current data ecosystem, relational databases,\nkey-value databases, document databases, column databases, graph databases, RDF\nstores, parallel and distributed file systems, data processing engines, data stream\nanalytics, and data infrastructure. Lectures: three hours per week. Tutorial: one hour per\nweek.",
        "instructor": "Essam Mansour",
        "term": "Winter 2021",
        "sections": [
            {
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": ["Monday, Wednesday"]
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
    //once added there will be id associated
    const courseToDrop = {
        "id" : 4,
        "courseName": "SOEN 123",
        "courseTitle": "Data Systems for Software Engineers",
        "startDate": "Jan 13",
        "endDate": "Apr 20",
        "description": "Introduction to the current data ecosystem, relational databases,\nkey-value databases, document databases, column databases, graph databases, RDF\nstores, parallel and distributed file systems, data processing engines, data stream\nanalytics, and data infrastructure. Lectures: three hours per week. Tutorial: one hour per\nweek.",
        "instructor": "Essam Mansour",
        "term": "Winter 2021",
        "sections": [
            {
                "component": "Lecture",
                "section": "S ",
                "startTime": "1:15PM",
                "endTime": "4:00PM",
                "location": "H-345 SGW",
                "days": ["Monday, Wednesday"]
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
        "term": "Winter 2021",
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

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/register")
            .then(result => setCourses(result.data));
    }, [])

    const enrollClass = (courseToAdd) => {
        enroll(courseToAdd)
        console.log(courses)
    }
    const dropClass = (courseToDrop) => {
        drop(courseToDrop)
        console.log(courses)

    }
    const swapClasses = (courseToSwap, courseToDrop) => {
        swap(courseToSwap, courseToDrop)
        console.log(courses)
    }

    return (
      <div>
          {/*enroll -> drop -> enroll -> swap */}
          <button onClick={() => enrollClass(courseToAdd)}>Enroll SOEN 123</button>
          <button onClick={() => dropClass(courseToDrop)}>Drop SOEN123</button>
          <button onClick={() => swapClasses(courseToSwapIn,courseToDrop)}>Swap SOEN123 for SOEN456</button>

      </div>
    );
}
