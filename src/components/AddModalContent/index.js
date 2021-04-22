import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Grid} from "@material-ui/core";
import {addToCourseCart} from "../../services/service";
import * as service from "../../services/service";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 224,
    },
    tabs: {
        borderRight: `2px solid ${theme.palette.divider}`
    },
    button: {
        backgroundColor: '#912338',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4283f'
        },
        marginTop: '70px',
        marginLeft: '240px'
    },
    indicator: {
        backgroundColor: '#912338',
    }
}));

export default function ModalContent(props) {
    const classes = useStyles();
    const [courses, ] = React.useState(props.courses);
    const [value, setValue] = React.useState(0);

    function handleConfirm () {
        courses.forEach(c => {
            c.sections.push({
                component: "Lecture",
                section: c.section,
                instructor: c.instructor,
                startTime: c.startTime,
                endTime: c.endTime,
                location: c.location,
                days: c.days,
            })
            service.addToCourseCart(c);
        });
        console.log('confirm',courses)
        setValue(1);
    }

    return (
        <div className={classes.root}>
            <Tabs className={classes.tabs} classes={{ indicator: classes.indicator }} orientation="vertical" value={value} >
                <Tab disabled={true} label="Reviewing" {...a11yProps(0)} />
                <Tab disabled={true} label="Summary" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container direction='column' spacing={3}>
                    <Grid item>
                        <Typography variant='h6'>Course(s) that will be added: </Typography>
                    </Grid>
                    {
                        courses.map(c => (
                            <Grid item>
                                <Typography>{c.uniqueName}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>
                <Button className={classes.button} variant='contained' onClick={handleConfirm}>Confirm</Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container direction='column' spacing={3}>
                    {
                        courses.map(c => (
                            <Grid item>
                                <Grid container direction='row' spacing={2}>
                                    <Grid item>
                                        <Typography>{c.uniqueName}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Added Successfully</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </TabPanel>
        </div>
    );
}
