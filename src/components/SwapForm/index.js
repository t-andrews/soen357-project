import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextInput from "../textInput";
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dropdown from "../dropdown";

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
  }
});

export default function SwapForm(props) {
    const heading = props.heading
    const classes = useRowStyles();
    const rows = [{name:"a course",message:" Success "},{name:"a course",message:" Success "},{name:"a course",message:" Success "}]
    return (
        <fieldset className={classes.small}>
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
                <td> <Dropdown label="Choose from course list" options={["Course 1","Course 2","Course 3"]}/></td>
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
                <Dropdown label = "Choose from course cart" options={["Course 1","Course 2","Course 3"]}/>
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
                  <td>COMP 223 S -Databases </td>
                  <td>
                  <IconButton>
                    <SwapHorizontalCircleIcon />
                  </IconButton> 
                  </td>
                  <td>SOEN 357 U - UI Design</td>
                </tr>
              </table>
              <Button variant="contained" style={{color:"white",backgroundColor:"#912338",marginRight:"-80%",marginTop:"2%",marginBottom:"2%"}}>
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