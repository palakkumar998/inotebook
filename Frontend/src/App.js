import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import { Navbar } from './Components/Navbar';
import { Home } from './Components/Home';
import { About } from './Components/About';
import NoteState from './Context/notes/NoteState';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Alert from "./Components/Alert";
import { useState } from 'react';


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    < >
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Route exact path="/">
              <Home showAlert ={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
