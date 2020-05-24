'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactLeaflet = require('react-leaflet');

var _chromaJs = require('chroma-js');

var _chromaJs2 = _interopRequireDefault(_chromaJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _assign = require('./assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Choropleth = function (_Component) {
  _inherits(Choropleth, _Component);

  function Choropleth() {
    _classCallCheck(this, Choropleth);

    return _possibleConstructorReturn(this, (Choropleth.__proto__ || Object.getPrototypeOf(Choropleth)).apply(this, arguments));
  }

  _createClass(Choropleth, [{
    key: 'isFunction',
    value: function isFunction(prop) {
      return typeof prop === 'function';
    }
  }, {
    key: 'getColors',
    value: function getColors() {
      var _this2 = this;

      var _props = this.props,
          data = _props.data,
          valueProperty = _props.valueProperty,
          mode = _props.mode,
          steps = _props.steps,
          scale = _props.scale,
          cl = _props.colors;

      var colors = {};
      var features = Array.isArray(data) ? data : data.features;

      var values = features.map(function (item) {
        return _this2.isFunction(valueProperty) ? valueProperty(item) : item.properties[valueProperty];
      });

      colors.limits = _chromaJs2.default.limits(values, mode, steps - 1);
      colors.colors = cl || _chromaJs2.default.scale(scale).colors(steps);
      return colors;
    }
  }, {
    key: 'getStyle',
    value: function getStyle(_ref, feature) {
      var limits = _ref.limits,
          colors = _ref.colors;
      var _props2 = this.props,
          valueProperty = _props2.valueProperty,
          _props2$visible = _props2.visible,
          visible = _props2$visible === undefined ? function () {
        return true;
      } : _props2$visible,
          userStyle = _props2.style;


      if (!(this.isFunction(visible) && visible(feature) || feature.properties[visible])) return userStyle;

      var featureValue = this.isFunction(valueProperty) ? valueProperty(feature) : feature.properties[valueProperty];

      var idx = !isNaN(featureValue) ? limits.findIndex(function (lim) {
        return featureValue <= lim;
      }) : -1;

      if (colors[idx]) {
        var style = {
          fillColor: colors[idx]
        };

        switch (typeof userStyle === 'undefined' ? 'undefined' : _typeof(userStyle)) {
          case 'function':
            return (0, _assign2.default)(userStyle(feature), style);
          case 'object':
            return (0, _assign2.default)({}, userStyle, style);
          default:
            return style;
        }
      } else {
        return userStyle;
      }
    }
  }, {
    key: 'cloneChildrenWithFeature',
    value: function cloneChildrenWithFeature(props, feature) {
      var newProps = (0, _assign2.default)({}, props, { feature: feature });
      return _react.Children.map(props.children, function (child) {
        return child ? (0, _react.cloneElement)(child, newProps) : null;
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var features = Array.isArray(this.props.data) ? this.props.data : this.props.data.features;
      var chroms = this.getColors();

      var _props3 = this.props,
          layerContainer = _props3.layerContainer,
          identity = _props3.identity,
          options = _objectWithoutProperties(_props3, ['layerContainer', 'identity']); //remove 


      return _react2.default.createElement(
        _reactLeaflet.FeatureGroup,
        { map: this.props.map, layerContainer: layerContainer, ref: function ref(layer) {
            return layer ? _this3.leafletElement = layer.leafletElement : null;
          } },
        features.map(function (feature, idx) {
          return _react2.default.createElement(_reactLeaflet.GeoJSON, _extends({
            key: identity ? identity(feature) : idx
          }, options, {
            style: _this3.getStyle(chroms, feature)
          }, _this3.getStyle(chroms, feature), {
            data: feature,
            children: _this3.props.children ? _this3.cloneChildrenWithFeature(_this3.props, feature) : _this3.props.children
          }));
        })
      );
    }
  }]);

  return Choropleth;
}(_react.Component);

exports.default = Choropleth;

