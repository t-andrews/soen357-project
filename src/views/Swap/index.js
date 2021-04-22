import React,{useEffect} from 'react';
import {makeStyles, styled} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import CourseCard from "../../components/CourseCard";
import SwapForm from "../../components/SwapForm";
import * as Service from "../../services/service";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #912338',
        borderRadius: '5px!important',
        minHeight: '700px',
        padding: '10px'
    },
    card:{
        width: '100%',
        margin: '30px'
    },
    form:{
        width: '100%',
    },
    title: {
        color: '#912338',
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: 'x-large',
        marginBottom: '30px',
        marginTop: '-30px',
        marginLeft: "-20px"
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
    const [courses, setCourses] = React.useState(Service.getEnrolledCourses());
    const classes = useStyles();
    const [toggled] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [cart, setCart] = React.useState(Service.getCourseCart());
    const prevOpen = React.useRef(toggled);
    useEffect(() => {
        window.addEventListener("swap",(event)=>{
            const db = Service.getDb();
            setCourses(db.register);
            setCart(db.courseCart);
        })
        return () => {
          window.removeEventListener("swap",(event)=>{

          })
        }
      })

    React.useEffect(() => {
        if (prevOpen.current && !toggled) {
            anchorRef.current.focus();
        }
        prevOpen.current = toggled;
    }, [toggled]);

    return (
        <div>
            <div className={classes.root}>
                <Box display="flex" flexDirection="row" >
                    <Box className={classes.card}>
                    <Typography className={classes.title}>Course Swap</Typography>
                    {
                            courses.length === 0 ?
                                <h3>You are not enrolled to any classes this semester</h3>
                                : courses.map(c => {
                                return (
                                    <div style={{marginBottom: "10px", display: "inline-flex", width: "100%"}} >
                                        <CourseCard course={c}/>
                                    </div>
                                )
                            })
                    }
                    </Box>
                    <Box m={1} p={1} className={classes.form}>
                        <SwapForm cart = {cart} courses = {courses} heading="Swap"/>
                    </Box>
                </Box>
            </div>
        </div>
    );
}
