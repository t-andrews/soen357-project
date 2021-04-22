import React from 'react';
import SideMenu from '../SideMenu';
import HomeView from '../../views/Main';
import AddView from '../../views/Add';
import SwapView from '../../views/Swap';
import DropView from '../../views/Drop';
import ScheduleView from '../../views/Schedule';
import CourseCartView from '../../views/CourseCart';
import PropTypes from 'prop-types';
import {makeStyles, styled} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, ButtonGroup, ClickAwayListener, Grid, Grow, Paper, Popover, Popper } from "@material-ui/core";
import { Add, DateRange, ExpandLess, ExpandMore, HomeOutlined, RemoveCircleOutline, ShoppingCartOutlined, SwapHoriz } from "@material-ui/icons";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        marginLeft: '250px'
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: '25px'
    },
    tabs: {
        width: '1200px',
        color: 'black',
        marginLeft: '10px',
        backgroundColor: '#b3b3b3'
    },
    indicator: {
        backgroundColor: '#912338',
    },
    iconWrapper: {
        flexDirection: 'row',
        height: '20px',
        fontWeight: 'bold'
    },
    expand: {
        paddingTop: '5px'
    },
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
        id: `tabs-${index}`,
        'aria-controls': `tabs-${index}`,
    };
}

const StyledTab = styled(Tab)({
    minHeight: '50px'
});

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [toggled, setToggled] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'semester-popover' : undefined;

    const handleToggleOn = () => {
        setToggled((prevOpen) => !prevOpen);
    };

    const handleToggleOff = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setToggled(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setToggled(false);
        }
    }

    const prevOpen = React.useRef(toggled);
    React.useEffect(() => {
        if (prevOpen.current && !toggled) {
            anchorRef.current.focus();
        }

        prevOpen.current = toggled;
    }, [toggled]);

    return (
        <div>
            <SideMenu />
            <Paper className={classes.paper} elevation={0}/>
            <div className={classes.root}>
                <Grid container direction='row' spacing={2}>
                    <Grid item>
                        <AppBar className={classes.tabs} position="static">
                            <Tabs value={value} classes={{ indicator: classes.indicator }} onChange={handleChange} variant='fullWidth'>
                                <StyledTab classes={{wrapper: classes.iconWrapper}} label="Home"
                                     icon={<HomeOutlined style={{paddingRight: '5px'}}/>} {...a11yProps(0)}
                                />
                                <StyledTab classes={{wrapper: classes.iconWrapper}} label="Add"
                                     icon={<Add style={{paddingRight: '5px'}}/>} {...a11yProps(1)}
                                />
                                <StyledTab classes={{wrapper: classes.iconWrapper}} label="Course Cart"
                                           icon={<ShoppingCartOutlined style={{paddingRight: '5px'}}/>} {...a11yProps(2)}
                                />
                                <StyledTab classes={{wrapper: classes.iconWrapper}} label="Swap"
                                     icon={<SwapHoriz style={{paddingRight: '5px'}}/>} {...a11yProps(3)}
                                />
                                <StyledTab classes={{wrapper: classes.iconWrapper}} label="Drop"
                                     icon={<RemoveCircleOutline style={{paddingRight: '5px'}}/>} {...a11yProps(4)}
                                />
                                <StyledTab classes={{wrapper: classes.iconWrapper}} label="Schedule"
                                     icon={<DateRange style={{paddingRight: '5px'}}/>} {...a11yProps(5)}
                                />
                            </Tabs>
                        </AppBar>
                    </Grid>
                    <Grid item style={{paddingTop: '9px'}}>
                        <Button ref={anchorRef} aria-controls={toggled ? 'options' : undefined} aria-haspopup="true"
                                onClick={handleToggleOn} variant='outlined'
                        >
                            <Grid container direction='row' justify='space-between' alignItems='center'>
                                <Grid item>Credit Courses</Grid>
                                <Grid item className={classes.expand}>{toggled ? <ExpandLess /> : <ExpandMore />}</Grid>
                            </Grid>
                        </Button>
                        <Popper open={toggled} anchorEl={anchorRef.current} role={undefined} transition>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleToggleOff}>
                                            <ButtonGroup autoFocusItem={toggled} id="options" onKeyDown={handleListKeyDown}>
                                                <Button>Non-Credit Courses</Button>
                                            </ButtonGroup>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>
                    <Grid item style={{paddingTop: '9px'}}>
                        <Button onClick={handleClick} variant='outlined'>
                            <Grid container direction='row' justify='space-between' alignItems='center'>
                                <Grid item>Winter 2021</Grid>
                                <Grid item className={classes.expand}>{open ? <ExpandLess /> : <ExpandMore />}</Grid>
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
                            <ButtonGroup orientation='vertical'>
                                <Button>Fall/Winter 2020-21</Button>
                                <Button>Winter 2021</Button>
                                <Button>Summer 2021</Button>
                                <Button>Fall 2021</Button>
                                <Button>Fall/Winter 2021-22</Button>
                                <Button>Winter 2022</Button>
                            </ButtonGroup>
                        </Popover>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <HomeView />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <AddView />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <CourseCartView />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <SwapView />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <DropView />
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <ScheduleView />
                </TabPanel>
            </div>
        </div>
    );
}
