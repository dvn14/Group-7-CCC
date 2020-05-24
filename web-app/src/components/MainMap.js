import React, { Component } from "react";
import { Map, TileLayer,  GeoJSON, CircleMarker, Tooltip, LayersControl,
  LayerGroup } from "react-leaflet";
import Control from "react-leaflet-control";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-regular-svg-icons";
import { faRunning, faHamburger,
  faFilm } from "@fortawesome/free-solid-svg-icons";

import { ButtonGroup } from "react-bootstrap";

import axios from "axios";

import activities from "../activities.json";
import layers from "../layers.json";
import config from "../conf/config.json";

import LayerChooser from "./LayerChooser";
import ActivityChooser from "./ActivityChooser";
import Legend from "./Legend";

library.add(faDotCircle, faRunning, faHamburger, faFilm); 

const COLORS = ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6",
                "#4292c6", "#2171b5", "#08519c", "#08306b", "#05234d"]

const LEVELS = [0, 10000, 20000, 30000, 40000,
                50000, 60000, 70000, 80000, 90000];


class MainMap extends Component {

  activityData = {}
  indexData = {}

  state = {
    viewport: this.props.vp,
    selectedActivity: null,
    loading: {
      "nsw": true,  
      "aus": true
      },
    selectedContentId: 0,
    selectedContent: null,
    currentArea: "aus"
  }

  componentDidMount(){
    let nswRequests = [
      axios.get(config.webServiceUrl + "/summaries/nsw", {crossDomain: true }),
      axios.get(config.webServiceUrl + "/indices/nsw", {crossDomain: true })
    ];

    let ausRequests = [
      axios.get(config.webServiceUrl + "/summaries/aus", {crossDomain: true }),
      axios.get(config.webServiceUrl + "/indices/aus", {crossDomain: true })
    ];

  axios
    .all(nswRequests)
    .then(
      axios.spread((...responses) => {
        this.activityData["nsw"] = responses[0].data;
        this.indexData["nsw"] = responses[1].data;
        let loading = {...this.state.loading};
        loading.nsw = false;
        this.setState({ loading });
      })
    )
    .catch(errors => {
      console.log("Errors: "+errors);
    });

    axios
    .all(ausRequests)
    .then(
      axios.spread((...responses) => {
        this.activityData["aus"] = responses[0].data;
        this.indexData["aus"] = responses[1].data;
        let loading = {...this.state.loading};
        loading.aus = false;
        this.setState({ loading });
        console.log("AU data loaded.");
        console.log(this.state.loading)
      })
    )
    .catch(errors => {
        console.log("Errors: "+errors);
    });

    }

  getColor = (val) => {
    let color = COLORS[0];

    if (val > 90000) {
      color = COLORS[9];
    } else if (val > 80000) {
      color = COLORS[8];
    } else if (val > 70000) {
      color = COLORS[7];
    } else if (val > 60000) {
      color = COLORS[6];
    } else if (val > 50000) {
      color = COLORS[5];
    } else if (val > 40000) {
      color = COLORS[4];
    } else if (val > 30000) {
      color = COLORS[3];
    } else if (val > 20000) {
      color = COLORS[2];
    } else if (val > 10000) {
      color = COLORS[1];
    }

    return color;
  };

  resetView = () => {
    this.setState({ viewport: this.props.vp });
  }

  onViewportChanged = (viewport) => {
    this.setState({ viewport });
  }

  setSelectedActivity = (activity) => {
    this.setState({ selectedActivity: activity });
  }

  changeViewPort(area) {
    if(this.state.currentArea !== area ) {
      this.setState({ currentArea:area });
      this.resetView();
    }
  }

  selectLayer = (content) => {
    this.setState({ selectedContentId:content.id,
                    selectedContent:content })
  }

  render() {
    setInterval(() => this.changeViewPort(this.props.area), 1000);
    return (
      <Map id="map" onViewportChanged={ this.onViewportChanged }
          viewport={ this.state.viewport }>
        <LayersControl position="topleft">
          <Control position="topleft">
            <button className="leaflet-control-layers feat-btn-reset-view"
              onClick={ this.resetView }>
              <FontAwesomeIcon icon={ faDotCircle } size="lg"/>
            </button>
          </Control>
          <LayersControl.BaseLayer checked="checked" name="Black and White">
            <TileLayer
              attribution="&amp;copy <a href='http://osm.org/copyright'>
                OpenStreetMap</a> contributors"
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Coloured">
            <TileLayer
              attribution="&amp;copy <a href='http://osm.org/copyright'>
                OpenStreetMap</a> contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          </LayersControl>
          <LayerGroup>
          { this.indexData[this.state.currentArea] ? (
            <GeoJSON
              key={ this.state.currentArea }
              data={ this.indexData[this.state.currentArea] }
              style={ (feature) => ({
                color: '#4a83ec',
                weight: 0.5,
                fillColor: this.getColor(
                feature['properties'][this.state.selectedContentId]),
                fillOpacity: 0.85
              }) }
            />
          ) : (<></>) }
          </LayerGroup>
          <LayerGroup>
          { this.state.selectedActivity 
              && this.activityData[this.state.currentArea]["summary"] ? (
            this.activityData[this.state.currentArea]["summary"].map(
                (city, k) => {
              return (
                <CircleMarker
                  color="#dbae28"
                  key={ k }
                  center={ [city["point"][1], city["point"][0]] }
                  radius={ 5 * Math.log(
                    city[this.state.selectedActivity+"_total"]) }
                  fillOpacity={ 0.3 }
                  stroke={ true }
                  weight={ 2 }
                >
                  <Tooltip direction="right" offset={[-8, -2]} opacity={ 1 }>
                    <strong>{ city["name"] } : </strong>
                    <span>{ parseInt(
                      city[this.state.selectedActivity+"_total"])
                        .toLocaleString("en-AU") } ({ +(100*Math.round(
                          city[this.state.selectedActivity]+"e+4") + "e-4") }%)
                    </span>
                  </Tooltip>
                </CircleMarker>
              );
           })) : (<></>) }
          </LayerGroup>
          
          { this.state.selectedContent ? (
            <>
              <Legend position="bottomleft" 
                getColor={ this.getColor }
                levels={ LEVELS }/>
              <Control position="bottomleft" >
                <span>
                  <strong>
                    { this.state.selectedContent ?
                      this.state.selectedContent["text"] : "" }
                  </strong>
                </span>  
              </Control>
            </>
            ):(<></>) }
          { !this.state.loading[this.state.currentArea] ? (
            <>
              <Control position="topright">
                <ButtonGroup toggle>
                  {layers.map(layer => (
                    <LayerChooser
                      layer={layer}
                      key={layer.id}
                      variant={layer.variant}
                      className={layer.className}
                      selectLayer={this.selectLayer}
                    />
                  )) }
                  </ButtonGroup>
                <br/><br/><br/>
              </Control>

              <Control position="topright">
                <ButtonGroup vertical>
                  { activities.map(activity => (
                    <ActivityChooser
                      activity={activity}
                      key={activity.id}
                      selectActivity={this.setSelectedActivity}
                    />
                  )) }
                </ButtonGroup>
              </Control>
            </>
          ) : (
            <Control position="topright" >
              <span><strong>Loading data...</strong></span>
            </Control>
          ) }
        </Map>
      
    );
  }
}

export default MainMap;