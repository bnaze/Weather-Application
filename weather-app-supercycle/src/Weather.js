import React, { Component } from "react";
import "./App.css";

import WeatherSTA from './WeatherSTA';
import WeatherMTC from './WeatherMTC';
import WeatherTTL from './WeatherTTL';

class Weather extends Component {
  render() {
    const {id} = this.props.match.params;
    if (id === "s2a") {
      return (<WeatherSTA />);
    } else if (id === "m2c") {
      return (<WeatherMTC />);
    } else {
      return (<WeatherTTL />);
    }
  }
}

export default Weather;
