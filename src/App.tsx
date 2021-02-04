import React, { useRef, useState } from 'react';
import './App.css';
import SixSquares from './components/Templates/SixSquares';
import A4 from './components/Papers/A4';
import { Drawer } from '@material-ui/core';
import Toolbar from './components/Toolbar';

function App() {
  const [srcs, setSrcs] = useState(['https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
  'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGF3bnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80']);
  
  const paperRef= useRef<any>()

  const appRef = useRef<any>()

  const onClick= () =>{
    window.print()
  }


  return (
    <div className="App" ref={appRef}>
      <main className='printed-area'>
      <A4 className="center-content" rootRef={paperRef}>
        <SixSquares srcs={srcs} />
      </A4>
      </main>
      <Drawer classes={{ paper: 'drawer' }} variant="permanent" anchor="right">
        <Toolbar />
      </Drawer>
      <button onClick={onClick}>Print</button>
    </div>
  );
}

export default App;
