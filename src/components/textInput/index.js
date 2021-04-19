import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.4rem",
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function TextInput() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>  
        <InputBase
            className={classes.input}
            placeholder="Search for a class"
            inputProps={{ 'aria-label': 'Search for a class' }}
        />
    </Paper>
  );
}
