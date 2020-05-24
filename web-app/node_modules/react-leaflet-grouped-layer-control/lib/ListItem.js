'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RLGroupedLayerControlRC = function (_React$Component) {
  _inherits(RLGroupedLayerControlRC, _React$Component);

  function RLGroupedLayerControlRC(props) {
    _classCallCheck(this, RLGroupedLayerControlRC);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.state = {
      checked: _this.props.checked
    };
    return _this;
  }

  RLGroupedLayerControlRC.prototype.render = function render() {
    var _props = this.props,
        groupName = _props.groupName,
        e = _props.e,
        checked = _props.checked,
        type = _props.type,
        onClick = _props.onClick,
        id = _props.id;

    return _react2.default.createElement(
      'label',
      {
        htmlFor: groupName + '-' + e.name + '-' + id,
        key: e.name + '-' + id,
        className: 'rlglc-option' },
      _react2.default.createElement('input', {
        name: groupName + '-' + id,
        'data-layername': e.name,
        id: groupName + '-' + e.name + '-' + id,
        className: 'rlglc-input',
        type: type,
        checked: checked,
        readOnly: true,
        onClick: onClick || function () {}
      }),
      _react2.default.createElement(
        'span',
        { className: 'rlglc-title' },
        e.title
      )
    );
  };

  RLGroupedLayerControlRC.prototype.onClick = function onClick() {
    if (this.state.checked && this.props.type === 'radio') {} else {
      var _props2;

      this.setState({ checked: !this.state.checked });
      (_props2 = this.props).onClick.apply(_props2, arguments);
    }
  };

  return RLGroupedLayerControlRC;
}(_react2.default.Component);

exports.default = RLGroupedLayerControlRC;