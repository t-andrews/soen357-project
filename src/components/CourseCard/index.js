import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";


const useRowStyles = makeStyles({
    course_name:{
        color: 'black',
        fontWeight: "900",
        fontSize: '18px'
    },
});

export default function CourseCard(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const course = props.course;
    const lectureSection = course.sections.find(s => s.component === "Lecture");

    return (
        <Table>
            <TableRow style={{backgroundColor: course.color}}>
                <TableCell style={{color: 'white'}} component="th" scope="row">
                    <span className={classes.course_name}> {course.uniqueName} - {course.courseTitle}</span>
                    <br/>
                    Instructor: {course.instructor}
                </TableCell>
                <TableCell style={{color: 'white'}} align="right">
                    {lectureSection.days.map(d => d.substr(0, 2)).join('')}
                    {' '}
                    {lectureSection.startTime} - {lectureSection.endTime}
                    <br/>
                    Room: {course.location}
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
    );
}
