import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Checkbox,
    Dialog, DialogContent, DialogTitle, FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper,
    TextField, Tooltip,
    withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Cancel, CheckCircle, PauseCircleFilled, Search} from "@material-ui/icons";
import ModalContent from "../../components/AddModalContent";
import * as AllCourses from "../../services/allCourses.json";
import SelectSearch, {fuzzySearch} from "react-select-search";
import '../../Search.css';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '850px',
        padding: '10px'
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: '15px',
    },
    paperList: {
        border: '1px solid black'
    },
    title: {
        color: '#912338',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 'x-large',
        paddingBottom: '30px'
    },
    legend: {
        border: 'none',
    },
    searchBox: {
        border: '2px solid #912338',
        borderRadius: '5px!important',
        width: '47%',
        minHeight: '600px'
    },
    resultsBox: {
        borderRadius: '5px!important',
        marginTop: '18px',
        width: '49.5%',
        minHeight: '600px',
        backgroundColor: '#f2f2f2'
    },
    inputInput: {
        padding: '16px',
        paddingLeft: '5px',
        width: '15ch',
    },
    timeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    timeField: {
        width: 110,
    },
    button: {
        backgroundColor: '#912338',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4283f'
        }
    },
    modal: {
        width: '800px',
        height: '350px'
    },
    tooltip: {
        '&:hover': {
            backgroundColor: '#c8c8c8'
        }
    }
});

const useAccordionStyles = makeStyles({
    root: {
        width: '100%',
    },
    accordion: {
        backgroundColor: '#6e6e6e'
    },
    headerFont: {
        color: 'white',
        fontWeight: 'bold',
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

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'none',
            },
            '&:hover fieldset': {
                borderColor: '#912338',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#912338',
            },
        },
    },
})(TextField);

