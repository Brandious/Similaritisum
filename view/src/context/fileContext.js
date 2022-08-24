import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

const FileContext = createContext();
const instance = axios.create({baseURL: process.env.REACT_APP_NODE_API, timeout: 30000});

  


const FileProvider = ({ children }) => {
    
    const [files, setFiles] = useState();
    const [loading ,setLoading] = useState(true);
    const [workingFiles, setWorkingFiles] = useState([]);
    const [compare, setCompare] = React.useState(true);
    const [errors, setErrors] = React.useState('');
    const [result, setResult] = React.useState();

    useEffect(() => {
       
        
        async function getFiles () {
           try{
            const res =  await instance.get('/files');
            
             setFiles(res);
           }
           catch(err)
           {
             setErrors(err);
           }
          }
       
     
      getFiles();
      setLoading(false);
      
     return () => setFiles([]);

    },[ setFiles, setLoading]);
    

    return (
      <FileContext.Provider value={{ ...files, workingFiles,errors,result, loading, compare, instance, setFiles, setLoading, setWorkingFiles, setCompare, setErrors, setResult }}>
        {children}
      </FileContext.Provider>
    );
  };





export  { FileContext, FileProvider };
