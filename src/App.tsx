import React, { useContext, useRef } from 'react';
import './App.css';
import SixSquares from './components/Templates/SixSquares';
import A4 from './components/Papers/A4';
import { Drawer, Fab, Theme, useMediaQuery } from '@material-ui/core';
import EditSection from './components/EditSection';
import { ImageContext } from './hoc/ImageProvider';
import useStyles from './AppStyles';
import ZoomWrapper from './components/ZoomWrapper';
import { useToggleable } from './utils/hooks/togglables';
import { Menu } from '@material-ui/icons';
import ImageDropZone from './hoc/ImageDropZone';

function App() {
  const paperRef= useRef<any>();
  const appRef = useRef<any>();
  const classes = useStyles();
  const [drawerOpen, toggleDrawer] = useToggleable(false);
  const { croppableImages, uploadFiles, onClear } = useContext(ImageContext);
  const smallScreen = useMediaQuery((theme: Theme)=> theme.breakpoints.down('sm'))
  return (
    <ImageDropZone onDrop={uploadFiles}>
      <div className={classes.Root} ref={appRef}>
        <Fab className={classes.DrawerFab} size='small' color='primary' onClick={toggleDrawer}>
          <Menu />
        </Fab>
        <main className={classes.Main}>
          <ZoomWrapper>
            <A4 className='center-content' rootRef={paperRef}>
              <SixSquares croppableImages={croppableImages} />
            </A4>
          </ZoomWrapper>
        </main>
        <Drawer className={classes.DrawerWrapper} onClose={toggleDrawer} open={drawerOpen} classes={{ paper: classes.Drawer }} variant={smallScreen? "temporary" : "permanent"} anchor="right">
          <EditSection 
            onUpload={uploadFiles} 
            loaded={!!croppableImages.length} 
            onClear={onClear} 
            amount={6}
            />
        </Drawer>
      </div>
    </ImageDropZone>
  );
}

export default App;
