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
    <div class="button_cont" align="center">
      <Link to="/">
        <a class="example_e" href="add-website-here" target="_blank" rel="nofollow noopener">
          Home
            </a>
      </Link>
      <Link to="/ppt">
        <a class="example_e" href="add-website-here" target="_blank" rel="nofollow noopener">
          Player Profile Generator
            </a>
      </Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <header className="App-header">
        <span>< MainMenu /> </span>
      </header>
      <div>
        <Route exact path="/" component={Home} />
        <Route exaxt path="/ppt" component={PPTGen} />
        <Route exact path="/auction/:id" component={DataComponent} />
      </div>
    </Router>
  );
}

export default App;
