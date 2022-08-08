import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FileContext } from '../context/fileContext';
import axios from 'axios';

export default function MultilineTextFields() {
 
  const [value1, setValue1] = React.useState('Nothing Compared Yet');
  const [value, setValue] = React.useState('Nothing Compared Yet');

  const { data,compare, loading, workingFiles, setFiles, setLoading, setWorkingFiles, setCompare} = React.useContext(FileContext);

 const handleChange = (e) => {
     setValue1(e.target.value);
     console.log(value1);
 }

  const handleRatio = async(e) => {
    console.log('ratio');
    e.preventDefault();
    
    const compareData =  await axios.get(`http://localhost:8080/file1/${workingFiles[0]}/word/${value1}`);

    setWorkingFiles([]);
  
    setValue(compareData.data?.numbers);
  }

  const handleCompare = async(e) => {
    e.preventDefault();
    
    const compareData =  await axios.get(`http://localhost:8080/file1/${workingFiles[0]}/file2/${workingFiles[1]}`);

    setWorkingFiles([]);

    setValue(compareData.data?.numbers);
  }


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, minWidth: '15rem', minHeight: '3rem' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      noValidate
      autoComplete="off"
    >
      {!compare && <div>
      <TextField
          id="outlined-textarea"
          label="Unesite text"
          placeholder="Text"
          multiline
          onChange={handleChange}
        />
      </div> }
      
      <Button variant="contained" color="secondary" style={{width: '7rem'}} onClick={compare ? handleCompare : handleRatio}>{compare ? 'Compare' : 'Ratio'}</Button>

      <h3>{value}</h3>
    </Box>
  );
}
