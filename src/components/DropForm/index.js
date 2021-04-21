import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    },
  },
  course_name:{
    fontWeight: "900"
  },
  small:{
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
    button: {
        backgroundColor: '#912338',
        float: "right",
        marginBottom: "10px",
        color: 'white',
        '&:hover': {
            backgroundColor: '#a4283f'
        }
    },
  box1: {
      borderBottom: ' 2px solid #912338 '
  }
});

export default function DropForm(props) {
    const heading = props.heading
    const classes = useRowStyles();
    const rows = [{name:"a course",message:" Success "},{name:"a course",message:" Success "},{name:"a course",message:" Success "}]
    return null;
}
