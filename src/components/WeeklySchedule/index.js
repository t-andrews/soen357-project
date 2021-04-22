import React, {useEffect, useReducer} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, withStyles} from "@material-ui/core";
import { ScheduleComponent, Week, Inject } from '@syncfusion/ej2-react-schedule';
import {ViewDirective, ViewsDirective} from "@syncfusion/ej2-react-schedule/src/schedule/views-directive";
import {Internationalization} from '@syncfusion/ej2-base';
import {makeStyles} from "@material-ui/core/styles";
import * as DateUtils from "../../services/dateUtils";
import Box from "@material-ui/core/Box";
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles({
    outer: {
        display: 'table',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        textAlign: 'center'
    },
    middle: {
        display: 'table-cell',
        verticalAlign: 'middle',
    },
    inner: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    small:{
        marginLeft: "30px",
        border: '2px solid #912338',
        borderRadius: '5px!important'
    },
    bigRed:{
        fontSize:"Large",
        color: "#912338",
        fontWeight:"bold"
    }
});

const filterStartDate = new Date(Date.now());
const filterEndDate = new Date(Date.now());
filterStartDate.setHours(8);
filterStartDate.setMinutes(0);
filterStartDate.setSeconds(0);
filterStartDate.setMilliseconds(0);
filterEndDate.setHours(23);
filterEndDate.setMinutes(0);
filterEndDate.setSeconds(0);
filterEndDate.setMilliseconds(0);

const instance = new Internationalization();

const StyledCheckbox = withStyles({
    root: {
        color: '#912338',
        '&$checked': {
            color: '#912338',
        },
    },
    checked: {},
})(Checkbox);

function getTimeString(value) {
    return instance.formatDate(value, { skeleton: 'hm' });
}

function eventTemplate(props, styles) {
    return (
        <div className={styles.outer} style={{background: props.Color }}>
            <div className={styles.middle}>
                <div className={styles.inner}>
                    {props.Subject}
                </div>
                <div className={styles.inner}>
                    {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}
                </div>
            </div>
        </div>
    );
}

function tooltipTemplate(props) {
    return (
        <div className="tooltip-wrap">
            <div>
                <div>
                    {props.Name}: {props.Subject}
                </div>
                <div>
                    {props.Component}
                </div>
                <div>
                    {props.Instructor}
                </div>
                <div>
                    {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)}
                </div>
                <div>
                    {props.Room}
                </div>
            </div>
        </div>);
}

const msInWeek = 604800000.0;

function getFormattedCourses(courses) {
    const formattedCourses = [];
    courses.forEach(course => {
        course.sections.forEach(component => {
            const { startDate, endDate } = DateUtils.buildDates(course.startDate, course.endDate, course.term)
            const nbWeeks = (startDate.getMilliseconds() - endDate.getMilliseconds()) / msInWeek;
            formattedCourses.push({
                Subject: `${course.courseName} - ${component.section}`,
                Name: course.courseTitle,
                Component: component.component,
                Instructor: course.instructor,
                StartTime: DateUtils.getDateWithTime(startDate, component.startTime),
                EndTime: DateUtils.getDateWithTime(startDate, component.endTime),
                RecurrenceRule: `FREQ=WEEKLY;INTERVAL=1;BYDAY=${component.days.map(d => d.substr(0, 2).toUpperCase()).join(',')};COUNT=${nbWeeks}`,
                Room: component.location,
                Color: course.color,
                Description: `<div style="text-align: left">${course.courseTitle}</br>Component: ${component.component}</br>Instructor: ${course.instructor}</br>Room: ${component.location}</div>`,
                IsAllDay: false,
            });
        });
    });

    return formattedCourses;
}

function applyColor(args) {
    args.element.style.backgroundColor = args.data.Color;
}

