'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./react-leaflet-grouped-layer-control.css');

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactLeaflet = require('react-leaflet');

var _RLGroupedLayerControlRC = require('./RL-Grouped-Layer-Control-RC');

var _RLGroupedLayerControlRC2 = _interopRequireDefault(_RLGroupedLayerControlRC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactLeafletGroupedLayerControl = function (_MapControl) {
    _inherits(ReactLeafletGroupedLayerControl, _MapControl);

    function ReactLeafletGroupedLayerControl(props, context) {
        _classCallCheck(this, ReactLeafletGroupedLayerControl);

        var _this = _possibleConstructorReturn(this, _MapControl.call(this, props));

        _this.div = _leaflet.DomUtil.create('div', 'rlglc-wrap');
        L.DomEvent.disableClickPropagation(_this.div);
        L.DomEvent.disableScrollPropagation(_this.div);
        _this.map = context.map || props.leaflet.map;
        return _this;
    }

    ReactLeafletGroupedLayerControl.prototype.createLeafletElement = function createLeafletElement(props) {
        var _this2 = this;

        var RLGLC = _leaflet.Control.extend({
            onAdd: function onAdd(map) {
                return _this2.div;
            },
            onRemove: function onRemove(map) {}
        });
        return new RLGLC(props);
    };

    ReactLeafletGroupedLayerControl.prototype.renderReactComponent = function renderReactComponent() {
        _reactDom2.default.render(_react2.default.createElement(_RLGroupedLayerControlRC2.default, _extends({}, this.props, { map: this.map })), this.div);
    };

    ReactLeafletGroupedLayerControl.prototype.componentDidMount = function componentDidMount() {
        _MapControl.prototype.componentDidMount.call(this);
        this.renderReactComponent();
    };

    ReactLeafletGroupedLayerControl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState, SS) {
        _MapControl.prototype.componentDidUpdate.call(this, prevProps, prevState, SS);
        // ReactDOM.unmountComponentAtNode(this.div);
        this.renderReactComponent();
    };

    ReactLeafletGroupedLayerControl.prototype.render = function render() {
        return null;
    };

    return ReactLeafletGroupedLayerControl;
}(_reactLeaflet.MapControl);

exports.default = ReactLeafletGroupedLayerControl;