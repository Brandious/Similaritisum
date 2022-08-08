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
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function VariantButtonGroup() {


  const { data, compare, loading, workingFiles, setFiles, setLoading, setWorkingFiles, setCompare } = React.useContext(FileContext);
  const [file, setFile] = React.useState('');

  const handleTypeChange = () => {

    setCompare(!compare);
  }

  const handleUploadFile = async (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setLoading(true);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    const upload = await axios.post('http://localhost:3000/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    console.log(upload);

    const getData = await axios.get('http://localhost:3000/files');
    setFiles(getData);
    setLoading(false);


  }

  const handleGetFiles = async (e) => {
    e.preventDefault();
    setLoading(true);
    const getData = await axios.get('http://localhost:3000/files');
    setFiles(getData);
    setLoading(false);

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
        <Button variant="contained" component="label"  style={{width: '7rem'}} onChange={handleUploadFile}>
          Upload
          <input hidden accept="*" multiple type="file" />
        </Button>

        <Button variant="contained" color="success" style={{width: '7rem'}} onClick={handleGetFiles}>Refresh</Button>
      </div>

      {loading ? <p>Loading...</p> :
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
