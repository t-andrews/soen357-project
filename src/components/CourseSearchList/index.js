import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Tooltip, withStyles} from "@material-ui/core";
import {CheckCircle, PauseCircleFilled, Cancel} from "@material-ui/icons";

const useStyles = makeStyles({
    paper: {
        border: '1px solid black'
    }
});

const useRowStyles = makeStyles({
    root: {
        width: '100%'
    },
    courseCard: {
        width: '100%'
    },
    course_name:{
        fontWeight: "bold",
        fontSize: "20px"
    },
    status: {
        stroke: 'white',
        strokeWidth: 2,
        marginLeft: '10px'
    }
});

const BurgundyRadio = withStyles({
    root: {
        '&$checked': {
            color: '#912338',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const BurgundyCheckbox = withStyles({
    root: {
        '&$checked': {
            color: '#912338',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


function createData(value, name, location, time, instructor, color, status) {
    return {
        value,
        name,
        location,
        time,
        color,
        instructor,
        status,
        subSection: [
            {
                name: "Y YX (Laboratory)",
                time: "We 4:15PM - 6:15PM ",
                room: "H 967 SGW",
                status: 'wait'
            },
            {
                name: "Y YY (Laboratory)",
                time: "Th 4:15PM - 6:15PM ",
                room: "H 967 SGW",
                status: 'closed'
            },
            {
                name: "Y YX (Laboratory)",
                time: "Fri 4:15PM - 6:15PM ",
                room: "H 967 SGW",
                status: 'open'
            },
            {
                name: "Y YJ (Tutorial)",
                time: "Mo 4:15PM - 6:15PM ",
                room: 'MB 111 SGW',
                status: 'open'
            },
            {
                name: "Y YK (Tutorial)",
                time: "Tu 4:15PM - 6:15PM ",
                room: 'MB 111 SGW',
                status: 'closed'
            },
            {
                name: "Y YL (Tutorial)",
                time: "We 4:15PM - 6:15PM ",
                room: 'MB 111 SGW',
                status: 'open'
            },
            {
                name: "Y YM (Tutorial)",
                time: "Th 4:15PM - 6:15PM ",
                room: 'MB 111 SGW',
                status: 'wait'
            }
        ],
    };
}

function Row(props) {
    const { row } = props;
    const classes = useRowStyles();

    const [value, setValue] = React.useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl className={classes.courseCard}>
            <RadioGroup value={value} onChange={handleChange}>
                <TableContainer className={classes.root}>
                    <TableRow style={{backgroundColor: row.color}}>
                        <TableCell>
                            <FormControlLabel control={<BurgundyRadio />} value={row.value}/>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <span className={classes.course_name}>{row.name}</span>
                            {
                                row.status === 'open' ? <Tooltip title={'Open'}><CheckCircle className={classes.status} style={{ color: "green" }}/></Tooltip>
                                    : (
                                        row.status === 'wait' ? <Tooltip title={'Waitlisted'}><PauseCircleFilled className={classes.status} style={{ color: "#FFB300" }}/></Tooltip>
                                            : (
                                                row.status  === 'closed' ? <Tooltip title={'Closed'}><Cancel className={classes.status} style={{ color: "red" }}/></Tooltip>
                                                    : (null)
                                            )
                                    )
                            }
                            <br/>
                            <span style={{color:"white"}}>Instructor: {row.instructor}</span>
                        </TableCell>
                        <TableCell align="right" style={{color:"white"}}>
                            {row.time}
                            <br/>
                            Room: {row.location}
                        </TableCell>
                    </TableRow>
                    <TableRow style={{borderColor:row.color}}>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableBody>
                                        {row.subSection.map((subsection) => (
                                            <TableRow key={subsection.name}>
                                                <TableCell component="th" scope="row">
                                                    <BurgundyCheckbox />
                                                    {subsection.name}
                                                    {
                                                        subsection.status === 'open' ? <Tooltip title={'Open'}><CheckCircle style={{ color: "green", marginLeft: '10px', marginRight: '261px'}}/></Tooltip>
                                                            : (
                                                                subsection.status === 'wait' ? <Tooltip title={'Waitlisted'}><PauseCircleFilled style={{ color: "#FFB300", marginLeft: '10px' }}/></Tooltip>
                                                                    : (
                                                                        subsection.status  === 'closed' ? <Tooltip title={'Closed'}><Cancel style={{ color: "red", marginLeft: '10px' }}/></Tooltip>
                                                                            : (null)
                                                                    )
                                                            )
                                                    }
                                                </TableCell>
                                                <TableCell align="right">
                                                    {subsection.time}
                                                    <br/>
                                                    Room: {subsection.room}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableContainer>
            </RadioGroup>
        </FormControl>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        instructor: PropTypes.string.isRequired,
        subSection: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.number.isRequired,
                time: PropTypes.string.isRequired,
                room: PropTypes.string.isRequired
            })
        ).isRequired,
    }).isRequired
};

const rows = [
    createData("1", "SOEN 357 Y - UI Design", 'H 629 SGW', 'TuTh 14:15PM - 15:30PM','Some Staff', '#6e6e6e', 'open'),
    createData("2", "SOEN 357 X - UI Design",'H 835 SGW', 'MoWe 10:15AM - 11:30AM','Some Staff','#6e6e6e', 'closed'),
];

export default function CourseSearchList() {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper} variant='outlined'>
                <TableContainer>
                    <Table>
                        <TableHead/>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </div>
    );
}

