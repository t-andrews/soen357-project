import React from 'react';
import DetailedCourse from "../DetailedCourse";
import {Grid} from "@material-ui/core";

export default function CourseList(props) {
    const courses = props.courses ?? [];
    const { leftCourses, rightCourses } = (() => {
        const midIndex = Math.ceil(courses.length / 2);
        return { leftCourses: courses.slice(0, midIndex), rightCourses: courses.slice(midIndex) };
    })();

    return (
        <div>
            <Grid container>
                <Grid xs={6}>
                    {
                        leftCourses.map(c => {
                            return <div style={{height: `${100/leftCourses.length}%`, marginBottom: '20px'}}><DetailedCourse course={c}/></div>;
                        })
                    }
                </Grid>
                <Grid xs={6}>
                    {
                        rightCourses.map(c => {
                            return <div style={{height: `${100/leftCourses.length}%`, marginBottom: '20px'}}><DetailedCourse course={c}/></div>;
                        })
                    }
                </Grid>
            </Grid>
        </div>
    );
}
