import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import CloseIcon from '@material-ui/icons/Close';
import {Button} from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

import DeleteConfirmModal from "../DeleteConfirmModal";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor:"#554D4D",
        color: "white",
        width: "500px"
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#808080",
        fontWeight: 'bold'
    },
    body: {
        width: 500,
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    classTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    classHeader: {
        color: 'white'
    },
    hidden: {
        display: "none"
    },
    icon: {
        fontSize: 32,
        color: "red"
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
    modal: {
        width: '50%',
        height: '35%'
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
    let lectureSection = ""
    course.sections.forEach(section => {
        if(section.component === "Lecture") {
            lectureTime = extractDay(section.days) + " " + section.startTime + "-" + section.endTime
            lectureRoom = section.location
            lectureSection = section.section
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
        "name": course.courseName,
        "titleOnly": course.courseTitle,
        "instructor": course.instructor,
        "lectureTime": lectureTime,
        "lectureRoom": lectureRoom,
        "tutorialTime": tutorialTime,
        "tutorialRoom": tutorialRoom,
        "tutorialSection": tutorialSection,
        "labTime": labTime,
        "labRoom": labRoom,
        "labSection": labSection,
        "lectureSection": lectureSection
    }
    return info
}
const ColorButton = withStyles((theme) => ({
    root: {
        float: 'right',
        color: theme.palette.getContrastText('#912338'),
        backgroundColor: '#912338',
        '&:hover': {
            backgroundColor: '#B3455A',
        },
    },
}))(Button);

export default function Cart(props) {
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const course = extractInfo(props.course);
    const popModal = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
    <TableContainer component={Paper}>
        <Dialog classes={classes.modal}onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id='Modal_Title' style={{backgroundColor: '#912338', color: 'white'}}>{'Confirmation'}</DialogTitle>
            <DialogContent dividers>
                <DeleteConfirmModal course={props.course}/>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell>
                        <Typography className={classes.classTitle}>{course.title}</Typography>
                        <Typography className={classes.classHeader}
                                    variant='h7'>Intructor: {course.instructor}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Typography className={classes.classHeader} variant='h7'>
                            {course.lectureTime}
                            <br/>
                            {course.lectureRoom}
                        </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Button className={classes.button} onClick={popModal}>
                            <CloseIcon onClick={popModal} className={classes.icon}/>
                        </Button>
                    </StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <StyledTableCell component="th" scope="row">
                        {course.tutorialSection} (Tutorial)
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        {course.tutorialTime}
                        <br/>
                        {course.tutorialRoom}
                    </StyledTableCell>
                </TableRow>
                {course.labRoom ?
                    <TableRow>
                        <StyledTableCell component="th" scope="row">
                            {course.labSection} (Laboratory)
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            {course.labTime}
                            <br/>
                            {course.labRoom}
                        </StyledTableCell>
                    </TableRow> : null}
            </TableBody>
        </Table>
    </TableContainer>
    );
}