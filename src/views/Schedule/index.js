import React from 'react';
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

function a11yProps(index) {
    return {
        id: `schedule-tabs-${index}`,
        'aria-controls': `schedule-tabs-${index}`,
    };
}

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
                                <StyledTab classes={{wrapper: classes.tab}} label="Course List"{...a11yProps(0)}/>
                                <StyledTab classes={{wrapper: classes.tab}} label="Weekly Schedule"{...a11yProps(1)}/>
                                <StyledTab classes={{wrapper: classes.tab}} label="Schedule Builder"{...a11yProps(2)}/>
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <CourseList courses={[
                        {
                            name: 'COMP 123 - Intro Comp.Sci',
                            status: 'enrolled',
                            units: '3.00',
                            color: '#DB8300',
                            sections: [
                                {
                                    number: 1234,
                                    component: 'Lecture',
                                    section: 'S',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    instructor: 'Dr Instructor',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                }
                            ]
                        },
                        {
                            name: 'COMP 123 - Intro Comp.Sci',
                            status: 'enrolled',
                            units: '3.00',
                            color: '#00A251',
                            sections: [
                                {
                                    number: 1234,
                                    component: 'Lecture',
                                    section: 'S',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                },
                                {
                                    number: 1235,
                                    component: 'Laboratory',
                                    section: 'SSJ',
                                    daysTimes: 'Tu 3:45PM - 5:30PM',
                                    room: 'H 911 SGW',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                }
                            ]
                        },
                        {
                            name: 'COMP 123 - Intro Comp.Sci',
                            status: 'waitlisted',
                            units: '3.00',
                            color: '#C63A3A',
                            sections: [
                                {
                                    number: 1234,
                                    component: 'Lecture',
                                    section: 'S',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                },
                                {
                                    number: 1235,
                                    component: 'Laboratory',
                                    section: 'SSJ',
                                    daysTimes: 'Tu 3:45PM - 5:30PM',
                                    room: 'H 911 SGW',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                }
                            ]
                        },
                        {
                            name: 'COMP 123 - Intro Comp.Sci',
                            status: 'enrolled',
                            units: '3.00',
                            color: '#006280',
                            sections: [
                                {
                                    number: 1234,
                                    component: 'Lecture',
                                    section: 'S',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    instructor: 'Dr Instructor',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                },
                                {
                                    number: 1234,
                                    component: 'Laboratory',
                                    section: 'SSX',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    instructor: 'Dr Instructor',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                },
                                {
                                    number: 1234,
                                    component: 'Tutorial',
                                    section: 'SSX',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    instructor: 'Dr Instructor',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                }
                            ]
                        },
                        {
                            name: 'COMP 123 - Intro Comp.Sci',
                            status: 'enrolled',
                            units: '3.00',
                            color: '#9861A9',
                            sections: [
                                {
                                    number: 1234,
                                    component: 'Lecture',
                                    section: 'S',
                                    daysTimes: 'MoWe 10:15AM - 11:30AM',
                                    room: 'H 444 SGW',
                                    instructor: 'Dr Instructor',
                                    startEndDates: '09/07/2021 - 12/06/2021'
                                }
                            ]
                        }
                    ]}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <WeeklySchedule courses={[
                        {
                            name: 'Intro Comp.Sci',
                            className: 'COMP 123',
                            instructor: 'Dr Instructor',
                            color: '#9861A9',
                            startDate: new Date(2021,0, 13),
                            endDate: new Date(2021,3, 20),
                            components: [
                                {
                                    component: 'Lecture',
                                    section: 'S',
                                    day: 'Monday',
                                    room: 'H 444 SGW',
                                    startTime: '1:45PM',
                                    endTime: '3:00PM'
                                },
                                {
                                    component: 'Tutorial',
                                    section: 'SJ',
                                    day: 'Monday',
                                    room: 'H 666 SGW',
                                    startTime: '3:30PM',
                                    endTime: '6:00PM'
                                }
                            ]
                        },
                        {
                            name: 'Intro Comp.Sci 2',
                            className: 'COMP 456',
                            instructor: 'Dr Dok Tor',
                            color: '#006280',
                            startDate: new Date(2021,0, 13),
                            endDate: new Date(2021,3, 20),
                            components: [
                                {
                                    component: 'Lecture',
                                    section: 'S',
                                    day: 'Tuesday',
                                    room: 'H 234 SGW',
                                    startTime: '2:45PM',
                                    endTime: '5:00PM'
                                },
                                {
                                    component: 'Tutorial',
                                    section: 'SJ',
                                    day: 'Friday',
                                    room: 'H 666 SGW',
                                    startTime: '9:30AM',
                                    endTime: '11:45AM'
                                },
                                {
                                    component: 'Laboratory',
                                    section: 'SJ',
                                    day: 'Wednesday',
                                    room: 'H 666 SGW',
                                    startTime: '7:30PM',
                                    endTime: '10:00PM'
                                }
                            ]
                        }
                    ]}/>
                </TabPanel>
                <TabPanel value={value} index={2}>

                </TabPanel>
            </div>
        </div>
    );
}