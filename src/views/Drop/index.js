import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";
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

export default function DropView() {
    const classes = useStyles();
    const [toggled] = React.useState(false);
    const anchorRef = React.useRef(null);

    const prevOpen = React.useRef(toggled);
    React.useEffect(() => {
        if (prevOpen.current && !toggled) {
            anchorRef.current.focus();
        }
        prevOpen.current = toggled;
    }, [toggled]);

    const [courses,] = React.useState(Service.getEnrolledCourses());

    return (
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Typography className={classes.title}>Class Search</Typography>
                <Grid justify="space-evenly" spacing={5} container>
                    <Grid item className={classes.card}>
                        {courses.map(c => <CourseCard style={{}} course={c}/>)}
                    </Grid>
                    <Grid item className={classes.form}>
                        <div>
                            <fieldset className={classes.small}>
                                <legend className={classes.bigRed}>
                                    Drop
                                </legend>
                                <table className={classes.box1} style={{width:"100%"}}>
                                    <tr>
                                        <td>
                                            <Box className={classes.boxH1}>Reviewing</Box>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign:"left", paddingLeft:"15px"}}><strong>Course(s) that will be dropped</strong></td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign:"left", paddingLeft:"25px"}} >Sample 1</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign:"left", paddingLeft:"25px"}} >Sample 2</td>
                                    </tr>
                                    <Button className={classes.button} variant='contained'>Confirm</Button>
                                </table>
                                <Box>
                                    <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Summary</h3>
                                    <table style={{marginLeft:"5%", alignContent:"left",width:"90%"}}>
                                    </table>
                                </Box>
                            </fieldset>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
