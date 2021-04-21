import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid} from "@material-ui/core";
import CourseSearchList from "../CourseSearchList";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    accordion: {
        backgroundColor: '#6e6e6e'
    },
    headerFont: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default function SearchResultsShell() {
    const classes = useStyles();

    const [value, setValue] = React.useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand"
                                  aria-controls="additional-actions1-content" id="additional-actions1-header"
                >
                    <Grid container direction='row' justify='space-between' className={classes.headerFont}>
                        <Grid item>
                            <Typography variant='h5'>SOEN 357 - UI Design</Typography>
                        </Grid>
                        <Grid item style={{marginLeft: '1%'}}>
                            <Typography variant='h5'>3.00 Units</Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <CourseSearchList />
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand"
                                  aria-controls="additional-actions2-content" id="additional-actions2-header"
                >
                    <Grid container direction='row' justify='space-between' className={classes.headerFont}>
                        <Grid item>
                            <Typography variant='h5'>SOEN 363 - Databases</Typography>
                        </Grid>
                        <Grid item style={{marginLeft: '1%'}}>
                            <Typography variant='h5'>3.00 Units</Typography>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <CourseSearchList />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}