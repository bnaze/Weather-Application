import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import "./App.css";
import App from "./App";

import atmosphereIcon from './icons/Atmosphere.png';
import cloudIcon from './icons/Cloud.png';
import rainIcon from './icons/Rain.png';
import snowIcon from './icons/Snow.png';
import sunIcon from './icons/Sun.png';
import thunderIcon from './icons/Thunder.png';

const API_EC3N = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=ec3n,gb';
const API_E1 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=e1,gb';
const API_E3 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=e3,gb';
const API_E15 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=e15,gb';

class WeatherSTA extends Component {
  state = {
    temp_ec3n: [],
    icon_ec3n: [],
    time_ec3n: [],

    temp_e1: [],
    icon_e1: [],
    time_e1: [],

    temp_e3: [],
    icon_e3: [],
    time_e3: [],

    temp_e15: [],
    icon_e15: [],
    time_e15: [],
  }

  // Converts the weather IDs to appropriate weather icons
  getIcon(id) {
    if (id >= 200 && id <= 232) {
      return thunderIcon;
    } else if (id >= 300 && id <= 531) {
      return rainIcon;
    } else if (id >= 600 && id <= 622) {
      return snowIcon;
    } else if (id >= 701 && id <= 781) {
      return atmosphereIcon;
    } else if (id === 800) {
      return sunIcon;
    } else if (id >= 801 && id <= 804) {
      return cloudIcon;
    }
  }

  // Extracts the hour from a full datetime variable
  getTime(time) {
    var timeSplit = time.split('');
    var timeHour = timeSplit.slice(11,16)
    return timeHour;
  }

  // Mounting the getWeatherMTC() method straight away so that it executes
  // and presents an output without any user input.
  // _handleDoubeClickItem enables double-clicking to navigate back from
  // highway pages
  componentDidMount() {
    this.getWeatherSTA();
    this._handleDoubeClickItem = this._handleDoubeClickItem.bind(this);
  }

  _handleDoubeClickItem(event) {
    this.props.history.goBack();
    console.log("I got double clicked!")
  }

  // Rounds the temperature and affixes a celsius symbol
  printTemp(temp) {
    var sanitisedTemp = Math.round(temp) + "°C";
    return sanitisedTemp;
  }

  // API data fetch from OpenWeatherMap to retrieve weather information
  getWeatherSTA = async () => {
    const api_call_ec3n = await fetch(API_EC3N);
    const data_ec3n = await api_call_ec3n.json();

    const api_call_e1 = await fetch(API_E1);
    const data_e1 = await api_call_e1.json();

    const api_call_e3 = await fetch(API_E3);
    const data_e3 = await api_call_e3.json();

    const api_call_e15 = await fetch(API_E15);
    const data_e15 = await api_call_e15.json();

    // Setting the states for various weather attributes
    this.setState({
      temp_ec3n: [
        this.printTemp(data_ec3n.list[0].main.temp),
        this.printTemp(data_ec3n.list[1].main.temp),
        this.printTemp(data_ec3n.list[2].main.temp)
      ],
      icon_ec3n: [
        this.getIcon(data_ec3n.list[0].weather[0].id),
        this.getIcon(data_ec3n.list[1].weather[0].id),
        this.getIcon(data_ec3n.list[2].weather[0].id)
      ],
      time_ec3n: [
        this.getTime(data_ec3n.list[0].dt_txt),
        this.getTime(data_ec3n.list[1].dt_txt),
        this.getTime(data_ec3n.list[2].dt_txt)
      ],

      temp_e1: [
        this.printTemp(data_e1.list[0].main.temp),
        this.printTemp(data_e1.list[1].main.temp),
        this.printTemp(data_e1.list[2].main.temp)
      ],
      icon_e1: [
        this.getIcon(data_e1.list[0].weather[0].id),
        this.getIcon(data_e1.list[1].weather[0].id),
        this.getIcon(data_e1.list[2].weather[0].id)
      ],
      time_e1: [
        this.getTime(data_e1.list[0].dt_txt),
        this.getTime(data_e1.list[1].dt_txt),
        this.getTime(data_e1.list[2].dt_txt)
      ],

      temp_e3: [
        this.printTemp(data_e3.list[0].main.temp),
        this.printTemp(data_e3.list[1].main.temp),
        this.printTemp(data_e3.list[2].main.temp)
      ],
      icon_e3: [
        this.getIcon(data_e3.list[0].weather[0].id),
        this.getIcon(data_e3.list[1].weather[0].id),
        this.getIcon(data_e3.list[2].weather[0].id)
      ],
      time_e3: [
        this.getTime(data_e3.list[0].dt_txt),
        this.getTime(data_e3.list[1].dt_txt),
        this.getTime(data_e3.list[2].dt_txt)
      ],

      temp_e15: [
        this.printTemp(data_e15.list[0].main.temp),
        this.printTemp(data_e15.list[1].main.temp),
        this.printTemp(data_e15.list[2].main.temp)
      ],
      icon_e15: [
        this.getIcon(data_e15.list[0].weather[0].id),
        this.getIcon(data_e15.list[1].weather[0].id),
        this.getIcon(data_e15.list[2].weather[0].id)
      ],
      time_e15: [
        this.getTime(data_e15.list[0].dt_txt),
        this.getTime(data_e15.list[1].dt_txt),
        this.getTime(data_e15.list[2].dt_txt)
      ],
    })
  }

