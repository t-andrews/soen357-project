import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    ButtonGroup, Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    InputBase,
    Paper,
    Popover,
    TextField, withStyles
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Cancel, CheckCircle, ExpandLess, ExpandMore, PauseCircleFilled, Search} from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '950px',
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
        textAlign: 'left',
        fontSize: 'x-large'
    },
    legend: {
        border: '1px solid #b3b3b3',
    },
    searchBox: {
        border: '2px solid #912338',
        borderRadius: '5px!important',
        width: '49.5%',
        minHeight: '600px'
    },
    search: {
        position: 'relative',
        width: '125%',
        height: '50px',
        backgroundColor: '#f2f2f2',
        '&:hover': {
            backgroundColor: '#e6e6e6'
        },
    },
    inputInput: {
        padding: '16px',
        paddingLeft: '5px',
        width: '15ch',
    },
    select: {
      paddingTop: '20px'
    },
    dropdown: {
        textTransform: 'unset'
    },
    icon: {
        paddingTop: '5px',
        paddingLeft: '5px'
    },
    timeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    timeField: {
        width: 110,
    },
    button: {
        backgroundColor: '#912338',
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4283f'
        }
    }
});

const CustomTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'none',
            },
            '&:hover fieldset': {
                borderColor: '#912338',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#912338',
            },
        },
    },
})(TextField);


const BurgundyCheckbox = withStyles({
    root: {
        '&$checked': {
            color: '#912338',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Add() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state, setState] = React.useState({
        L200: false, L300: false, L400: false, L500: false, L600: false, L700: false, L800: false,
        Sunday: false, Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false,
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'semester-popover' : undefined;

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return(
        <div>
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Typography className={classes.title}>Class Search</Typography>
                <Grid container direction='row' spacing={3} justify='flex-end' style={{paddingRight: '25px', paddingBottom: '30px'}}>
                    <Grid item className={classes.legend}>
                        <CheckCircle style={{color: 'green'}}/>
                        Enrolled
                    </Grid>
                    <Grid item className={classes.legend}>
                        <Cancel style={{color: 'red'}}/>
                        Closed
                    </Grid>
                    <Grid item className={classes.legend}>
                        <PauseCircleFilled style={{color: 'orange'}}/>
                        Wait list
                    </Grid>
                </Grid>
                <Grid container direction='row' spacing={5} justify='space-between' style={{paddingLeft: '25px', paddingRight: '25px'}}>
                    <Grid item className={classes.searchBox}>
                        <Grid container direction='column' spacing={5} alignItems='center'>
                            <Grid item style={{borderBottom: '2px solid #912338', width: '100%'}}>
                                <div className={classes.search}>
                                    <InputBase placeholder="Search for a Class" classes={{ input: classes.inputInput }}
                                               inputProps={{ 'aria-label': 'search' }} startAdornment={<Search />}
                                    />
                                </div>
                                <div className={classes.select}>
                                    <Button className={classes.dropdown} onClick={handleClick} variant='outlined'>
                                        <Grid container direction='row' justify='space-between' alignItems='center'>
                                            <Grid item>Select from Course Cart</Grid>
                                            <Grid item className={classes.icon}>{open ? <ExpandLess /> : <ExpandMore />}</Grid>
                                        </Grid>
                                    </Button>
                                    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                                             anchorOrigin={{
                                                 vertical: 'bottom',
                                                 horizontal: 'center',
                                             }}
                                             transformOrigin={{
                                                 vertical: 'top',
                                                 horizontal: 'center',
                                             }}
                                    >
                                        <ButtonGroup style={{width: '220px'}} orientation='vertical'>
                                            <Button>Course 1</Button>
                                            <Button>Course 2</Button>
                                            <Button>Course 3</Button>
                                        </ButtonGroup>
                                    </Popover>
                                </div>
                            </Grid>
                            <Grid item style={{width: '100%'}}>
                                <Grid container direction='column' spacing={3} justify='space-between'>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-evenly'>
                                            <Grid item>
                                                <Typography style={{fontWeight: 'bold'}}>Enter Subject</Typography>
                                            </Grid>
                                            <Grid item>
                                                <CustomTextField variant='outlined'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item justify='space-between'>
                                        <Grid container direction='row' justify='space-evenly'>
                                            <Grid item>
                                                <Typography style={{fontWeight: 'bold'}}>Course Number</Typography>
                                            </Grid>
                                            <Grid item>
                                                <CustomTextField variant='outlined'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-evenly'>
                                            <Grid item>
                                                <Typography style={{fontWeight: 'bold'}}>Course Level</Typography>
                                            </Grid>
                                            <Grid item>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.L200} onChange={handleChange} name="L200" />}
                                                        label="200"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.L300} onChange={handleChange} name="L300" />}
                                                        label="300"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.L400} onChange={handleChange} name="L400" />}
                                                        label="400"
                                                    />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.L500} onChange={handleChange} name="L500" />}
                                                        label="500"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.L600} onChange={handleChange} name="L600" />}
                                                        label="600"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.L700} onChange={handleChange} name="L700" />}
                                                        label="700"
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-evenly'>
                                            <Grid item>
                                                <Typography style={{fontWeight: 'bold'}}>Days of Week</Typography>
                                            </Grid>
                                            <Grid item>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Sunday} onChange={handleChange} name="Sunday" />}
                                                        label="Sunday"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Monday} onChange={handleChange} name="Monday" />}
                                                        label="Monday"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Tuesday} onChange={handleChange} name="Tuesday" />}
                                                        label="Tuesday"
                                                    />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Wednesday} onChange={handleChange} name="Wednesday" />}
                                                        label="Wednesday"
                                                    />

                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Thursday} onChange={handleChange} name="Thursday" />}
                                                        label="Thursday"
                                                    />
                                                </FormGroup>
                                                <FormGroup row>
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Friday} onChange={handleChange} name="Friday" />}
                                                        label="Friday"
                                                    />
                                                    <FormControlLabel
                                                        control={<BurgundyCheckbox checked={state.Saturday} onChange={handleChange} name="Saturday" />}
                                                        label="Saturday"
                                                    />
                                                </FormGroup>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-evenly'>
                                            <Grid item>
                                                <Typography style={{fontWeight: 'bold'}}>Class Times</Typography>
                                            </Grid>
                                            <Grid item>
                                                <form className={classes.timeContainer} noValidate>
                                                    <TextField id="time" label="From" type="time" defaultValue="08:00"
                                                               className={classes.timeField}
                                                               InputLabelProps={{
                                                                   shrink: true,
                                                               }}
                                                               inputProps={{
                                                                   step: 300, // 5 min
                                                               }}
                                                    />
                                                </form>
                                            </Grid>
                                            <Grid item>
                                                <form className={classes.timeContainer} noValidate>
                                                    <TextField id="time" label="To" type="time" defaultValue="23:00"
                                                               className={classes.timeField}
                                                               InputLabelProps={{
                                                                   shrink: true,
                                                               }}
                                                               inputProps={{
                                                                   step: 300, // 5 min
                                                               }}
                                                    />
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction='row' justify='space-evenly'>
                                            <Grid item>
                                                <Typography style={{fontWeight: 'bold'}}>Instructor Last Name</Typography>
                                            </Grid>
                                            <Grid item>
                                                <CustomTextField variant='outlined'/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item style={{width: '100%'}}>
                                <Grid container direction='row' justify='space-between'>
                                    <Grid item>
                                        <Button className={classes.button} variant='contained'>Clear</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button className={classes.button} variant='contained'>Search</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.searchBox}>
                        Two
                    </Grid>
                </Grid>
            </div>
        </div>

    );
}