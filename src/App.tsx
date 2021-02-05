import React, { useContext, useRef, useState } from 'react';
import './App.css';
import SixSquares from './components/Templates/SixSquares';
import A4 from './components/Papers/A4';
import { Drawer } from '@material-ui/core';
import Toolbar from './components/Toolbar';
import { ImageContext } from './hoc/ImageProvider';

function App() {
  
  const paperRef= useRef<any>()

  const appRef = useRef<any>()

  const onClick= () =>{
    window.print()
  }

  const { croppableImages, uploadFiles } = useContext(ImageContext);

  return (
    <div className="App" ref={appRef}>
      <main className='printed-area'>
      <A4 className="center-content" rootRef={paperRef}>
        <SixSquares croppableImages={croppableImages} />
      </A4>
      </main>
      <Drawer classes={{ paper: 'drawer' }} variant="permanent" anchor="right">
        <Toolbar onUpload={uploadFiles} />
      </Drawer>
      <button onClick={onClick}>Print</button>
    </div>
  );
}

export default App;
