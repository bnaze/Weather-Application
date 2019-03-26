import React, { Component } from 'react';
import './App.css';

import atmosphereIcon from './icons/Atmosphere.png';
import cloudIcon from './icons/Cloud.png';
import rainIcon from './icons/Rain.png';
import snowIcon from './icons/Snow.png';
import sunIcon from './icons/Sun.png';
import moonIcon from './icons/Moon.png';
import thunderIcon from './icons/Thunder.png';

const API = 'http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=4ca1cd0c5f7d1a9ad38ea3eb3c42c719';
const API_darksky = 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/fe13baa6ec5188c3f8cc1e12d608ae5c/51.50853,-0.12574?units=si';

// Defining empty states
class Home extends Component {
  state = {
    temperature: undefined,
    humidity: undefined,
    city: undefined,
    precipitation: undefined,
    feelsLike: undefined,
    wind: undefined,
    icon: undefined,

    temperature_3hour: [],
    icon_3hour: [],
    time_3hour: [],

    temperature_5day: [],
    weekday_5day: [],
    icon_5day: [],
  }

  // Mounting the getWeather() and getFeelsLike()
  // methods straight away so that they execute
  // and present an output without any user input
  componentDidMount() {
    this.getWeather();
    this.getFeelsLike();
  }

  // Calculates the weekday from a given UNIX timestamp
  epochToWeekday(epoch) {
    switch((Math.floor(epoch/86400)+4)%7) {
      case 0: return "Sun";
      case 1: return "Mon";
      case 2: return "Tue";
      case 3: return "Wed";
      case 4: return "Thu";
      case 5: return "Fri";
      case 6: return "Sat";
      default: return null;
    }
  }

  // Converts the weather IDs to appropriate weather icons
  getIcon(id) {
    if (id.id >= 200 && id.id <= 232) {
      return thunderIcon;
    } else if (id.id >= 300 && id.id <= 531) {
      return rainIcon;
    } else if (id.id >= 600 && id.id <= 622) {
      return snowIcon;
    } else if (id.id >= 701 && id.id <= 781) {
      return atmosphereIcon;
    } else if (id.id === 800 && id.icon.includes("d")) {
      return sunIcon;
    } else if (id.id === 800 && id.icon.includes("n")) {
      return moonIcon;
    } else if (id.id >= 801 && id.id <= 804) {
      return cloudIcon;
    }
  }

  // Extracts the hour from a full datetime variable
  getTime(time) {
    var timeSplit = time.split('');
    var timeHour = timeSplit.slice(11,16)
    return timeHour;
  }

  // Checks whether there has been any precipitation in the past 3 hours
  getRain(precip) {
    if (typeof precip === 'undefined') {
      return 0;
    } else {
      return precip;
    }
  }

  // Rounds the temperature and affixes a celsius symbol
  printTemp(temp) {
    var sanitisedTemp = Math.round(temp) + "°C";
    return sanitisedTemp;
  }

  // API data fetch from Dark Sky to retrieve the Feels Like temperature
  getFeelsLike = async () => {
    const darksky_call = await fetch(API_darksky);
    const darksky_data = await darksky_call.json();

    this.setState({
      feelsLike: Math.round(darksky_data.currently.apparentTemperature) + "°C",
    });
  }

