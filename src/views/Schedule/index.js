import React, {useEffect} from 'react';
import {makeStyles, styled} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {Grid, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CourseList from "../../components/CourseList";
import WeeklySchedule from "../../components/WeeklySchedule";
import * as Service from "../../services/service";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '700px',
        minWidth: '1100px',
        padding: '10px'
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: '15px',
    },
    tabs: {
        height: '30px',
        width: '480px',
        color: 'black',
        backgroundColor: '#b3b3b3'
    },
    indicator: {
        top: '30px',
        backgroundColor: '#912338',
    },
    expand: {
        paddingTop: '5px'
    },
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tab" hidden={value !== index} id={`tabs-${index}`}
             aria-labelledby={`tabs-${index}`}{...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const StyledTab = styled(Tab)({
    minHeight: '30px',
    padding: 0,
    fontSize: '0.8em',
    fontWeight: 'bold'
});

export default function ScheduleView() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [toggled] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [courses, setCourses] = React.useState(Service.getEnrolledCourses());

    useEffect( () => {
        async function fetchData() {
            if (!courses) {
                setCourses(Service.getEnrolledCourses() ?? []);
            }
        }
        fetchData().then();
    }, []);

    const prevOpen = React.useRef(toggled);
    React.useEffect(() => {
        if (prevOpen.current && !toggled) {
            anchorRef.current.focus();
        }
        prevOpen.current = toggled;
    }, [toggled]);

    return (
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Grid container direction='row' spacing={2}>
                    <Grid item>
                        <AppBar className={classes.tabs} position="static">
                            <Tabs value={value} classes={{ indicator: classes.indicator }} onChange={handleChange}>
                                <StyledTab label="Weekly Schedule"/>
                                <StyledTab label="Course List"/>
                                <StyledTab label="Schedule Builder"/>
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <WeeklySchedule courses={courses ?? []}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <CourseList courses={courses ?? []}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Would redirect to schedule builder
                </TabPanel>
            </div>
        </div>
    );
}
