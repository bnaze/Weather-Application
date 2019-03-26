import React, {Component} from 'react';
import Carousel from 'nuka-carousel';

import Home from "./Home";
import ChooseHighway from "./ChooseHighway";

class App extends Component {
  render(){
    return (
      // nuka-carousel component in order to enable page sliding
      <div className="containerSlider">
      <Carousel renderCenterLeftControls = {null} renderCenterRightControls = {null}>
        <Home />
        <ChooseHighway />
      </Carousel>
      </div>
    );
  }
}

export default App;
