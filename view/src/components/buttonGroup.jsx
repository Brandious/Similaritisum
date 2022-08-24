import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { FileContext } from '../context/fileContext';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function VariantButtonGroup() {


  const { errors, data, compare, loading, instance, setFiles, setWorkingFiles, setCompare, setResult } = React.useContext(FileContext);
   
  const [currLoading, setCurrLoading] = React.useState(loading);
  const [currErrors, setCurrErrors] = React.useState(errors);

  const handleTypeChange = () => {
    setCurrErrors('');
    setCurrLoading(false);
    setCompare(!compare);
    setResult('');
  }


  const handleUploadFile = async (e) => {
    try {
      e.preventDefault();

      setCurrLoading(true);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      const upload = await instance.post('/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });


      const getData = await instance.get('/files');
      setFiles(getData);
      if (upload.data.status === true) setCurrLoading(false);
    }
    catch (err) {

      setCurrErrors(err.response.data.error);
      setCurrLoading(false);
      // console.log(err.response.data.error);
    }

  }

  const handleGetFiles = async (e) => {
    try {
      e.preventDefault();
      setCurrLoading(true);
      setCurrErrors('');
      const getData = await instance.get('/files');
      setFiles(getData);
      setCurrLoading(false);
    } catch (err) {

      setCurrErrors(err.response.data.error);
      setCurrLoading(false);
      // console.log(err.response.data.error);
    }
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& > *': {
          m: 1,

        },
      }}
    >
      <div>

        <Button variant="contained" component="label" style={{ width: '7rem' }} onChange={handleUploadFile} >
          Upload
          <input hidden accept="*" multiple type="file" />
        </Button>


        <Button variant="contained" color="success" style={{ width: '7rem' }} onClick={handleGetFiles}>Refresh</Button>
      </div>

      {currErrors ? <h4>{currErrors}</h4> : currLoading ?  <CircularProgress /> :
        <div>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={4}
            className="FileRow"
          >
            {data && data?.data.map((el, i) => <Item key={i} as={Button} onClick={() => setWorkingFiles((prevState) => [...prevState, el])}>{el}</Item>)}
          </Stack>
        </div>}
      <FormControlLabel control={<Switch defaultChecked />} label={compare ? 'Compare' : 'Ratio'} onChange={handleTypeChange} />

    </Box>
  );
}
