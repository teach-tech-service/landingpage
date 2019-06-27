import React from 'react';
import './App.css';
import JoinIn from './components/Form/JoinIn';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default function App() {
  return (
    <Container component="main" maxWidth="sm">
      <header className="App-header">
        <img src="/images/tts-main.png" alt="logo" className="App-img" />
        <h2 className="App-title"> Kurs Google Maps API</h2>
      </header>
      <CssBaseline />
      <div >
        <JoinIn />
      </div >
    </Container >
  );
}
