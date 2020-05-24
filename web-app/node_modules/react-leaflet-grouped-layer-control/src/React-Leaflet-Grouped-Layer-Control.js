import './react-leaflet-grouped-layer-control.css';
import { Control, DomUtil } from 'leaflet';
import React from 'react';
import ReactDOM from 'react-dom';
import { MapControl } from 'react-leaflet';
import RLGroupedLayerControlRC from './RL-Grouped-Layer-Control-RC';

export default class ReactLeafletGroupedLayerControl extends MapControl {
    constructor(props, context){
        super(props);
        this.div = DomUtil.create('div', 'rlglc-wrap');
        L.DomEvent.disableClickPropagation(this.div);
        L.DomEvent.disableScrollPropagation(this.div);
        this.map = context.map || props.leaflet.map;
    }

    createLeafletElement(props) {
        const RLGLC = Control.extend({
            onAdd: (map) => this.div,
            onRemove: (map) =>  {}
        })
        return new RLGLC(props);
    }

    renderReactComponent() {
        ReactDOM.render(<RLGroupedLayerControlRC {...this.props} map={this.map}/>, this.div);
    }

    componentDidMount() {
        super.componentDidMount();
        this.renderReactComponent();
    }

    componentDidUpdate(prevProps, prevState, SS) {
        super.componentDidUpdate(prevProps, prevState, SS);
        // ReactDOM.unmountComponentAtNode(this.div);
        this.renderReactComponent();
    }

    render() { return null }
}
