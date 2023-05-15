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


function App() {
  return (
    < >
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
