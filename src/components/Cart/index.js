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
import {Button, IconButton} from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

import DeleteConfirmModal from "../DeleteConfirmModal";



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
        width: 500,
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
    },
    button: {

    }
});
const extractDay = (days) => {
    let extractedDay = ""
    days.forEach(day =>
        extractedDay += day.substr(0,2)
    )
    return extractedDay
}

export default function Cart(props) {
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const course = props.course;
    const lectureSection = course.sections.find(s => s.component === "Lecture");
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
                <TableRow justify="space-evenly" style={{backgroundColor: "#808080"}}>
                    <StyledTableCell>
                        <Typography className={classes.classTitle}>{course.uniqueName} - {course.courseTitle}</Typography>
                        <Typography className={classes.classHeader}
                                    variant='h7'>Intructor: {course.instructor}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Typography className={classes.classHeader} variant='h7'>
                            {extractDay(lectureSection.days) + " " + lectureSection.startTime + "-" + lectureSection.endTime}
                            <br/>
                            {lectureSection.location}
                        </Typography>
                    </StyledTableCell>
                    <div align={"right"}><IconButton size={"small"} className={classes.button} onClick={popModal}>
                        <CloseIcon onClick={popModal} className={classes.icon}/>
                    </IconButton>
                    </div>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    course.sections.filter(s => s.component !== "Lecture").map(section => (
                        <TableRow>
                            <StyledTableCell component="th" scope="row">
                                {section.section} ({section.component})
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {extractDay(section.days) + " " + section.startTime + "-" + section.endTime}
                                <br/>
                                {section.location}
                            </StyledTableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
    );
}
