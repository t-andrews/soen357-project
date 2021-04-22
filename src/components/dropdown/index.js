import { FormControl,MenuItem,Select,InputLabel } from "@material-ui/core";

export default function Dropdown(props) {
    const options = props.options ?? ["Empty cart"]
    const type = props.type
    const handleChange = (event) => {
      window.dispatchEvent(new CustomEvent(type, {detail:event.target.value}))
    };

    return(
        <FormControl variant="outlined" style={{width:"90%",marginLeft:"auto", marginRight:"auto", marginTop:"5%", marginBottom:"5%"}}>
          <InputLabel id="">{props.label}</InputLabel>
          <Select onChange={ e => handleChange(e)}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              options.map( (option) => (
                <MenuItem value={option}>{option.uniqueName}</MenuItem>
              ))
            }
          </Select>
      </FormControl>  
    );
}
