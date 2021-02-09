import React, { useContext, useRef, useState } from 'react';
import './App.css';
import SixSquares from './components/Templates/SixSquares';
import A4 from './components/Papers/A4';
import { Drawer } from '@material-ui/core';
import EditSection from './components/EditSection';
import { ImageContext } from './hoc/ImageProvider';
import useStyles from './AppStyles';

function App() {
  const paperRef= useRef<any>();
  const appRef = useRef<any>();
  const classes = useStyles();
  const { croppableImages, uploadFiles, onClear } = useContext(ImageContext);
  return (
    <div className={classes.Root} ref={appRef}>
      <main className={classes.Main}>
        <A4 className='center-content' rootRef={paperRef}>
          <SixSquares croppableImages={croppableImages} />
        </A4>
      </main>
      <Drawer classes={{ paper: classes.Drawer }} variant="permanent" anchor="right">
        <EditSection 
          onUpload={uploadFiles} 
          loaded={!!croppableImages.length} 
          onClear={onClear} 
          amount={6}
          />
      </Drawer>
    </div>
  );
}

export default App;
