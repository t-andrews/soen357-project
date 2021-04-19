import React, {useEffect} from 'react';
import DetailedCourse from "../DetailedCourse";
import {Grid} from "@material-ui/core";

export default function CourseList(props) {
    const [courses, setCourses] = React.useState(props.courses ?? []);

    useEffect(() => {
        setCourses(props.courses ?? []);
    }, [props.courses]);

    console.log('list',courses)

    const { leftCourses, rightCourses } = (() => {
        const midIndex = Math.ceil(courses.length / 2);
        return { leftCourses: courses.slice(0, midIndex), rightCourses: courses.slice(midIndex) };
    })();

    return (
        <Grid container style={{width: '100%', marginLeft: '12px', marginTop: '45px'}}>
            <Grid xs={6}>
                {
                    leftCourses.map(c => {
                        return <div style={{height: `${100/leftCourses.length}%`, marginBottom: '30px'}}><DetailedCourse course={c}/></div>;
                    })
                }
            </Grid>
            <Grid xs={6}>
                {
                    rightCourses.map(c => {
                        return <div style={{height: `${100/leftCourses.length}%`, marginBottom: '30px'}}><DetailedCourse course={c}/></div>;
                    })
                }
            </Grid>
        </Grid>
    );
}
