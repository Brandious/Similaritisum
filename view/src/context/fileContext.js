import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

const FileContext = createContext();


const FileProvider = ({ children }) => {
    
    const [files, setFiles] = useState();
    const [loading ,setLoading] = useState(true);
    const [workingFiles, setWorkingFiles] = useState([]);
    const [compare, setCompare] = React.useState(true);


    useEffect(() => {
       
        
        async function getFiles () {
          
            const data =  await axios.get('http://localhost:3000/files');
            setFiles(data);
            
          }
       
     
      getFiles();
      setLoading(false);

     return () => [];
    },[setFiles, setLoading]);
    

    return (
      <FileContext.Provider value={{ ...files, workingFiles, loading,compare, setFiles, setLoading, setWorkingFiles, setCompare }}>
        {children}
      </FileContext.Provider>
    );
  };


  const withFiles = (Child) => (props) => (
    <FileContext.Consumer>
      {(context) => <Child {...props} {...context} />}
      {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
    </FileContext.Consumer>
  );



export  {FileContext, FileProvider, withFiles};
