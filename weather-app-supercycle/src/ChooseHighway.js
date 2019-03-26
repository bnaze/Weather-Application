import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import highwayWeather from './Weather';

import s from "./images/stratford.png";
import m from "./images/merton.png";
import t from "./images/tottenham.png";

class ChooseHighway extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
      <Route path="/highwayweather/:id" component={highwayWeather}/>
        <div className= {localStorage.getItem("wallpaper")}>
          <div className= "header">
            <div className= "city"> Superhighways </div>
            <div className = "darkbox">
            <Link to={`highwayweather/s2a`} style={{color:'white'}}>
            <div className= "stratford"><img src={s} alt = "" width='220' height='175' />
            <div className = "s2a"> Stratford <br/> to<br/> Aldgate</div></div>
            </Link>
            </div>
            <div className = "darkbox">
            <Link to={`highwayweather/m2c`} style={{color:'white'}}>
            <div className= "merton"><img src={m} alt = "" width='220' height='175'/>
            <div className = "m2c"> Merton <br/> to<br/> City</div></div>
            </Link>
            </div>
            <div className = "darkbox">
            <Link to={`highwayweather/t2l`} style={{color:'white'}}>
            <div className= "tottenham"><img src={t} alt = "" width='220' height='175' />
            <div className = "t2l"> Tottenham <br/>to<br/> Liverpool<br/> Street </div></div>
            </Link>
            </div>
          </div>
        </div>
      </Switch>
      </BrowserRouter>
    );
  }
}

export default ChooseHighway;
