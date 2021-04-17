import React from 'react';
import {Grid} from "@material-ui/core";
import { ScheduleComponent, Week, Inject } from '@syncfusion/ej2-react-schedule';
import {ViewDirective, ViewsDirective} from "@syncfusion/ej2-react-schedule/src/schedule/views-directive";
import {Internationalization, extend} from '@syncfusion/ej2-base';
import {makeStyles} from "@material-ui/core/styles";

let classes;

function getDateWithTime(date, timeString) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const isPM = timeString.substr(-2) === 'PM';
    const timeSection = timeString.substr(0, timeString.length - 2);
    const arr = timeSection.split(':');
    let hours = Number(arr[0]);
    let minutes = Number(arr[1]);

    if (isPM) {
        hours += 12;
    }

    newDate.setHours(hours);
    newDate.setMinutes(minutes);

    return newDate;
}

const instance = new Internationalization();

function getTimeString(value) {
    return instance.formatDate(value, { skeleton: 'hm' });
}

function eventTemplate(props) {
    return (
        <div className={classes.outer} style={{background: props.Color }}>
            <div className={classes.middle}>
                <div className={classes.inner}>
                    {props.Subject}
                </div>
                <div className={classes.inner}>
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

        course.components.forEach(component => {
            const startDate = new Date(course.startDate);
            const endDate = new Date(course.endDate);
            const nbWeeks = (startDate.getMilliseconds() - endDate.getMilliseconds()) / msInWeek;
            formattedCourses.push({
                Subject: `${course.className} - ${component.section}`,
                Name: course.name,
                Component: component.component,
                Instructor: course.instructor,
                StartTime: getDateWithTime(startDate, component.startTime),
                EndTime: getDateWithTime(startDate, component.endTime),
                RecurrenceRule: `FREQ=WEEKLY;INTERVAL=1;BYDAY=${component.day.substr(0, 2).toUpperCase()};COUNT=${nbWeeks}`,
                Room: component.room,
                Color: course.color,
                Description: `<div style="text-align: left">${course.name}</br>Component: ${component.component}</br>Instructor: ${course.instructor}</br>Room: ${component.room}</div>`,
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

export default function WeeklySchedule(props) {
    classes = (makeStyles({
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
        }
    }))();

    const [courses, setCourses] = React.useState(
        extend([], getFormattedCourses(props.courses ?? []), null, true)
    );

    console.log(courses)
    return (
        <Grid container>
            <Grid item xs={9} style={{maxWidth: '75%', minWidth: '915px'}}>
                <ScheduleComponent
                    border="2px solid #912338"
                    minHeight="600px"
                    rowAutoHeight={true}
                    startHour="08:00" endHour="24:00"
                    workHours={{highlight: false}}
                    eventSettings={{ dataSource: courses, template: eventTemplate, enableTooltip: true, tooltipTemplate: tooltipTemplate}}
                    dateHeaderTemplate={dateHeaderTemplate}
                    eventRendered={applyColor}
                    timeScale={{ enable: true, interval: 60, slotCount: 1 }}
                    readonly={true}
                >
                    <ViewsDirective>
                        <ViewDirective option='Week' />
                    </ViewsDirective>
                    <Inject services={[Week]}/>
                </ScheduleComponent>
            </Grid>
            <Grid item xs={3}>
                Filters
            </Grid>
        </Grid>
    );
}
