import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";


const useRowStyles = makeStyles({
    course_name:{
        color: 'black',
        fontWeight: "900",
        fontSize: '18px'
    }
});

export default function CourseCard(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const course = props.course;
    const lectureSection = course.sections.find(s => s.component === "Lecture");

    return (
        <TableContainer component={Paper} elevation={0}>
            <Table style={{minWidth: "650px"}}>
                <TableRow style={{backgroundColor: course.color}}>
                    <TableCell style={{color: 'white', width: "450px", paddingRight: 0}}>
                        <span className={classes.course_name}> {course.uniqueName} - {course.courseTitle}</span>
                        <br/>
                        Instructor: {course.instructor}
                    </TableCell>
                    <TableCell style={{color: 'white', width: "calc(100% - 300px)", paddingLeft: 0, paddingRight: 0}} align="right">
                        {lectureSection.days.map(d => d.substr(0, 2)).join('')}
                        {' '}
                        {lectureSection.startTime} - {lectureSection.endTime}
                        <br/>
                        Room: {lectureSection.location}
                    </TableCell>
                    <div align="right" style={{width:"auto"}}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </div>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Table size="small" aria-label="dropCourses">
                                <TableBody>
                                    {course.sections.filter(s => s.component !== "Lecture").map(section => (
                                        <TableRow key={section.number}>
                                            <TableCell component="th" scope="row">
                                                {section.section} ({section.component})
                                            </TableCell>
                                            <TableCell align="right">
                                                {section.days.map(d => d.substr(0, 2)).join('')}
                                                {' '}
                                                {section.startTime} - {section.endTime}
                                                <br/>
                                                Room: {section.location}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </Table>
        </TableContainer>
    );
}