function dateHeaderTemplate(props) {
    return <div>{instance.formatDate(props.date, { skeleton: 'Ed' })}</div>;
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

export default function WeeklySchedule(props) {
    const classes = useStyles();

    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [courses, setCourses] = React.useState(getFormattedCourses(props.courses));
    const [scheduleStartHour, setScheduleStartHour] = React.useState('8:00');
    const [scheduleEndHour, setScheduleEndHour] = React.useState('23:00');
    const [selectedStartTime, setSelectedStartTime] = React.useState(filterStartDate);
    const [selectedEndTime, setSelectedEndTime] = React.useState(filterEndDate);
    const [daysSelected, setDaysSelected] = React.useState({"Sun": true, "Mon": true, "Tue": true, "Wed": true, "Thu": true, "Fri": true, "Sat": true});

    async function handleDateChange(date, type) {
        if (date.toString() === 'Invalid Date') {
            return;
        }

        let hours = date.getHours();
        let minutes = date.getMinutes();

        const newTime = `${hours}:${minutes}`;

        if (type === 'start') {
            await setSelectedStartTime(date);
            await setScheduleStartHour(newTime)
        } else {
            await setSelectedEndTime(date);
            await setScheduleEndHour(newTime)
        }

        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => filterDays(daysSelected, d));
    }

    function filterDays(days, day) {
        const dayRows = Array.from(document.getElementsByClassName('e-all-day-row')[0].children);
        const headers = Array.from(document.getElementsByClassName('e-header-row')[0].children);
        const visibilityIndex = headers.findIndex(c => c.innerHTML.includes(day));
        const rows = document.querySelectorAll('[role="row"]');
        const dayWrappers1 = Array.from(document.getElementsByClassName('e-all-day-appointment-wrapper'));
        const dayWrappers2 = Array.from(document.getElementsByClassName('e-day-wrapper'));
        const display = days[day] ? '' : 'none';

        dayWrappers1[visibilityIndex].style.display = display;
        dayWrappers2[visibilityIndex].style.display = display;
        dayRows[visibilityIndex].style.display = display;
        headers[visibilityIndex].style.display = display;
        rows.forEach((r => {
            r.children[visibilityIndex].style.display = display;
        }))
    }

    function handleDayCheckBox(day) {
        const newDays = daysSelected;
        newDays[day] = !newDays[day];
        setDaysSelected(newDays);

        filterDays(newDays, day)

        forceUpdate();
    }

    async function clearFilters() {
        const newDays = daysSelected;
        for(let prop in daysSelected) {
            newDays[prop] = true;
        }
        await setDaysSelected(newDays);
        await setScheduleStartHour('8:00');
        await setScheduleEndHour('23:00');
        await setSelectedStartTime(filterStartDate);
        await setSelectedEndTime(filterEndDate);

        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => filterDays(daysSelected, d));

        forceUpdate();
    }

    useEffect(() => {
        setCourses(getFormattedCourses(props.courses));
    }, [props.courses]);

    return (
        <Grid container>
            <Grid item xs={9} style={{maxWidth: props.width ?? "75%", minWidth: '915px'}}>
                <ScheduleComponent
                    border="2px solid #912338"
                    minHeight="600px"
                    rowAutoHeight={true}
                    startHour={scheduleStartHour} endHour={scheduleEndHour}
                    workHours={{highlight: false}}
                    eventSettings={{ dataSource: courses, template: p => eventTemplate(p, classes), enableTooltip: true, tooltipTemplate: tooltipTemplate}}
                    dateHeaderTemplate={dateHeaderTemplate}
                    eventRendered={applyColor}
                    timeScale={{ enable: true, interval: 60, slotCount: 1 }}
                    readonly={true}
                >
                    <ViewsDirective>
                        <ViewDirective option='Week'/>
                    </ViewsDirective>
                    <Inject services={[Week]}/>
                </ScheduleComponent>
            </Grid>
            {props.filter ? <Grid item xs={3}>
                <fieldset className={classes.small}>
                    <legend className={classes.bigRed}>
                        Filter
                    </legend>
                    <Box>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                label="Start Time"
                                value={selectedStartTime}
                                minutesStep={5}
                                onChange={date => handleDateChange(date, 'start')}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <br/>
                    <Box>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                label="End Time"
                                value={selectedEndTime}
                                minutesStep={5}
                                onChange={date => handleDateChange(date, 'end')}
                            />
                        </MuiPickersUtilsProvider>
                    </Box>
                    <br/><br/>
                    <Box>
                        {
                            ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                                day => (
                                    <FormControlLabel
                                        control={<StyledCheckbox name="checkedG"/>}
                                        label={day}
                                        labelPlacement="top"
                                        checked={daysSelected[day]}
                                        onChange={() => handleDayCheckBox(day)}
                                    />
                                )
                            )
                        }
                    </Box>
                    <br/>
                    <ColorButton size="small" onClick={clearFilters}>
                        Clear
                    </ColorButton>
                </fieldset>
            </Grid> : null}
        </Grid>
    );
}
