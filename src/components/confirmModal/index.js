import { makeStyles } from "@material-ui/core/styles";

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
      width:""
  }
});

export default function Form() {
    const classes = useRowStyles();
    
    return (
        <fieldset>
            <legend>
                Some word
            </legend>
            <label>
                Select classes to swap
            </label>
            <br/>
            <select>
                <option>1</option>
                <option>1</option>
                <option>1</option>
            </select>
        </fieldset>
    );
}