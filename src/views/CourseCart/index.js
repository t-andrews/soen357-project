import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableCell,
    TableRow,
    Grid, withStyles
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Cart from "../../components/Cart";
import Checkbox from '@material-ui/core/Checkbox';
import * as service from "../../services/service";



const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '700px',
        padding: '10px'
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
        float: 'left',

    },
    bigRed:{
        fontSize:"Large",
        color: "#912338",
        fontWeight:"bold"
    },
    small:{
        marginLeft: "30px",
        border: '2px solid #912338',
        borderRadius: '5px!important'
    },
    boxH1:{
        textAlign:"left",
        borderLeft: '2px solid #912338',
        color: "#912338",
        padding: "10px",
        fontSize: "1.2rem",
        fontWeight: 'bold'
    },
    smallTitle: {
        fontWeight: 'bold',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        float: 'left',

    },
    courses: {
        float: 'left',
        fontSize: "1.2rem",
    },
    button: {
        backgroundColor: '#912338',
        float: "right",
        marginBottom: "10px",
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4283f'
        }
    },

});

const getClassInfo = (course) => {

    let lectureSection = ""
    course.sections.forEach(section => {
        if(section.component === "Lecture") {
            lectureSection = section.section
        }
    });

    const info = {
        "courseName": course.courseName,
        "section": lectureSection,
        "courseTitle": course.courseTitle
    }
    return info
}
export default function CourseCart() {
    const classes = useStyles();
    const [checkedCourses, setCheckedCourses] = useState([])
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const [courses, setCourses] = useState(service.getCourseCart())
    const [confirm, setConfirm] = useState(false)
    const [updateCheckbox, setUpdateCheckbox] = useState(0)

    useEffect(() => {
        window.addEventListener('resetCart', async () => {
            (Array.from(document.getElementsByClassName('checkbox-find')) ?? []).forEach( c => c.checked = false)
            await setCourses(service.getCourseCart())
            await setCheckedCourses([])
            await setUpdateCheckbox(updateCheckbox + 1)
        });
        return () => {
            window.removeEventListener('resetCart',() => setCourses(service.getCourseCart()) );
        };
    }, []);
    const confirmClasses = async (c) => {
        service.enroll(c)
        c.forEach(course => service.deleteFromCourseCart(course))
        await setConfirm(true)
        await setCourses(service.getCourseCart())
        await setEnrolledCourses(c)
        await setCheckedCourses([])
    }
    const handleChange = (event, course) => {
        if(event.target.checked) {
            setCheckedCourses([...checkedCourses, course])
        } else {
            const filteredCourses = checkedCourses.filter(
                (filterValue) => filterValue.uniqueName != course.uniqueName
            );
            setCheckedCourses(filteredCourses)
        }
    }
    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <Typography className={classes.title} variant='h5'>Course cart</Typography>
            <div className={classes.root}>
                <Grid container>
                <Grid item xs={3} style={{maxWidth: '75%', minWidth: '915px'}}>
                    <Table>
                        {
                            courses.length === 0 ?
                                <h3>Your course cart is empty for this semester</h3>
                                : courses.map(course => (
                                    <TableRow className={classes.row}>
                                        <TableCell style={{borderBottom:"none"}}>
                                            <Checkbox key={updateCheckbox} className={"checkbox-find"} onChange={(event) => handleChange(event,course)} color='default'/>
                                        </TableCell>
                                        <TableCell style={{borderBottom:"none"}}>
                                            <Cart course={course}/>
                                        </TableCell>
                                    </TableRow>
                                ))

                        }
                    </Table>
                </Grid>
                <Grid item xs={5}>
                    <fieldset className={classes.small}>
                    <legend className={classes.bigRed}>
                        Enroll
                    </legend>
                        <Box className={classes.boxH1}>Reviewing</Box>
                        <Box> <Typography className={classes.smallTitle} >Course(s) that will be added:</Typography></Box>
                        <br/>
                        <br/>
                        <Table>
                            {checkedCourses.map(course => (
                                <TableRow align ="left">
                                    <TableCell> {getClassInfo(course).courseName + " "+getClassInfo(course).section + "-"+ getClassInfo(course).courseTitle}</TableCell>
                                </TableRow>
                            ))}
                        </Table>
                        <br/>
                        <Button className={classes.button} disabled={courses.length === 0 || checkedCourses.length === 0} onClick={() => confirmClasses(checkedCourses)} variant='contained' >
                            Next
                        </Button>
                        <br/>
                        <br/>
                        { confirm ?  (
                        <Box style={{borderTop: ' 2px solid #912338 '}}>
                            <br/>
                            <Box className={classes.boxH1}>Summary</Box>
                            <Table>
                                <Table>
                                    {enrolledCourses.map(course => (
                                        <TableRow align ="left">
                                            <TableCell>{getClassInfo(course).courseName + " "+getClassInfo(course).section + "-"+ getClassInfo(course).courseTitle}</TableCell>
                                            <TableCell>Enrolled Successfully</TableCell>
                                        </TableRow>
                                    ))}
                                </Table>
                            </Table>
                        </Box>) : null}
                    </fieldset>
                </Grid>
                </Grid>
            </div>
        </div>

    );
}
