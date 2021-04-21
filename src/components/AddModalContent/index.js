import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Button, Grid} from "@material-ui/core";

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
        borderRight: `2px solid ${theme.palette.divider}`,
    },
    button: {
        backgroundColor: '#912338',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4283f'
        },
        marginTop: '30px',
        marginLeft: '160px'
    }
}));

export default function ModalContent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(1);
    };

    return (
        <div className={classes.root}>
            <Tabs className={classes.tabs} orientation="vertical" value={value} >
                <Tab label="Reviewing" {...a11yProps(0)} />
                <Tab label="Summary" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <Grid container direction='column' spacing={3}>
                    <Grid item>
                        <Typography variant='h6'>Course(s) that will be added: </Typography>
                    </Grid>
                    <Grid item>
                        <Typography>SOEN 357 Y - UI Design</Typography>
                        <Typography>SOEN 363 Y - Databases</Typography>
                    </Grid>
                </Grid>
                <Button className={classes.button} variant='contained' onClick={handleChange}>Confirm</Button>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </div>
    );
}