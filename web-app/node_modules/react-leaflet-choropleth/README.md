# react-leaflet-choropleth
This component extends geoJson from react-leaflet and will use chroma to set the color, using a property or function value.
This is highly based on [leaflet-choropleth](https://github.com/timwis/leaflet-choropleth) by timwis.
## Installation

`npm install react-leaflet-choropleth`

## Options

### Required

`data`: geojson data as a FeatureCollection our as an array.

`style`: Styling to be applied to each geojson object. Can be a function or an object.

`valueProperty`: The way a value is obtained from each geojson object. Can be a function like `function(feature){ return feature.properties.value }` or it will use the propert to look up on the value in the `properties` object on the geojson shape.

`scale`: An array of the top and bottom colors to use.

`steps`: A number to determine how many different colors to pick from.

`mode`: The mode to use from chroma.js. This can be `'e'` from equadistant, `'q'` for quantile or `'k'` for k-means.

### Optional

`visible`:A way to determine whether to use the fillColor provided in `styles`, or to use the fillColor of the choropleth. Useful for overwriting the choropleth color.

`ref`: A way to get the leaflet geojson Object. `<ref>.leafletElement` will be a FeatureGroup containing the leaflet layers created.

 `identity`: A function used to set the `key` prop for each geojson feature

All other props passed to `Choropleth` will also be passed to each geojson layer.

## Example
```js 
import Choropleth from 'react-leaflet-choropleth'
import { Map } from 'react-leaflet'

const style = {
    fillColor: '#F28F3B',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5
}

const map = (geojson) => (
  <Map>
    <Choropleth
      data={{type: 'FeatureCollection', features: geojson}}
      valueProperty={(feature) => feature.properties.value}
      visible={(feature) => feature.id !== active.id}
      scale={['#b3cde0', '#011f4b']}
      steps={7}
      mode='e'
      style={style}
      onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.label)}
      ref={(el) => this.choropleth = el.leafletElement}
    />
  </Map>
)
```
