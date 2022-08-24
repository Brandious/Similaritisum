import React from 'react';
import './App.css';
import ButtonGroup from './components/buttonGroup';
import TextField from './components/textField';
import List from './components/list';

import { FileContext } from './context/fileContext';

function App() {
  const { workingFiles } = React.useContext(FileContext);

  return (
    <div className="App">
        
        <h1>Similar<strong style={{fontWeight: 1000}}>IPSUM</strong></h1>

        <div className="Buttons">
          <ButtonGroup/>
        </div>
        
        <div className="Form">
          {workingFiles.length !== 0 && <List />}
          <TextField />
        </div>
        
    </div>
  );
}

export default App;
