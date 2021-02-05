import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ImageProvider from './hoc/ImageProvider';
import AppContextMenu from './hoc/AppContextMenu';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme/default';

ReactDOM.render(
  <React.StrictMode>
    <ImageProvider>
      <ThemeProvider theme={theme}>
      <AppContextMenu>
      <App />
      </AppContextMenu>
      </ThemeProvider>
    </ImageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
