import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import combinedReducer from './redux/reducer/combinedReducer';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  }
});

const store = configureStore({
  reducer: combinedReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