const BurgundyCheckbox = withStyles({
    root: {
        '&$checked': {
            color: '#912338',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default function Add() {
    const classes = useStyles();
    const accordionClasses = useAccordionStyles();
    const rowStyles = useRowStyles();

    const courses = AllCourses.courses.map(c => ({name: c.courseName, value: c.courseName}));
    const [selectedCourse, setSelectedCourse] = React.useState(null);
    const [searchString, setSearchString] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [state, setState] = React.useState({
        L200: false, L300: false, L400: false, L500: false, L600: false, L700: false, L800: false,
        Sunday: false, Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false,
    });
    const [checkedCourses, setCheckedCourses] = React.useState([]);

    async function handleCheck (event, lecture) {
        const uniqueCourse = {
            ...lecture,
            uniqueName: `${selectedCourse.courseName} ${lecture.section}`,
            courseName: selectedCourse.courseName,
            courseTitle: selectedCourse.courseTitle,
            units: selectedCourse.units,
            startDate: selectedCourse.startDate,
            endDate: selectedCourse.endDate,
            description: selectedCourse.description,
            term: selectedCourse.term
        };
        uniqueCourse.sections = [];

        if (event.target.checked) {
            checkedCourses.push(uniqueCourse);
            await setCheckedCourses([...checkedCourses])
        } else {
            const filteredCourses = checkedCourses.filter(
                (filterValue) => filterValue.uniqueName !== uniqueCourse.uniqueName
            );
            await setCheckedCourses([...filteredCourses])
        }
    }

    async function handleCheckSection (event, section, lectureSection) {
        const index = checkedCourses.findIndex(c => c.section === lectureSection);
        let changedLecture = checkedCourses[index];

        if (!changedLecture) {
            return;
        }

        if (event.target.checked) {
            changedLecture.sections.push(section);
        } else {
            changedLecture.sections = changedLecture.sections.filter(s => s.section !== section.section);
        }
        checkedCourses[index] = changedLecture;
        await setCheckedCourses([...checkedCourses]);
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSearch = async (value) => {
        await setSearchString(value)
        await setSelectedCourse(AllCourses.courses.find(c => c.courseName === value));
    }

    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Typography className={classes.title}>Add Courses to Cart</Typography>
                <Grid container direction='row' spacing={1} justify='space-between' style={{paddingLeft: '25px', paddingRight: '25px'}}>
                    <fieldset className={classes.searchBox}>
                        <legend>
                            <Typography style={{color: '#912338'}} variant='h4'>Search</Typography>
                        </legend>
                        <Grid item>
                            <form>
                                <Grid container direction='column' spacing={5} alignItems='center'>
                                    <Grid item style={{borderBottom: '2px solid #912338', width: '98%'}}>
                                        <div>
                                            <SelectSearch placeholder="Search" options={courses}
                                                          search={true} filterOptions={fuzzySearch}
                                                          emptyMessage={"Course Not Found"}
                                                          value={searchString} onChange={handleSearch}
                                            />
                                        </div>
                                    </Grid>
                                    <Tooltip title={'For Visual Purposes ONLY'} className={classes.tooltip} placement={'top-start'}>
                                        <Grid item style={{width: '100%'}}>
                                            <Grid item style={{width: '100%'}}>
                                                <Grid container direction='row' spacing={2} justify='space-evenly'>
                                                    <Grid item style={{paddingTop: '25px'}}>
                                                        <Grid container direction='column' spacing={8} alignItems='flex-start'>
                                                            <Grid item>
                                                                <Typography style={{fontWeight: 'bold'}}>Enter Subject</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography style={{fontWeight: 'bold'}}>Course Number</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography style={{fontWeight: 'bold'}}>Course Level</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography style={{fontWeight: 'bold'}}>Days of Week</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography style={{fontWeight: 'bold'}}>Class Times</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography style={{fontWeight: 'bold'}}>Instructor Last Name</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid container direction='column' spacing={3} alignItems='flex-start'>
                                                            <Grid item>
                                                                <CustomTextField variant='outlined'/>
                                                            </Grid>
                                                            <Grid item>
                                                                <CustomTextField variant='outlined'/>
                                                            </Grid>
                                                            <Grid item>
                                                                <FormGroup row>
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.L200} onChange={handleChange} name="L200" />}
                                                                        label="200"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.L300} onChange={handleChange} name="L300" />}
                                                                        label="300"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.L400} onChange={handleChange} name="L400" />}
                                                                        label="400"
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup row>
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.L500} onChange={handleChange} name="L500" />}
                                                                        label="500"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.L600} onChange={handleChange} name="L600" />}
                                                                        label="600"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.L700} onChange={handleChange} name="L700" />}
                                                                        label="700"
                                                                    />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item>
                                                                <FormGroup row>
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Sunday} onChange={handleChange} name="Sunday" />}
                                                                        label="Sun"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Monday} onChange={handleChange} name="Monday" />}
                                                                        label="Mon"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Tuesday} onChange={handleChange} name="Tuesday" />}
                                                                        label="Tue"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Wednesday} onChange={handleChange} name="Wednesday" />}
                                                                        label="Wed"
                                                                    />
                                                                </FormGroup>
                                                                <FormGroup row>
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Thursday} onChange={handleChange} name="Thursday" />}
                                                                        label="Thu"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Friday} onChange={handleChange} name="Friday" />}
                                                                        label="Fri"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={<BurgundyCheckbox checked={state.Saturday} onChange={handleChange} name="Saturday" />}
                                                                        label="Sat"
                                                                    />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction={'row'} spacing={3}>
                                                                    <Grid item>
                                                                        <form className={classes.timeContainer} noValidate>
                                                                            <TextField id="time" label="From" type="time" defaultValue="08:00"
                                                                                       className={classes.timeField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       inputProps={{
                                                                                           step: 300,
                                                                                       }}
                                                                            />
                                                                        </form>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <form className={classes.timeContainer} noValidate>
                                                                            <TextField id="time" label="To" type="time" defaultValue="23:00"
                                                                                       className={classes.timeField}
                                                                                       InputLabelProps={{
                                                                                           shrink: true,
                                                                                       }}
                                                                                       inputProps={{
                                                                                           step: 300,
                                                                                       }}
                                                                            />
                                                                        </form>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <CustomTextField variant='outlined'/>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item style={{width: '100%'}}>
                                                <Grid container direction='row' justify='space-between'>
                                                    <Grid item>
                                                        <Button disabled={true} className={classes.button} variant='contained'>Clear</Button>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button disabled={true} className={classes.button} variant='contained'>Search</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Tooltip>
                                </Grid>
                            </form>
                        </Grid>
                    </fieldset>
                    <Grid item className={classes.resultsBox}>
                        <Grid container direction='row' spacing={3} justify="center" style={{padding: '15px'}}>
                            <Grid item style={{ marginRight: "100px" }}>
                                <Button
                                    disabled={checkedCourses.length <= 0} className={classes.button}
                                    variant='contained' onClick={handleOpenModal}>
                                    Add
                                </Button>
                            </Grid>
                            <Grid item className={classes.legend}>
                                <CheckCircle style={{color: 'green'}}/>
                                Open
                            </Grid>
                            <Grid item className={classes.legend}>
                                <Cancel style={{color: 'red'}}/>
                                Closed
                            </Grid>
                            <Grid item className={classes.legend}>
                                <PauseCircleFilled style={{color: 'orange'}}/>
                                Wait list
                            </Grid>
                        </Grid>
                        <Grid container direction='column' spacing={3} alignItems='flex-end'>
                            <Grid item>
                                <div className={accordionClasses.root}>
                                    {selectedCourse ?
                                        <Accordion className={accordionClasses.accordion}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-label="Expand"
                                                              aria-controls="additional-actions1-content"
                                                              id="additional-actions1-header"
                                            >
                                                <Grid container direction='row' justify='space-between'
                                                      className={accordionClasses.headerFont}>
                                                    <Grid item>
                                                        <Typography
                                                            variant='h5'>{selectedCourse.courseName} - {selectedCourse.courseTitle}</Typography>
                                                    </Grid>
                                                    <Grid item style={{marginLeft: '1%'}}>
                                                        <Typography variant='h5'>{selectedCourse.units}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div>
                                                    <Paper className={classes.paperList} variant='outlined'>
                                                        <TableContainer>
                                                            <Table>
                                                                <TableHead/>
                                                                <TableBody>
                                                                    {selectedCourse.lectures ? selectedCourse.lectures.map((lecture) => (
                                                                        <FormControl className={rowStyles.courseCard}>
                                                                            <TableContainer className={rowStyles.root}>
                                                                                <TableRow style={{backgroundColor: '#6e6e6e'}}>
                                                                                    <TableCell>
                                                                                        <BurgundyCheckbox onClick={event => handleCheck(event, lecture)} />
                                                                                    </TableCell>
                                                                                    <TableCell component="th" scope="row">
                                                                                        <span className={rowStyles.course_name}>{selectedCourse.courseName} {lecture.section} - {selectedCourse.courseTitle}</span>
                                                                                        {
                                                                                            lecture.status === 'open' ? <Tooltip title={'Open'}><CheckCircle className={rowStyles.status} style={{ color: "green" }}/></Tooltip>
                                                                                                : (
                                                                                                    lecture.status === 'wait' ? <Tooltip title={'Waitlisted'}><PauseCircleFilled className={rowStyles.status} style={{ color: "#FFB300" }}/></Tooltip>
                                                                                                        : (
                                                                                                            lecture.status  === 'closed' ? <Tooltip title={'Closed'}><Cancel className={rowStyles.status} style={{ color: "red" }}/></Tooltip>
                                                                                                                : (null)
                                                                                                        )
                                                                                                )
                                                                                        }
                                                                                        <br/>
                                                                                        <span style={{color:"white"}}>Instructor: {lecture.instructor}</span>
                                                                                    </TableCell>
                                                                                    <TableCell align="right" style={{color:"white"}}>
                                                                                        {lecture.time}
                                                                                        <br/>
                                                                                        Room: {lecture.location}
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                                <TableRow style={{borderColor: '#6e6e6e'}}>
                                                                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                                        <Box margin={1}>
                                                                                            <Table size="small" aria-label="purchases">
                                                                                                <TableBody>
                                                                                                    {lecture.sections.map((section) => (
                                                                                                        <TableRow key={section.section}>
                                                                                                            <TableCell component="th" scope="row">
                                                                                                                <BurgundyCheckbox disabled={checkedCourses.findIndex(c => c.section === lecture.section) === -1} onClick={event => handleCheckSection(event, section, lecture.section)}/>
                                                                                                                {section.section}, ({section.component})
                                                                                                                {
                                                                                                                    section.status === 'open' ? <Tooltip title={'Open'}><CheckCircle style={{ color: "green", marginLeft: '10px', marginRight: '275px'}}/></Tooltip>
                                                                                                                        : (
                                                                                                                            section.status === 'wait' ? <Tooltip title={'Waitlisted'}><PauseCircleFilled style={{ color: "#FFB300", marginLeft: '10px' }}/></Tooltip>
                                                                                                                                : (
                                                                                                                                    section.status  === 'closed' ? <Tooltip title={'Closed'}><Cancel style={{ color: "red", marginLeft: '10px' }}/></Tooltip>
                                                                                                                                        : (null)
                                                                                                                                )
                                                                                                                        )
                                                                                                                }
                                                                                                            </TableCell>
                                                                                                            <TableCell align="right">
                                                                                                                {section.time}
                                                                                                                <br/>
                                                                                                                Room: {section.location}
                                                                                                            </TableCell>
                                                                                                        </TableRow>
                                                                                                    ))}
                                                                                                </TableBody>
                                                                                            </Table>
                                                                                        </Box>
                                                                                    </TableCell>
                                                                                </TableRow>
                                                                            </TableContainer>
                                                                        </FormControl>
                                                                    )) : null}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </Paper>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    : null}
                                </div>
                            </Grid>
                            <Grid item>
                                <Dialog classes={{ paper: classes.modal}} open={openModal} onClose={handleCloseModal}
                                        aria-labelledby='Add_Modal' aria-describedby='Confirm_Changes?'>
                                    <DialogTitle id='Modal_Title' style={{backgroundColor: '#912338', color: 'white'}}>{'Confirmation'}</DialogTitle>
                                    <DialogContent>
                                        <ModalContent courses={checkedCourses}/>
                                    </DialogContent>
                                </Dialog>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
