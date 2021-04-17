import React from 'react';
import {
    makeStyles,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip,
    withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {CheckCircle, RemoveCircle} from "@material-ui/icons";

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        }
    }
}))(TableRow);

function shadeColor(color) {
    return '#' + color.replace(/^#/, '').replace(/../g, c => ('0'+Math.min(255, Math.max(0, parseInt(c, 16) + 30)).toString(16)).substr(-2));
}

export default function DetailedCourse(props) {
    const course = props.course;

    const lightColor = shadeColor(course.color);

    const StyledTableCell = withStyles((theme) => ({
        root: {
            padding: '3px 10px 10px 3px'
        },
        head: {
            backgroundColor: lightColor,
            color: theme.palette.common.black,
            fontSize: 12,
            fontWeight: 'bold',
            border: `1px solid ${course.color}`,
            textAlign: 'left'
        },
        body: {
            fontSize: 11,
            border: `1px solid ${course.color}`,
            textAlign: 'left'
        }
    }))(TableCell);

    const classes = makeStyles({
        table: {
            maxWidth: "96%",
            border: `2px solid ${course.color}`
        },
        title: {
            backgroundColor: course.color,
            color: 'white',
            textAlign: 'left',
            padding: '10px'
        },
        credits: {
            backgroundColor: 'inherit',
            float: 'right'
        },
        className: {
            backgroundColor: 'inherit',
            float: 'left'
        },
        status: {
            stroke: 'white',
            strokeWidth: 2,
            marginLeft: '10px'
        }
    })();

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Typography className={classes.title} variant="h7" id="tableTitle" component="div">
                <div className={classes.className}>
                    {course.name}
                </div>
                {
                    course.status === 'enrolled' ? <Tooltip title={'Enrolled'}><CheckCircle className={classes.status} style={{ color: "lightGreen" }}/></Tooltip>
                        : (
                            course.status === 'waitlisted' ? <Tooltip title={'Waitlisted'}><RemoveCircle className={classes.status} style={{ color: "#FFB300" }}/></Tooltip>
                                : null
                        )
                }
                <div className={classes.credits}>
                    {`${course.units} Units`}
                </div>
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Class Nbr</StyledTableCell>
                        <StyledTableCell>Component</StyledTableCell>
                        <StyledTableCell>Section</StyledTableCell>
                        <StyledTableCell>Days & Times</StyledTableCell>
                        <StyledTableCell>Room</StyledTableCell>
                        <StyledTableCell>Instructor</StyledTableCell>
                        <StyledTableCell>Start/End Date</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {course.sections.map(row => (
                        <StyledTableRow key={`${row.component}-${row.number}`}>
                            <StyledTableCell>{row.number}</StyledTableCell>
                            <StyledTableCell>{row.component}</StyledTableCell>
                            <StyledTableCell>{row.section}</StyledTableCell>
                            <StyledTableCell>{row.daysTimes}</StyledTableCell>
                            <StyledTableCell>{row.room}</StyledTableCell>
                            <StyledTableCell>{row.instructor}</StyledTableCell>
                            <StyledTableCell>{row.startEndDates}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
