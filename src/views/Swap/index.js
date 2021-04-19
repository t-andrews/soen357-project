import React from 'react';
import {makeStyles, styled} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {Grid, Paper} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CourseCard from "../../components/CoursesCard";
import Form from "../../components/Form";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '700px',
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
    card:{
        width: '60%',
    },
    form:{
        width: '70%',

    }
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

export default function SwapView() {
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
                <Box display="flex" flexDirection="row" >
                    <Box className={classes.card}>
                         <CourseCard/>
                    </Box>
                    <Box m={1} p={1} className={classes.form}>
                        <Form heading="Swap"/>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