  render() {
    return (
      <div onDoubleClick={this._handleDoubeClickItem}>
      <div className= {localStorage.getItem("wallpaper")}>
        <div className= "header">
          <div className= "city"> Stratford to Aldgate </div>
        </div>
        <div className="grid-container3">
          <div className="item1">       </div>
          <div className="item2">Aldgate</div>
          <div className="item3">       </div>
          <div className="item4">{this.state.time_ec3n[0]}</div>
          <div className="item5">{this.state.time_ec3n[1]}</div>
          <div className="item6">{this.state.time_ec3n[2]}</div>
          <div className="item7"><img src={this.state.icon_ec3n[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_ec3n[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_ec3n[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_ec3n[0]}</div>
          <div className="item11">{this.state.temp_ec3n[1]}</div>
          <div className="item12">{this.state.temp_ec3n[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">           </div>
          <div className="item2">Whitechapel</div>
          <div className="item3">           </div>
          <div className="item4">{this.state.time_e1[0]}</div>
          <div className="item5">{this.state.time_e1[1]}</div>
          <div className="item6">{this.state.time_e1[2]}</div>
          <div className="item7"><img src={this.state.icon_e1[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_e1[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_e1[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_e1[0]}</div>
          <div className="item11">{this.state.temp_e1[1]}</div>
          <div className="item12">{this.state.temp_e1[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">        </div>
          <div className="item2">Mile End</div>
          <div className="item3">        </div>
          <div className="item4">{this.state.time_e3[0]}</div>
          <div className="item5">{this.state.time_e3[1]}</div>
          <div className="item6">{this.state.time_e3[2]}</div>
          <div className="item7"><img src={this.state.icon_e3[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_e3[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_e3[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_e3[0]}</div>
          <div className="item11">{this.state.temp_e3[1]}</div>
          <div className="item12">{this.state.temp_e3[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">          </div>
          <div className="item2">Bow Church</div>
          <div className="item3">          </div>
          <div className="item4">{this.state.time_e3[0]}</div>
          <div className="item5">{this.state.time_e3[1]}</div>
          <div className="item6">{this.state.time_e3[2]}</div>
          <div className="item7"><img src={this.state.icon_e3[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_e3[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_e3[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_e3[0]}</div>
          <div className="item11">{this.state.temp_e3[1]}</div>
          <div className="item12">{this.state.temp_e3[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1"></div>
          <div className="item2">Stratford</div>
          <div className="item3"></div>
          <div className="item4">{this.state.time_e15[0]}</div>
          <div className ="item5">{this.state.time_e15[1]}</div>
          <div className="item6">{this.state.time_e15[2]}</div>
          <div className="item7"><img src={this.state.icon_e15[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_e15[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_e15[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_e15[0]}</div>
          <div className="item11">{this.state.temp_e15[1]}</div>
          <div className="item12">{this.state.temp_e15[2]}</div>
        </div>
      </div>
      <BrowserRouter>
        <Route exact path="/" component={App}/>
      </BrowserRouter>
      </div>

    );
  }
}

export default withRouter(WeatherSTA);
