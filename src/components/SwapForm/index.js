import React, {useEffect} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextInput from "../textInput";
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dropdown from "../dropdown";
import * as Service from "../../services/service";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    },
  },
  course_name:{
    fontWeight: "700",
    fontSize: ""
  },
  small:{
      width:"",
      border: '2px solid #912338',
      borderRadius: '5px!important'
  },
  bigRed:{
    fontSize:"25px",
    color: "#912338",
    fontWeight:"bold",
    fontFamily:"-webkit-pictograph"
  },
  boxH1:{
    textAlign:"left",
    borderLeft: '2px solid #912338',
    color: "#912338",
    padding: "10px",
    fontSize: "1.2rem"
  },
  container:{
    width: "50%"
  },
  option:{
    width: "50%",
    height: "50px",
    fontFamily:"Arial",
    padding: "3rem"
  },
  box1:{
    borderBottom: ' 2px solid #912338 '
  },
  button: {
    backgroundColor: '#912338',
    float: "right",
    marginBottom: "10px",
    marginRight:"-140%",
    color: 'white',
    '&:hover': {
        backgroundColor: '#a4283f'
    }}
});

export default function SwapForm(props) {
    const courses  = props.courses;
    const cart = props.cart;
    const [courseToAdd,setcourseToAdd]  = React.useState(null);
    const [courseToDrop, setcourseToDrop] = React.useState(null);
    const [confirm, setConfirm] = React.useState(false);
    const [confirmAdd, setConfirmAdd] = React.useState(null);
    const [confirmDrop, setConfirmDrop] = React.useState(null);
    const heading = props.heading
    const classes = useRowStyles();
    const rows = []

    useEffect(() => {
      window.addEventListener("drop",(event)=>{
        const val = event.detail == "" ? null : event.detail
        setcourseToDrop(val);
      })
      return () => {
        window.removeEventListener("drop",(event)=>{
        
        })
      }
    })
    
    useEffect(() => {
      window.addEventListener("add",(event)=>{
        const val = event.detail == "" ? null : event.detail
        setcourseToAdd(val);
      })
      return () => {
        window.removeEventListener("add",(event)=>{
          
        })
      }
    })

    const handleConfirm = (courseToAdd,courseToDrop) => {
      // set confirm
      setConfirmAdd(courseToAdd)
      setConfirmDrop(courseToDrop)
      //reset value
      setcourseToAdd(null)
      setcourseToDrop(null)
      Service.swap(courseToAdd, courseToDrop)
      setConfirm(true)
      window.dispatchEvent(new Event("swap"))
    }

    return (
        <fieldset className={classes.small} style={{marginTop:"30px"}}>
            <legend className={classes.bigRed}>
                {heading}
            </legend>
            <table className={classes.box1} style={{ alignContent:"center",width:"100%"}}>
              <tr>
                <td>
                  <Box className={classes.boxH1}>Select classes to swap</Box>
                </td>
              </tr>
              <tr>
                <td> <Dropdown type = "drop" label="Choose from course list" options={courses}/></td>
                <td></td>
                <td>
                <Box>
                  <span><strong>Search for a class</strong></span>
                  <TextInput/>
                </Box>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <span style={{width:20}}><strong>WITH</strong> </span>
                </td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td><strong>OR</strong></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>
                <Dropdown type = "add" label = "Choose from course cart" options={cart ? cart :null}/>
                </td>
              </tr>
            </table>

            <Box style={{borderBottom: ' 2px solid #912338 '}}>
              <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Confirmation</h3>
              <table style={{marginLeft:"5%", alignContent:"center",width:"90%"}}>
                <tr>
                  <th>Swap This Class</th>
                    <th></th>
                    <th>With This Class</th>
                  </tr>
                <tr>
                  <td> {courseToDrop ? courseToDrop.uniqueName : ""} </td>
                  <td>
                  <IconButton>
                    <SwapHorizontalCircleIcon />
                  </IconButton> 
                  </td>
                  <td> {courseToAdd ? courseToAdd.uniqueName : ""} </td>
                </tr>
                            <Button className ={classes.button} disabled={courseToAdd == null || courseToDrop == null} 
              onClick={ () => handleConfirm(courseToAdd,courseToDrop)} 
              variant="contained" 
              >
                Confirm
              </Button>
              </table>
            </Box>
            {confirm ? 
              <Box>
                <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Summary</h3>
                <table style={{marginLeft:"5%", alignContent:"center",width:"90%"}}>
                  <tr>
                    <th>{confirmDrop.uniqueName}</th>
                    <td>Dropped successfully</td>
                  </tr>
                  <tr>
                    <th>{confirmAdd.uniqueName}</th>
                    <td>Enrolled successfully</td>
                  </tr>
                </table>
            </Box> :
            null
            }
        </fieldset>
    );
}