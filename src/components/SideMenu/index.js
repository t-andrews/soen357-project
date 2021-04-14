import React from 'react';
import { Button, ButtonGroup, Collapse, Divider, Drawer, Grid, makeStyles, Typography } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    title: {
        color: '#912338',
        fontWeight: 'bold',
        paddingTop: '10px'
    },
    drawer: {
        width: '250px',
        flexShrink: 0
    },
    drawerPaper: {
        width: '250px',
    },
    button: {
        fontWeight: 'bold',
    },
    icon: {
        paddingTop: '5px'
    },
});

export default function Template() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return(
        <div className={classes.root}>
            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}} anchor="left">
                <Typography className={classes.title} variant='h4'>CONCORDIA</Typography>
                <Divider />
                <ButtonGroup orientation='vertical'>
                    <Button className={classes.button}>
                        <Grid container direction='row' justify='space-between'>
                            <Grid item>...</Grid>
                            <Grid item><ExpandMore className={classes.icon}/></Grid>
                        </Grid>
                    </Button>
                    <Button className={classes.button}>
                        <Grid container direction='row' justify='space-between'>
                            <Grid item>...</Grid>
                            <Grid item><ExpandMore className={classes.icon}/></Grid>
                        </Grid>
                    </Button>
                    <Button className={classes.button} onClick={handleClick}>
                        <Grid container direction='row' justify='space-between' alignItems='center'>
                            <Grid item>Enrollment</Grid>
                            <Grid item className={classes.icon}>{open ? <ExpandLess /> : <ExpandMore />}</Grid>
                        </Grid>
                    </Button>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <ButtonGroup orientation='vertical' style={{width: '250px'}}>
                            <Button>Home</Button>
                            <Button>Add Classes</Button>
                            <Button>Swap Classes</Button>
                            <Button>Drop Classes</Button>
                            <Button>Class Schedule</Button>
                            <Button>Course Cart</Button>
                        </ButtonGroup>
                    </Collapse>
                    <Button className={classes.button}>
                        <Grid container direction='row' justify='space-between'>
                            <Grid item>...</Grid>
                            <Grid item><ExpandMore className={classes.icon}/></Grid>
                        </Grid>
                    </Button>
                    <Button className={classes.button}>
                        <Grid container direction='row' justify='space-between'>
                            <Grid item>...</Grid>
                            <Grid item><ExpandMore className={classes.icon}/></Grid>
                        </Grid>
                    </Button>
                </ButtonGroup>
            </Drawer>
        </div>
    );
}