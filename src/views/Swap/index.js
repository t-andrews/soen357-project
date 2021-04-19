import React from 'react';
import {makeStyles, styled} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {Paper} from "@material-ui/core";
import CourseCard from "../../components/CoursesCard";
import SwapForm from "../../components/SwapForm";

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
    card:{
        width: '100%',
        margin: '30px'
    },
    form:{
        width: '100%',
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

export default function SwapView() {
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

    return (
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Box display="flex" flexDirection="row" >
                    <Box className={classes.card}>
                         <CourseCard/>
                    </Box>
                    <Box m={1} p={1} className={classes.form}>
                        <SwapForm heading="Swap"/>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
