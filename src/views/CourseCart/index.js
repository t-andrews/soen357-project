import React from 'react';
import {
    Button,
    makeStyles,
    Paper,
    Table,
    TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, Tooltip,
    withStyles
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
    classHeader: {
        fontWeight: 'bold',
        float: 'left'
    },
    left: {
      float: 'left'
    },
    right: {
        float: 'left'
    },
    table: {
        maxWidth: 800,
    },
    card:{
        width: '50%',
    },
    form:{
        width: '50%',

    }
});
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#808080' ,

    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function CourseCart() {
    const classes = useStyles();
    const courses = require("../../services/courseCart.json")

    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <Typography className={classes.title} variant='h5'>Course cart</Typography>
            <div className={classes.root}>
                <div className={classes.card}>
                    <Table>
                        {Object.keys(courses).map(key => (
                            <TableRow>
                                <TableCell>
                                    <Radio/>
                                </TableCell>
                                <TableCell>
                                    <Cart course={courses[key]}/>
                                </TableCell>
                                <TableCell>
                                    <Button>
                                        <DeleteIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))

                        }
                    </Table>

                </div>
            </div>
        </div>

    );
}