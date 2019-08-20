import React from 'react';
import './App.css';
import Home from './Home.js';
import PPTGen from './pptGen.js';
import DataComponent from './DataComponent.js';
//import mtbcLogo from './images/MTBC_logo.png';
//import mtplLogo from './images/MTPL_logo.png';
//<img src={mtbcLogo} className="MTBC-logo" alt="MTBC" />
//<img src={mtplLogo} className="MTPL-logo" alt="MTPL" />

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div>
      <Link to="/">
        <button>home</button>
      </Link>
      <Link to="/ppt">
        <button>PPT Generator</button>
      </Link>
      <Link to="/auction">
        <button>Auction</button>
      </Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <header className="App-header">
        <span>Welcome to MTPL 2019 </span>
        <span>< MainMenu /> </span>
      </header>
      <div>
        <Route exact path="/" component={Home} />
        <Route exaxt path="/ppt" component={PPTGen} />
        <Route exact path="/auction" component={DataComponent} />
      </div>
    </Router>
  );
}

export default App;
