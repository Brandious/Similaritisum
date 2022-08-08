import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { FileContext } from '../context/fileContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AlignItemsList() {

    const { data, compare, loading, workingFiles, setFiles, setLoading, setWorkingFiles, setCompare } = React.useContext(FileContext);


    // const handleDeleteItem = () => {
    //    setWorkingFiles(workingFiles.splice(i))
    // }

  return (
    
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {workingFiles.map((el, i) => 
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={el}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {el}
              </Typography>
            </React.Fragment>
          }
        />

<IconButton aria-label="delete" size="large" onClick={() => setWorkingFiles(current => current.filter(el1 => el1 !== el))} >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
      </ListItem>)}
      <Divider variant="inset" component="li" />
    </List>
  );
}
