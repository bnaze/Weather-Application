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

const API_EC2A = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=ec2a,gb';
const API_N1 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=n1,gb';
const API_N16 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=n16,gb';
const API_N15 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=n15,gb';
const API_N17 = 'http://api.openweathermap.org/data/2.5/forecast?units=metric&appid=4ca1cd0c5f7d1a9ad38ea3eb3c42c719&zip=n17,gb';

class WeatherTTL extends Component {
  state = {
    temp_ec2a: [],
    icon_ec2a: [],
    time_ec2a: [],

    temp_n1: [],
    icon_n1: [],
    time_n1: [],

    temp_n16: [],
    icon_n16: [],
    time_n16: [],

    temp_n15: [],
    icon_n15: [],
    time_n15: [],

    temp_n17: [],
    icon_n17: [],
    time_n17: [],
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
    this.getWeatherTTL();
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
  getWeatherTTL = async () => {
    const api_call_ec2a = await fetch(API_EC2A);
    const data_ec2a = await api_call_ec2a.json();

    const api_call_n1 = await fetch(API_N1);
    const data_n1 = await api_call_n1.json();

    const api_call_n16 = await fetch(API_N16);
    const data_n16 = await api_call_n16.json();

    const api_call_n15 = await fetch(API_N15);
    const data_n15 = await api_call_n15.json();

    const api_call_n17 = await fetch(API_N17);
    const data_n17 = await api_call_n17.json();

    // Setting the states for various weather attributes
    this.setState({
      temp_ec2a: [
        this.printTemp(data_ec2a.list[0].main.temp),
        this.printTemp(data_ec2a.list[1].main.temp),
        this.printTemp(data_ec2a.list[2].main.temp)
      ],
      icon_ec2a: [
        this.getIcon(data_ec2a.list[0].weather[0].id),
        this.getIcon(data_ec2a.list[1].weather[0].id),
        this.getIcon(data_ec2a.list[2].weather[0].id)
      ],
      time_ec2a: [
        this.getTime(data_ec2a.list[0].dt_txt),
        this.getTime(data_ec2a.list[1].dt_txt),
        this.getTime(data_ec2a.list[2].dt_txt)
      ],

      temp_n1: [
        this.printTemp(data_n1.list[0].main.temp),
        this.printTemp(data_n1.list[1].main.temp),
        this.printTemp(data_n1.list[2].main.temp)
      ],
      icon_n1: [
        this.getIcon(data_n1.list[0].weather[0].id),
        this.getIcon(data_n1.list[1].weather[0].id),
        this.getIcon(data_n1.list[2].weather[0].id)
      ],
      time_n1: [
        this.getTime(data_n1.list[0].dt_txt),
        this.getTime(data_n1.list[1].dt_txt),
        this.getTime(data_n1.list[2].dt_txt)
      ],

      temp_n16: [
        this.printTemp(data_n16.list[0].main.temp),
        this.printTemp(data_n16.list[1].main.temp),
        this.printTemp(data_n16.list[2].main.temp)
      ],
      icon_n16: [
        this.getIcon(data_n16.list[0].weather[0].id),
        this.getIcon(data_n16.list[1].weather[0].id),
        this.getIcon(data_n16.list[2].weather[0].id)
      ],
      time_n16: [
        this.getTime(data_n16.list[0].dt_txt),
        this.getTime(data_n16.list[1].dt_txt),
        this.getTime(data_n16.list[2].dt_txt)
      ],

      temp_n15: [
        this.printTemp(data_n15.list[0].main.temp),
        this.printTemp(data_n15.list[1].main.temp),
        this.printTemp(data_n15.list[2].main.temp)
      ],
      icon_n15: [
        this.getIcon(data_n15.list[0].weather[0].id),
        this.getIcon(data_n15.list[1].weather[0].id),
        this.getIcon(data_n15.list[2].weather[0].id)
      ],
      time_n15: [
        this.getTime(data_n15.list[0].dt_txt),
        this.getTime(data_n15.list[1].dt_txt),
        this.getTime(data_n15.list[2].dt_txt)
      ],

      temp_n17: [
        this.printTemp(data_n17.list[0].main.temp),
        this.printTemp(data_n17.list[1].main.temp),
        this.printTemp(data_n17.list[2].main.temp)
      ],
      icon_n17: [
        this.getIcon(data_n17.list[0].weather[0].id),
        this.getIcon(data_n17.list[1].weather[0].id),
        this.getIcon(data_n17.list[2].weather[0].id)
      ],
      time_n17: [
        this.getTime(data_n17.list[0].dt_txt),
        this.getTime(data_n17.list[1].dt_txt),
        this.getTime(data_n17.list[2].dt_txt)
      ],
    })
  }

  render() {
    return (
      <div onDoubleClick={this._handleDoubeClickItem}>
      <div className= {localStorage.getItem("wallpaper")}>
        <div className= "header">
          <div className= "city"> Tottenham to Liverpool Street </div>
        </div>
        <div className="grid-container3-tottenham">
          <div className="item1">             </div>
          <div className="item2">Wilson Street</div>
          <div className="item3">             </div>
          <div className="item4">{this.state.time_ec2a[0]}</div>
          <div className="item5">{this.state.time_ec2a[1]}</div>
          <div className="item6">{this.state.time_ec2a[2]}</div>
          <div className="item7"><img src={this.state.icon_ec2a[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_ec2a[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_ec2a[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_ec2a[0]}</div>
          <div className="item11">{this.state.temp_ec2a[1]}</div>
          <div className="item12">{this.state.temp_ec2a[2]}</div>
        </div>
        <div className="grid-container3-tottenham">
          <div className="item1">           </div>
          <div className="item2">De Beauvoir</div>
          <div className="item3">           </div>
          <div className="item4">{this.state.time_n1[0]}</div>
          <div className="item5">{this.state.time_n1[1]}</div>
          <div className="item6">{this.state.time_n1[2]}</div>
          <div className="item7"><img src={this.state.icon_n1[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_n1[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_n1[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_n1[0]}</div>
          <div className="item11">{this.state.temp_n1[1]}</div>
          <div className="item12">{this.state.temp_n1[2]}</div>
        </div>
        <div className="grid-container3-tottenham">
          <div className="item1">           </div>
          <div className="item2">Nevill Road</div>
          <div className="item3">           </div>
          <div className="item4">{this.state.time_n16[0]}</div>
          <div className="item5">{this.state.time_n16[1]}</div>
          <div className="item6">{this.state.time_n16[2]}</div>
          <div className="item7"><img src={this.state.icon_n16[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_n16[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_n16[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_n16[0]}</div>
          <div className="item11">{this.state.temp_n16[1]}</div>
          <div className="item12">{this.state.temp_n16[2]}</div>
        </div>
        <div className="grid-container3-tottenham">
          <div className="item1">              </div>
          <div className="item2">St. Ann's Road</div>
          <div className="item3">              </div>
          <div className="item4">{this.state.time_n15[0]}</div>
          <div className="item5">{this.state.time_n15[1]}</div>
          <div className="item6">{this.state.time_n15[2]}</div>
          <div className="item7"><img src={this.state.icon_n15[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_n15[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_n15[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_n15[0]}</div>
          <div className="item11">{this.state.temp_n15[1]}</div>
          <div className="item12">{this.state.temp_n15[2]}</div>
        </div>
        <div className="grid-container3-tottenham">
          <div className="item1">         </div>
          <div className="item2">Park Lane</div>
          <div className="item3">         </div>
          <div className="item4">{this.state.time_n17[0]}</div>
          <div className="item5">{this.state.time_n17[1]}</div>
          <div className="item6">{this.state.time_n17[2]}</div>
          <div className="item7"><img src={this.state.icon_n17[0]} alt = "" width='55' height='55'/></div>
          <div className="item8"><img src={this.state.icon_n17[1]} alt = "" width='55' height='55'/></div>
          <div className="item9"><img src={this.state.icon_n17[2]} alt = "" width='55' height='55'/></div>
          <div className="item10">{this.state.temp_n17[0]}</div>
          <div className="item11">{this.state.temp_n17[1]}</div>
          <div className="item12">{this.state.temp_n17[2]}</div>
        </div>
      </div>
      <BrowserRouter>
        <Route exact path="/" component={App}/>
      </BrowserRouter>
      </div>
    );
  }
}

export default withRouter(WeatherTTL);
