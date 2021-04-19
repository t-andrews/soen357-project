import { FormControl,MenuItem,Select,InputLabel } from "@material-ui/core";

export default function Dropdown() {
    return(
        <FormControl variant="outlined" style={{width:"40%",marginLeft:"40%", marginTop:"5%", marginBottom:"5%"}}>
        <InputLabel id="">Select from course cart</InputLabel>
        <Select
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>  
    );
}