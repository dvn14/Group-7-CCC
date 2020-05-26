/* COMP90024 Cluster and Cloud Computing
   Assignment 2, Semester 1 2020
   City Analytics on the Cloud
   Team 7
   Kurniawan Lastanto - 1114056 - Melbourne
   Mochammad Chaerudin - 1041681 - Melbourne
   Devin Nanayakkara - 1132751 - Melbourne
   Abhishek Anand - 1005884 - Melbourne
   Shaik Anisuzzaman - 1060370 - Melbourne
 
   File:    Legend.js
   Purpose: A map legend component.
            This custom legend component implementation was based on
            https://codesandbox.io/s/6yqs5?file=/src/Legend.js.
*/

import { MapControl, withLeaflet } from "react-leaflet";
import L from "leaflet";
import PropTypes from "prop-types";

class Legend extends MapControl {
  createLeafletElement(props) {}

  componentDidMount() {
    const LOCALE = "en-AU";
    const box = L.control({ position: this.props.position });

    box.onAdd = () => {
      const div = L.DomUtil.create("div", "legend");
      let values = [];
      
      for (let i = 0; i < this.props.levels.length; i++) {
        let start = this.props.levels[i];
        let end = this.props.levels[i + 1];
        let value = "<span style='opacity: 0.85; background:" +
            this.props.getColor(start + 1) +
            "'>&nbsp; &nbsp; &nbsp;</span> " +
            parseInt(start).toLocaleString(LOCALE) +
            (end ?
            "&ndash;" + parseInt(end).toLocaleString(LOCALE) : "+")

        values.push(value);
      }

      div.innerHTML = values.join("<br/>");
      return div;
    };
    
    box.addTo(this.props.leaflet.map);
  }
}

Legend.propTypes = {
  colors: PropTypes.array.isRequired,
  levels: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired
}

export default withLeaflet(Legend);
