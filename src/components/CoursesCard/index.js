import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AdjustIcon from '@material-ui/icons/Adjust';


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    },
  },
  course_name:{
    fontWeight: "650",
    fontSize: "20px"
  },
  bigRed:{
    fontSize:"25px",
    color: "#912338",
    fontWeight:"bold",
    textAlign:"left",
    marginBottom:"20px",
    marginTop:"-30px"
  },
});

function createData(name,location, time, instructor,color) {
  return {
    name,
    location,
    time,
    color,
    instructor,
    subSection: [
      {
        name: "S SX (Laboratory)",
        time: "We 4:15PM - 6:15PM ",
        room: "H 911 SGW"
      },
      { name: "S S (Tutorial)", 
      time: "We 4:15PM - 6:15PM ",
      room: 'FG 111 SGW' }
    ],
  };
}

function Row(props) {
  const { row } = props;
  const forDelete = props.forDelete ?? false
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment style={{borderColor:"red"}}>
      <TableRow className={classes.root} style={{backgroundColor:row.color}}>
        {forDelete ?         
        <TableCell>
          <IconButton>
            <AdjustIcon/>
          </IconButton>
        </TableCell> : null}
        <TableCell component="th" scope="row">
          <span className={classes.course_name}>{row.name}</span>
          <br/>
          <span style={{color:"white"}}>Instructor: {row.instructor}</span>
        </TableCell>
        <TableCell align="right" style={{color:"white"}}>
          {row.time}
          <br/>
          Room: {row.location}
        </TableCell>
        <div  align="right" style={{width:"auto"}}>
        <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </div>
      </TableRow>
      <TableRow style={{borderColor:row.color}}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.subSection.map((subsection) => (
                    <TableRow key={subsection.name}>
                      <TableCell component="th" scope="row">
                        {subsection.name}
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
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
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
  createData("COMP 123 S - Intro Comp.Sci", 'H 444 SGW', 'MoWe 10:15AM - 11:30AM','Some Staff', '#E4B672' ),
  createData("COMP 223 S - Databases",'H 444 SGW', 'MoWe 10:15AM - 11:30AM','Some Staff','#16BA73'),
  createData("COMP 323 S -Web Develop", 'H 444 SGW', 'MoWe 10:15AM - 11:30AM','Some Staff','#D85E5E'),
  createData("COMP 423 S - Artificial Intel", 'H 444 SGW', 'MoWe 10:15AM - 11:30AM','Some Staff','#006280'),
  createData("ENGR 133 S - Intro Calculus", 'H 444 SGW', 'MoWe 10:15AM - 11:30AM','Some Staff','#9861A9')
];

export default function CourseCard(props) {
  const forDelete = props.forDelete ?? false
  const classes = useRowStyles();
  return (
    <div>
      <div className={classes.bigRed}>My Courses</div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} forDelete={forDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
