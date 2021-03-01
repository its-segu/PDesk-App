import './App.css';
import SimpleContainer from './components/Appointments'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from './components/NavBar';
import RescheduleDialog from './components/RescheduleDialog';
import { useState, useEffect} from "react";
import React from 'react';
import ConfirmedApp from './components/ConfirmedApp'

function App() {
  const [confirmScreen, setConfirmScreen] = useState(false)

  const confirmedView = () => {
    setConfirmScreen(!confirmScreen)
  }

  return (
    <div className="App">
    <NavBar confirmedView={() => confirmedView()} load={confirmScreen} />
    <header className="App-header">
    <Container maxWidth="lg">
    <RescheduleDialog/>
    {confirmScreen ?
      <React.Fragment>
      <h2 className="header-title">Confirmed Appointments(Soonest - Furthest Out)</h2>
      <div className="container">
      <ConfirmedApp/>
      </div>
      </React.Fragment>
      :
      <React.Fragment>
      <h2 className="header-title">Appointments(Most Pending - Least Pending)</h2>
      <div className="container">
      <SimpleContainer  />
      </div>
      </React.Fragment>
    }
    </Container>
    </header>
    </div>
  );
}

export default App;
