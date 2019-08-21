import React from 'react';
import './App.css';
import mtplLogo from './images/MTPL_logo.png';
import mtbcLogo from './images/MTBC_logo.png';
import bawarchi_knights from './images/teamLogos/bawarchi_knights.jpeg';
import centaurs from './images/teamLogos/centaurs.jpeg';
import desi_blasters from './images/teamLogos/desi_blasters.jpeg';
import faujxi from './images/teamLogos/faujxi.jpeg';
import fiery_objects from './images/teamLogos/fiery_objects.jpeg';
import gritty_gijjus from './images/teamLogos/gritty_gijjus.jpeg';
import ips from './images/teamLogos/india_spice_house.jpeg';
import mn_master_blasters from './images/teamLogos/mn_master_blasters.jpeg';
import sholay11 from './images/teamLogos/sholay11.jpeg';
import tech_digital_warriors from './images/teamLogos/tech_digital_warriors.jpeg';
import tf_cricket from './images/teamLogos/tf_cricket.jpeg';
import pirates from './images/teamLogos/pirates.jpeg';

import { Link } from 'react-router-dom';

function Home() {

  return (
    <div >
      <div>
        <div>
          <h1><center><img src={mtplLogo} className="logoImage" /> Welcome to MTPL Auction <img src={mtbcLogo} className="logoImage" /></center></h1>
        </div>
        <div class="button_cont" align="center">
          <Link to='/auction/mens' >
            <a class="example_e" href="add-website-here" target="_blank" rel="nofollow noopener">
              Men's
            </a>
          </Link>
          <span>
            &nbsp;&nbsp;
          </span>
          <Link to='/auction/womens' >
            <a class="example_e" href="add-website-here" target="_blank" rel="nofollow noopener">
              Women's
            </a>
          </Link>
        </div>
        <div>
          <span></span>
          <span><h1><center>Tournament Date: 2019 Sept 14, 15, 21, 22</center></h1></span>
          <span></span>
        </div>
        <div class="logosTable" >
          <div class="divTableBody">
            <div class="divTableRow">
              <div class="logoTableCell"><center><img src={bawarchi_knights} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={centaurs} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={desi_blasters} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={faujxi} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={fiery_objects} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={gritty_gijjus} className="logoImage" /></center></div>
            </div>
            <div class="divTableRow">
              <div class="logoTableCell"><center><img src={ips} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={mn_master_blasters} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={sholay11} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={tech_digital_warriors} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={tf_cricket} className="logoImage" /></center></div>
              <div class="logoTableCell"><center><img src={pirates} className="logoImage" /></center></div>
            </div>
          </div>
        </div>
    </div>
    </div >
  )
};

export default Home;