import { FormControl,MenuItem,Select,InputLabel } from "@material-ui/core";

export default function Dropdown(props) {
    const data = props
    return(
        <FormControl variant="outlined" style={{width:"80%",marginLeft:"auto", marginRight:"auto", marginTop:"5%", marginBottom:"5%"}}>
          <InputLabel id="">{data.label}</InputLabel>
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              data.options.map( (option) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))
            }
          </Select>
      </FormControl>  
    );
}