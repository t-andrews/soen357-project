import React from 'react';
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableCell,
    TableRow,
    Grid, withStyles
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Cart from "../../components/Cart";
import Radio from '@material-ui/core/Radio';
import DeleteIcon from '@material-ui/icons/Delete';
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
    title: {
        color: '#912338',
        fontWeight: 'bold',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        float: 'left',

    },
    bigRed:{
        fontSize:"Large",
        color: "#912338",
        fontWeight:"bold"
    },
    small:{
        marginLeft: "30px",
        border: '2px solid #912338',
        borderRadius: '5px!important'
    },
    boxH1:{
        textAlign:"left",
        borderLeft: '2px solid #912338',
        color: "#912338",
        padding: "10px",
        fontSize: "1.2rem",
        fontWeight: 'bold'
    },
    smallTitle: {
        fontWeight: 'bold',
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        float: 'left',

    },
    courses: {
        float: 'left',
        fontSize: "1.2rem",
    }
});
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
export default function CourseCart() {
    const classes = useStyles();
    const courses = require("../../services/courseCart.json")

    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <Typography className={classes.title} variant='h5'>Course cart</Typography>
            <div className={classes.root}>
                <Grid container>
                <Grid item xs={3} style={{maxWidth: '75%', minWidth: '915px'}}>
                    <Table>
                        {Object.keys(courses).map(key => (
                            <TableRow>
                                <TableCell>
                                    <Radio/>
                                </TableCell>
                                <TableCell>
                                    <Cart course={courses[key]}/>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </Table>
                </Grid>
                <Grid item xs={5}>
                    <fieldset className={classes.small}>
                    <legend className={classes.bigRed}>
                        Enroll
                    </legend>
                        <Box className={classes.boxH1}>Reviewing</Box>
                        <Box> <Typography className={classes.smallTitle} >Course(s) that will be added:</Typography></Box>
                        <br/>
                        <br/>
                        <Table>
                            <TableRow>
                                COMP 232 S -Databases
                            </TableRow>
                            <TableRow>
                                COMP 232 S -Databases
                            </TableRow>
                        </Table>
                        <ColorButton size="small" >
                            Next
                        </ColorButton>
                        <br/>
                        <br/>
                        <Box style={{borderTop: ' 2px solid #912338 '}}>
                            <br/>
                            <Box className={classes.boxH1}>Summary</Box>
                            <Table>
                                <TableRow>
                                    COMP 232 S -Databases - Enrolled Successfully
                                </TableRow>
                                <TableRow>
                                    COMP 232 S -Databases - Enrolled Successfully
                                </TableRow>
                            </Table>
                        </Box>
                    </fieldset>

                </Grid>
                </Grid>
            </div>
        </div>

    );
}