import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox, Grid, Paper, withStyles} from "@material-ui/core";
import CourseCard from "../../components/CourseCard";
import * as Service from "../../services/service";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '700px',
        padding: '10px',
        minWidth: '1200px',
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: '15px'
    },
    title: {
        color: '#912338',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 'x-large',
        paddingBottom: '30px'
    },
    card: {
        marginTop: "15px",
        minWidth: "600px",
        width: "50%"
    },
    form: {
        minWidth: "500px",
        width: "50%",
    },
    course_name: {
        fontWeight: "900"
    },
    small: {
        border: '2px solid #912338',
        borderRadius: '5px!important'
    },
    bigRed: {
        fontSize:"Large",
        color: "#912338",
        fontWeight:"bold"
    },
    boxH1: {
        textAlign:"left",
        borderLeft: '2px solid #912338',
        color: "#912338",
        padding: "10px",
        fontSize: "1.2rem"
    },
    container: {
        width: "50%"
    },
    option: {
        width: "50%",
        height: "50px",
        fontFamily:"Arial",
        padding: "3rem"
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
    box1: {
        borderBottom: ' 2px solid #912338 '
    }
});

const BurgundyCheckbox = withStyles({
    root: {
        '&$checked': {
            color: '#912338',
        },
    },
    checked: {},
})(Checkbox);

export default function DropView() {
    const classes = useStyles();

    const [courses, setCourses] = React.useState(Service.getEnrolledCourses());
    const [checked, setChecked] = React.useState(courses.map(() => false));
    const [confirm, setConfirm] = React.useState(false);
    const [removedCourses, setRemovedCourses] = React.useState([]);

    async function handleCheckedChange(event, index) {
        checked[index] = event.target.checked;
        setChecked([...checked]);
    }

    async function handleConfirm() {
        const removed = [];

        for (let i = 0; i < checked.length; i++) {
            if (checked[i] === true) {
                removed.push(courses[i]);
            }
        }

        if (removed.length <= 0) {
            return;
        }

        Service.drop(removed);
        await setCourses(Service.getEnrolledCourses());
        await setRemovedCourses(removed);
        await setChecked([...courses.map(() => false)]);
        await setConfirm(true);
    }

    return (
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Typography className={classes.title}>Class Drop</Typography>
                <Grid justify="space-evenly" spacing={5} container>
                    <Grid item className={classes.card}>
                        {
                            courses.map(c => {
                                return (
                                    <div style={{marginBottom: "10px", display: "inline-flex", width: "100%"}} >
                                        <div style={{marginRight: "10px"}}>
                                            <BurgundyCheckbox checked={checked[courses.indexOf(c)]} onClick={evt => handleCheckedChange(evt, courses.indexOf(c))}/>
                                        </div>
                                        <CourseCard course={c}/>
                                    </div>
                                )
                            })
                        }
                    </Grid>
                    <Grid item className={classes.form}>
                        <div>
                            <fieldset className={classes.small}>
                                <legend className={classes.bigRed}>
                                    Drop
                                </legend>
                                <table className={classes.box1} style={{width:"100%"}}>
                                    <Box className={classes.boxH1}>Reviewing</Box>
                                    <div style={{ textAlign:"left", paddingLeft:"15px"}}><strong>Course (s) that will be dropped</strong></div>

                                    { courses.map(c => checked[courses.indexOf(c)] === true ? <div style={{ textAlign:"left", paddingLeft:"15px"}}>{c.uniqueName} - {c.courseTitle}</div> : null) }

                                    <Button className={classes.button} variant='contained' onClick={handleConfirm}>Confirm</Button>
                                </table>
                                {
                                    confirm ? (
                                        <Box>
                                            <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Summary</h3>

                                            { removedCourses.map(c => (
                                                <div style={{ textAlign:"left", paddingLeft:"15px"}}>
                                                    {c.uniqueName} - {c.courseTitle}
                                                    <div style={{ float:"right"}}>Dropped successfully</div>
                                                </div>
                                            )) }

                                        </Box>
                                    ) : null
                                }
                            </fieldset>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
