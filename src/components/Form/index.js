import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from '@material-ui/core/TextField';
import TextInput from "../../components/textInput";
import Paper from '@material-ui/core/Paper';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dropdown from "../../components/dropdown";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    },
  },
  course_name:{
    fontWeight: "900",
    fontSize: ""
  },
  small:{
      width:"",
      border: '2px solid #912338',
      borderRadius: '5px!important'
  },
  bigRed:{
    fontSize:"Large",
    color: "#912338",
    fontWeight:"bold"
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
  }
});

export default function Form() {
    const classes = useRowStyles();
    const rows = [{name:"a course",message:" Success "},{name:"a course",message:" Success "},{name:"a course",message:" Success "}]
    return (
        <fieldset className={classes.small}>
            <legend className={classes.bigRed}>
                Some word
            </legend>
            <Box className={classes.box1}>
              <Box display="flex" flexDirection="row">
                <Box className={classes.container} >
                  <Box className={classes.boxH1}>Select classes to swap</Box>
                  <Box className={classes.container}>
                  <Paper component="select" >
                      <Paper component="option" ></Paper>
                      <option> Swap this class</option>
                      <option> COMP 123 - INTRO</option>
                      <option> 1 </option>
                      <option> 1 </option>
                  </Paper>
                  </Box>
                </Box>
                <Box>
                  <span><strong>Search for a class</strong></span>
                  <br/>
                  <TextInput/>
                </Box>
              </Box>
              <Box style={{width:"100px",marginLeft:"30%"}}>
                <strong>WITH</strong>
              </Box>
              <Box style={{width:"100px",marginLeft:"60%"}}>
                <strong>OR</strong>
              </Box>
              <Dropdown m={3} className={classes.option}/>
            </Box>
            <Box style={{borderBottom: ' 2px solid #912338 '}}>
              <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Confirmation</h3>
              <table style={{marginLeft:"5%", alignContent:"center",width:"90%"}}>
                <tr>
                  <th>Swap This Class</th>
                    <th></th>
                    <th>With This Class</th>
                  </tr>
                <tr>
                  <td>COMP 223 S -Databases </td>
                  <td>
                  <IconButton>
                    <SwapHorizontalCircleIcon />
                  </IconButton> 
                  </td>
                  <td>SOEN 357 U - UI Design</td>
                </tr>
              </table>
              <Button variant="contained" color="secondary" style={{marginRight:"-80%",marginTop:"2%",marginBottom:"2%"}}>
                Confirm
              </Button>
            </Box>
            <Box>
              <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Summary</h3>
              <table style={{marginLeft:"5%", alignContent:"center",width:"90%"}}>
              {rows.map((row) => (
                <tr>
                  <th>{row.name}</th>
                  <td>{row.message}</td>
                </tr>
          ))}
              </table>
            </Box>
        </fieldset>
    );
}