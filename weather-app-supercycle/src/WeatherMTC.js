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

const API_SW19 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=sw19,gb';
const API_SW12 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=sw12,gb';
const API_SW4 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=sw4,gb';
const API_SE11 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=se11,gb';
const API_EC4R = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=ec4r,gb';

class WeatherMTC extends Component {
  state = {
    temp_sw19: [],
    icon_sw19: [],
    time_sw19: [],

    temp_sw12: [],
    icon_sw12: [],
    time_sw12: [],

    temp_sw4: [],
    icon_sw4: [],
    time_sw4: [],

    temp_se11: [],
    icon_se11: [],
    time_se11: [],

    temp_ec4r: [],
    icon_ec4r: [],
    time_ec4r: [],
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
    this.getWeatherMTC();
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
  getWeatherMTC = async () => {
    const api_call_sw19 = await fetch(API_SW19);
    const data_sw19 = await api_call_sw19.json();

    const api_call_sw12 = await fetch(API_SW12);
    const data_sw12 = await api_call_sw12.json();

    const api_call_sw4 = await fetch(API_SW4);
    const data_sw4 = await api_call_sw4.json();

    const api_call_se11 = await fetch(API_SE11);
    const data_se11 = await api_call_se11.json();

    const api_call_ec4r = await fetch(API_EC4R);
    const data_ec4r = await api_call_ec4r.json();

    // Setting the states for various weather attributes
    this.setState({
      temp_sw19: [
        this.printTemp(data_sw19.list[0].main.temp),
        this.printTemp(data_sw19.list[1].main.temp),
        this.printTemp(data_sw19.list[2].main.temp)
      ],
      icon_sw19: [
        this.getIcon(data_sw19.list[0].weather[0].id),
        this.getIcon(data_sw19.list[1].weather[0].id),
        this.getIcon(data_sw19.list[2].weather[0].id)
      ],
      time_sw19: [
        this.getTime(data_sw19.list[0].dt_txt),
        this.getTime(data_sw19.list[1].dt_txt),
        this.getTime(data_sw19.list[2].dt_txt)
      ],

      temp_sw12: [
        this.printTemp(data_sw12.list[0].main.temp),
        this.printTemp(data_sw12.list[1].main.temp),
        this.printTemp(data_sw12.list[2].main.temp)
      ],
      icon_sw12: [
        this.getIcon(data_sw12.list[0].weather[0].id),
        this.getIcon(data_sw12.list[1].weather[0].id),
        this.getIcon(data_sw12.list[2].weather[0].id)
      ],
      time_sw12: [
        this.getTime(data_sw12.list[0].dt_txt),
        this.getTime(data_sw12.list[1].dt_txt),
        this.getTime(data_sw12.list[2].dt_txt)
      ],

      temp_sw4: [
        this.printTemp(data_sw4.list[0].main.temp),
        this.printTemp(data_sw4.list[1].main.temp),
        this.printTemp(data_sw4.list[2].main.temp)
      ],
      icon_sw4: [
        this.getIcon(data_sw4.list[0].weather[0].id),
        this.getIcon(data_sw4.list[1].weather[0].id),
        this.getIcon(data_sw4.list[2].weather[0].id)
      ],
      time_sw4: [
        this.getTime(data_sw4.list[0].dt_txt),
        this.getTime(data_sw4.list[1].dt_txt),
        this.getTime(data_sw4.list[2].dt_txt)
      ],

      temp_se11: [
        this.printTemp(data_se11.list[0].main.temp),
        this.printTemp(data_se11.list[1].main.temp),
        this.printTemp(data_se11.list[2].main.temp)
      ],
      icon_se11: [
        this.getIcon(data_se11.list[0].weather[0].id),
        this.getIcon(data_se11.list[1].weather[0].id),
        this.getIcon(data_se11.list[2].weather[0].id)
      ],
      time_se11: [
        this.getTime(data_se11.list[0].dt_txt),
        this.getTime(data_se11.list[1].dt_txt),
        this.getTime(data_se11.list[2].dt_txt)
      ],

      temp_ec4r: [
        this.printTemp(data_ec4r.list[0].main.temp),
        this.printTemp(data_ec4r.list[1].main.temp),
        this.printTemp(data_ec4r.list[2].main.temp)
      ],
      icon_ec4r: [
        this.getIcon(data_ec4r.list[0].weather[0].id),
        this.getIcon(data_ec4r.list[1].weather[0].id),
        this.getIcon(data_ec4r.list[2].weather[0].id)
      ],
      time_ec4r: [
        this.getTime(data_ec4r.list[0].dt_txt),
        this.getTime(data_ec4r.list[1].dt_txt),
        this.getTime(data_ec4r.list[2].dt_txt)
      ],
    })
  }

  render() {
    return (
      <div onDoubleClick={this._handleDoubeClickItem}>
      <div className= {localStorage.getItem("wallpaper")}>
        <div className= "header">
          <div className= "city"> Merton to the City </div>
        </div>
        <div className="grid-container3">
          <div className="item1">             </div>
          <div className="item2">Colliers Wood</div>
          <div className="item3">             </div>
          <div className="item4">{this.state.time_sw19[0]}</div>
          <div className="item5">{this.state.time_sw19[1]}</div>
          <div className="item6">{this.state.time_sw19[2]}</div>
          <div className="item7"><img src={this.state.icon_sw19[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_sw19[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_sw19[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_sw19[0]}</div>
          <div className="item11">{this.state.temp_sw19[1]}</div>
          <div className="item12">{this.state.temp_sw19[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">      </div>
          <div className="item2">Balham</div>
          <div className="item3">      </div>
          <div className="item4">{this.state.time_sw12[0]}</div>
          <div className="item5">{this.state.time_sw12[1]}</div>
          <div className="item6">{this.state.time_sw12[2]}</div>
          <div className="item7"><img src={this.state.icon_sw12[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_sw12[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_sw12[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_sw12[0]}</div>
          <div className="item11">{this.state.temp_sw12[1]}</div>
          <div className="item12">{this.state.temp_sw12[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">       </div>
          <div className="item2">Clapham</div>
          <div className="item3">       </div>
          <div className="item4">{this.state.time_sw4[0]}</div>
          <div className="item5">{this.state.time_sw4[1]}</div>
          <div className="item6">{this.state.time_sw4[2]}</div>
          <div className="item7"><img src={this.state.icon_sw4[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_sw4[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_sw4[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_sw4[0]}</div>
          <div className="item11">{this.state.temp_sw4[1]}</div>
          <div className="item12">{this.state.temp_sw4[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">    </div>
          <div className="item2">Oval</div>
          <div className="item3">    </div>
          <div className="item4">{this.state.time_se11[0]}</div>
          <div className="item5">{this.state.time_se11[1]}</div>
          <div className="item6">{this.state.time_se11[2]}</div>
          <div className="item7"><img src={this.state.icon_se11[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_se11[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_se11[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_se11[0]}</div>
          <div className="item11">{this.state.temp_se11[1]}</div>
          <div className="item12">{this.state.temp_se11[2]}</div>
        </div>
        <div className="grid-container3">
          <div className="item1">           </div>
          <div className="item2">Queen St Pl</div>
          <div className="item3">           </div>
          <div className="item4">{this.state.time_ec4r[0]}</div>
          <div className="item5">{this.state.time_ec4r[1]}</div>
          <div className="item6">{this.state.time_ec4r[2]}</div>
          <div className="item7"><img src={this.state.icon_ec4r[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_ec4r[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_ec4r[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_ec4r[0]}</div>
          <div className="item11">{this.state.temp_ec4r[1]}</div>
          <div className="item12">{this.state.temp_ec4r[2]}</div>
        </div>
      </div>
      <BrowserRouter>
        <Route exact path="/" component={App}/>
      </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(WeatherMTC);
