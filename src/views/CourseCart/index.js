import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {Paper} from "@material-ui/core";

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
});

export default function CourseCart() {
    const classes = useStyles();

    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <h1>Code Here</h1>
            </div>
        </div>

    );
}