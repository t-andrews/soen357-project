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

export default function DropForm(props) {
    const heading = props.heading
    const classes = useRowStyles();
    const rows = [{name:"a course",message:" Success "},{name:"a course",message:" Success "},{name:"a course",message:" Success "}]
    return (
        <fieldset className={classes.small}>
            <legend className={classes.bigRed}>
                {heading}
            </legend>
            <table className={classes.box1} style={{width:"100%"}}>
              <tr>
                <td>
                  <Box className={classes.boxH1}>Reviewing</Box>
                </td>
              </tr>
              <tr>
                <td style={{  textAlign:"left", paddingLeft:"15px"}}><strong>Course(s) that will be dropped</strong></td>
              </tr>
              <tr>
                <td style={{  textAlign:"left", paddingLeft:"25px"}} >Sample 1</td>
              </tr>
              <tr>
                <td style={{  textAlign:"left", paddingLeft:"25px"}} >Sample 2</td>
              </tr>
              <Button variant="contained" color="secondary" style={{marginRight:"-80%",marginTop:"2%",marginBottom:"2%"}}>
                Confirm
              </Button>
            </table>
            <Box>
              <h3 style={{marginLeft:"20px", alignContent:"left",width:"120px"}}>Summary</h3>
              <table style={{marginLeft:"5%", alignContent:"left",width:"90%"}}>
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