  // API data fetch from OpenWeatherMap to retrieve weather information
  getWeather = async () => {
    const api_call = await fetch(API);
    const data = await api_call.json();

    // Conversion from wind direction in degrees to cardinal direction
    if (data.list[0].wind.deg <= 11.25 || data.list[0].wind.deg >= 348.75) {
      this.setState({
        wind: "N " + data.list[0].wind.speed + " m/s",
      })
    } else if (data.list[0].wind.deg >= 11.25 && data.list[0].wind.deg <= 33.75) {
        this.setState({
          wind: "NNE " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 33.75 && data.list[0].wind.deg <= 56.25) {
        this.setState({
          wind: "NE " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 56.25 && data.list[0].wind.deg <= 78.75) {
        this.setState({
          wind: "ENE  " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 78.75 && data.list[0].wind.deg <= 101.25) {
        this.setState({
          wind: "E " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 101.25 && data.list[0].wind.deg <= 123.75) {
        this.setState({
          wind: "ESE " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 123.75 && data.list[0].wind.deg <= 146.25) {
        this.setState({
          wind: "SE " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 146.25 && data.list[0].wind.deg <= 168.75) {
        this.setState({
          wind: "SSE " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 168.75 && data.list[0].wind.deg <= 191.25) {
        this.setState({
          wind: "S " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 191.25 && data.list[0].wind.deg <= 213.75) {
        this.setState({
          wind: "SSW " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 213.75 && data.list[0].wind.deg <= 236.25) {
        this.setState({
          wind: "SW " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 236.25 && data.list[0].wind.deg <= 258.75) {
        this.setState({
          wind: "WSW " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 258.75 && data.list[0].wind.deg <= 281.25) {
        this.setState({
          wind: "W " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 281.25 && data.list[0].wind.deg <= 303.75) {
        this.setState({
          wind: "WNW " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 303.75 && data.list[0].wind.deg <= 326.25) {
        this.setState({
          wind: "NW " + data.list[0].wind.speed + " m/s",
        })
    } else if (data.list[0].wind.deg >= 326.25 && data.list[0].wind.deg <= 348.75) {
        this.setState({
          wind: "NNW " + data.list[0].wind.speed + " m/s",
        })
    }

    // Setting the states for various weather attributes
    this.setState({
      temperature: Math.round(data.list[0].main.temp) + "°C",
      humidity: data.list[0].main.humidity,
      city: data.city.name,
      precipitation: this.getRain(data.list[0].rain['3h']) + " mm in last 3 hours",
      icon: this.getIcon(data.list[0].weather[0]),
      main: data.list[0].weather[0].main,

      temperature_3hour: [
        this.printTemp(data.list[1].main.temp),
        this.printTemp(data.list[2].main.temp),
        this.printTemp(data.list[3].main.temp),
        this.printTemp(data.list[4].main.temp),
        this.printTemp(data.list[5].main.temp)
      ],
      icon_3hour: [
        this.getIcon(data.list[1].weather[0]),
        this.getIcon(data.list[2].weather[0]),
        this.getIcon(data.list[3].weather[0]),
        this.getIcon(data.list[4].weather[0]),
        this.getIcon(data.list[5].weather[0])
      ],
      time_3hour: [
        this.getTime(data.list[1].dt_txt),
        this.getTime(data.list[2].dt_txt),
        this.getTime(data.list[3].dt_txt),
        this.getTime(data.list[4].dt_txt),
        this.getTime(data.list[5].dt_txt)
      ],
      temperature_5day: [
        this.printTemp(data.list[8].main.temp),
        this.printTemp(data.list[16].main.temp),
        this.printTemp(data.list[24].main.temp),
        this.printTemp(data.list[32].main.temp),
        this.printTemp(data.list[38].main.temp)
      ],
      weekday_5day: [
        this.epochToWeekday(data.list[8].dt),
        this.epochToWeekday(data.list[16].dt),
        this.epochToWeekday(data.list[24].dt),
        this.epochToWeekday(data.list[32].dt),
        this.epochToWeekday(data.list[38].dt + 21600)
      ],
      icon_5day: [
        this.getIcon(data.list[8].weather[0]),
        this.getIcon(data.list[16].weather[0]),
        this.getIcon(data.list[24].weather[0]),
        this.getIcon(data.list[32].weather[0]),
        this.getIcon(data.list[38].weather[0])
      ],
    });

  }
  // Main content of the page
  render() {
    let wallpaper;
    if (this.state.main === "Clear") {
      wallpaper = "wallpaperBlue"
    } else {
      wallpaper = "wallpaperGrey"
    }
    localStorage.setItem("wallpaper", wallpaper);

    return (
      <div className={localStorage.getItem("wallpaper")}>
        <div className="header">
          <div className="city">        {this.state.city}                             </div>
          <div className="sun"><img src={this.state.icon} alt = "" width='250' height='250' /> </div>
          <div className="temperature"> {this.state.temperature}                      </div>
        </div>
        <div className="grid-container">
          <div className="item1">{this.state.time_3hour[0]}</div>
          <div className="item2">{this.state.time_3hour[1]}</div>
          <div className="item3">{this.state.time_3hour[2]}</div>
          <div className="item4">{this.state.time_3hour[3]}</div>
          <div className="item5">{this.state.time_3hour[4]}</div>
          <div className="item6"> <img src={this.state.icon_3hour[0]} alt = "" width='55' height='55'/></div>
          <div className="item7"> <img src={this.state.icon_3hour[1]} alt = "" width='55' height='55'/></div>
          <div className="item8"> <img src={this.state.icon_3hour[2]} alt = "" width='55' height='55'/></div>
          <div className="item9"> <img src={this.state.icon_3hour[3]} alt = "" width='55' height='55'/></div>
          <div className="item10"><img src={this.state.icon_3hour[4]} alt = "" width='55' height='55'/></div>
          <div className="item11">{this.state.temperature_3hour[0]}</div>
          <div className="item12">{this.state.temperature_3hour[1]}</div>
          <div className="item13">{this.state.temperature_3hour[2]}</div>
          <div className="item14">{this.state.temperature_3hour[3]}</div>
          <div className="item15">{this.state.temperature_3hour[4]}</div>
        </div>
        <div className="feelslike">Feels Like                    </div>
        <div className="feelsliketemp">{this.state.feelsLike}           </div>
        <div className="windspeed"    >{this.state.wind}         </div>
        <div className="precipitation">{this.state.precipitation}</div>
        <div className="grid-container2">
          <div className="item1">{this.state.weekday_5day[0]} </div>
          <div className="item2">{this.state.weekday_5day[1]}</div>
          <div className="item3">{this.state.weekday_5day[2]}</div>
          <div className="item4">{this.state.weekday_5day[3]}</div>
          <div className="item5">{this.state.weekday_5day[4]}</div>
          <div className="item6"> <img src={this.state.icon_5day[0]}  alt = "" width='40' height='40'/></div>
          <div className="item7"> <img src={this.state.icon_5day[1]} alt = "" width='40' height='40'/></div>
          <div className="item8"> <img src={this.state.icon_5day[2]} alt = "" width='40' height='40'/></div>
          <div className="item9"> <img src={this.state.icon_5day[3]} alt = "" width='40' height='40'/></div>
          <div className="item10"><img src={this.state.icon_5day[4]} alt = "" width='40' height='40'/></div>
          <div className="item11">{this.state.temperature_5day[0]}</div>
          <div className="item12">{this.state.temperature_5day[1]}</div>
          <div className="item13">{this.state.temperature_5day[2]}</div>
          <div className="item14">{this.state.temperature_5day[3]}</div>
          <div className="item15">{this.state.temperature_5day[4]}</div>
        </div>
        <div className="nav"></div>
      </div>
    );
  }
}

export default Home;
