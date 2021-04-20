import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from "@material-ui/core";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#808080",
        fontWeight: 'bold'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    classTitle: {
        fontWeight: 'bold'
    },
    classHeader: {
        color: 'white'
    }
});
const extractDay = (days) => {
    let extractedDay = ""
    days.forEach(day =>
        extractedDay += day.substr(0,2)
    )
    return extractedDay
}
const extractInfo = (course) => {
    let lectureTime = ""
    let lectureRoom = ""
    let tutorialTime = ""
    let tutorialRoom = ""
    let tutorialSection = ""
    let labTime = ""
    let labRoom = ""
    let labSection = ""

    course.sections.forEach(section => {
        if(section.component === "Lecture") {
            lectureTime = extractDay(section.days) + " " + section.startTime + "-" + section.endTime
            lectureRoom = section.location
        }
        else if(section.component === "Tutorial") {
            tutorialTime = extractDay(section.days) + " " + section.startTime + "-" + section.endTime
            tutorialRoom = section.location
            tutorialSection = section.section
        }
        else {
            labTime = extractDay(section.days) + " " + section.startTime + "-" + section.endTime
            labRoom = section.location
            labSection = section.section
        }
    })
    const info = {
        "title": course.courseName + " " +course.courseTitle,
        "instructor": course.instructor,
        "lectureTime": lectureTime,
        "lectureRoom": lectureRoom,
        "tutorialTime": tutorialTime,
        "tutorialRoom": tutorialRoom,
        "tutorialSection": tutorialSection,
        "labTime": labTime,
        "labRoom": labRoom,
        "labSection": labSection,
    }
    return info
}
export default function Cart(props) {
    const classes = useStyles();
    const course = extractInfo(props.course);
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Typography className={classes.classTitle} variant='h6'>{course.title}</Typography>
                            <br/>
                            <Typography className={classes.classHeader} variant='h7'>Intructor: {course.instructor}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Typography className={classes.classHeader} variant='h7'>
                                {course.lectureTime}
                            <br/>
                                {course.lectureRoom}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Button>
                            <DeleteIcon color="error"/>
                            </Button>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                        {course.tutorialSection}(Tutorial)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        {course.tutorialTime}
                        <br/>
                        {course.tutorialRoom}
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                        {course.labSection}(Laboratory)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        {course.labTime}
                        <br/>
                        {course.labRoom}
                    </StyledTableCell>
                </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}