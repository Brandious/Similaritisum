import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FileContext } from '../context/fileContext';

export default function MultilineTextFields() {

  const [word, setWord] = React.useState('');


  const { errors, loading,result, compare, workingFiles, instance,  setWorkingFiles,  setResult, setLoading } = React.useContext(FileContext);

  const [currLoading, setCurrLoading] = React.useState(loading);
  const [currErrors, setCurrErrors] = React.useState(errors);


  const handleChange = (e) => {
    setWord(e.target.value);

  }

  const handleRatio = async (e) => {
    try {
      e.preventDefault();
      setCurrErrors('');
      const compareData = await instance.get(`/compareOne?filename1=${workingFiles[0]}&word=${word}`);
      setResult(compareData.data?.numbers);
      setWorkingFiles([]);
    } catch (err) {

      setCurrErrors(err.response.data.error);
      setCurrLoading(false);
      // console.log(err.response.data.error);
    }

  }

  const handleCompare = async (e) => {
    try {
      e.preventDefault();
      setCurrLoading(true);
      setCurrErrors('');
      const compareData = await instance.get(`/compare?filename1=${workingFiles[0]}&filename2=${workingFiles[1]}`);
      setResult(compareData.data?.numbers);
      setWorkingFiles([]);
      if (compareData.data.status === true) {setCurrLoading(false); setLoading(false)}
    }
    catch (err) {
      setCurrErrors(err.response.data.error);
      setCurrLoading(false);
      // console.log(err.response.data.error);
    }
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
      </div>}

      <Button variant="contained" color="secondary" style={{ width: '7rem' }} onClick={compare ? handleCompare : handleRatio}>{compare ? 'Compare' : 'Ratio'}</Button>

      {currErrors ? <h3>{currErrors}</h3> : currLoading ? <CircularProgress /> : <h3>{result}</h3>}
    </Box>
  );
}
