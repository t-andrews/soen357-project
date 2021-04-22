import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";
import WeeklySchedule from "../../components/WeeklySchedule";
import * as Service from "../../services/service";
import CourseCard from "../../components/CourseCard";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '700px',
        paddingTop: '30px'
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: '15px',
    },
    title: {
        color: '#912338',
        fontWeight: 'bold',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '20px',
    }
});

export default function Main() {
    const classes = useStyles();
    const [courses, setCourses] = useState(Service.getEnrolledCourses())
    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Grid container direction={"row"} spacing={3} justify={"space-evenly"}>
                    <Grid item align={"left"}>
                        <Typography className={classes.title} variant='h5'>Weekly Schedule</Typography>
                        <WeeklySchedule courses={courses ?? []} filter={false} width={"200px"}/>
                    </Grid>
                    <Grid item align={"left"}>
                        <Typography className={classes.title} variant='h5'>Courses</Typography>
                        {(courses ?? []).map(course =>
                            <div style ={{marginBottom:"10px"}}>
                            <CourseCard course={course}/>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>

    );
}