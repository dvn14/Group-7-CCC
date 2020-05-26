/* COMP90024 Cluster and Cloud Computing
   Assignment 2, Semester 1 2020
   City Analytics on the Cloud
   Team 7
   Kurniawan Lastanto - 1114056 - Melbourne
   Mochammad Chaerudin - 1041681 - Melbourne
   Devin Nanayakkara - 1132751 - Melbourne
   Abhishek Anand - 1005884 - Melbourne
   Shaik Anisuzzaman - 1060370 - Melbourne
 
   File:    App.js
   Purpose: The main app for web-app.
*/

import React, { Component } from "react";

import { isMobile } from "react-device-detect";

import "./App.css";
  
import Header from "./components/Header";
import MainMap from "./components/MainMap";


const NSW_ZOOM_LEVEL_MOBILE = 9; // NSW mobile zoom level
const NSW_ZOOM_LEVEL_DESKTOP = 9; // NSW desktop zoom level
const NSW_CENTER = [-33.834905,150.9673231]; // NSW center

const AUS_ZOOM_LEVEL_MOBILE = 4; // Australia mobile zoom level
const AUS_ZOOM_LEVEL_DESKTOP = 5; // Australia desktop zoom level
const AUS_CENTER = [-28.6101111,134.3547222] // Australia center

const NSW_VIEWPORT = {
  center: NSW_CENTER,
  zoom: isMobile ? NSW_ZOOM_LEVEL_MOBILE : NSW_ZOOM_LEVEL_DESKTOP
}

const AUS_VIEWPORT = {
  center: AUS_CENTER,
  zoom: isMobile ? AUS_ZOOM_LEVEL_MOBILE : AUS_ZOOM_LEVEL_DESKTOP
}

const DEFAULT_VIEWPORT = AUS_VIEWPORT;

class App extends Component {
  state = {
    viewport: DEFAULT_VIEWPORT,
    selectedActivity: "exercise",
    area: "aus"
  }

  componentDidMount(){
    document.title = "Activities during #AustraliaLockdown"
  }

  resetView = () => {
    this.setState({ viewport: DEFAULT_VIEWPORT })
  }

  onViewportChanged = (viewport) => {
    this.setState({ viewport })
  }

  setSelected = (activity) => {
    this.setState({ selected: activity })
  }

  selectOverlayLayer = (layer) => {
    this.setState({ selectedData: layer.data })
  }

  selectArea = (area) => {
    this.setState({ area })
    if(area === "aus") {
      this.setState({ viewport: AUS_VIEWPORT })
    } else {
      this.setState({ viewport: NSW_VIEWPORT })
    }
  }

  render() {
    return (
      <>
        <Header selectArea={this.selectArea}/>
          <div id="container">
            <MainMap vp={this.state.viewport} area={this.state.area} />
          </div>
      </>
    );
  }
}

export default App;
