'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Props:
 *  baseLayers
 *  checkhedBaseLayer
 *  overlays
 *  exclusiveGroups
 *  onBaseLayerChange
 *  onOverlayChange
 */

var RLGroupedLayerControlRC = function (_React$Component) {
    _inherits(RLGroupedLayerControlRC, _React$Component);

    function RLGroupedLayerControlRC(props) {
        _classCallCheck(this, RLGroupedLayerControlRC);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.listItem = _this.listItem.bind(_this);
        _this.reduceWithProps = _this.reduceWithProps.bind(_this);
        _this.baseLayerChange = _this.baseLayerChange.bind(_this);
        _this.state = { open: false };
        _this.groups;
        _this.id = Math.ceil(Math.random() * 1000);
        return _this;
    }

    /**
     * Events
     */


    RLGroupedLayerControlRC.prototype.mainDivMouseEnter = function mainDivMouseEnter(e) {
        this.state.open || this.setState({ open: true });
    };

    RLGroupedLayerControlRC.prototype.mainDivMouseLeave = function mainDivMouseLeave(e) {
        this.setState({ open: false });
    };
    // Events End

    RLGroupedLayerControlRC.prototype.reduceWithProps = function reduceWithProps() {
        var _this2 = this;

        this.groups = this.props.overlays && this.props.overlays.reduce(function (a, b) {
            if (typeof a[b.groupTitle] === 'undefined') {
                a[b.groupTitle] = {
                    exclusive: undefined,
                    groupItems: []
                };
            }
            if (typeof a[b.groupTitle]['exclusive'] === 'undefined') {
                if (_this2.props.exclusiveGroups && _this2.props.exclusiveGroups.includes(b.groupTitle)) {
                    a[b.groupTitle]['exclusive'] = true;
                } else {
                    a[b.groupTitle]['exclusive'] = false;
                }
            }
            a[b.groupTitle]['groupItems'].push(b);
            return a;
        }, { init: true });
        this.groupTitles = this.props.overlays && Array.from(new Set(this.props.overlays.map(function (e) {
            return e.groupTitle;
        })));
    };

    RLGroupedLayerControlRC.prototype.groupContainer = function groupContainer(groupTitle, groupElemans, key) {
        return _react2.default.createElement(
            'div',
            { key: key, className: 'rlglc-group' },
            groupTitle,
            groupElemans
        );
    };

    RLGroupedLayerControlRC.prototype.listItem = function listItem(groupName, e, checked, type, onClick) {
        return _react2.default.createElement(_ListItem2.default, {
            key: e.name + '-' + this.id,
            groupName: groupName,
            id: this.id,
            e: e,
            checked: checked,
            type: type,
            onClick: onClick });
    };

    RLGroupedLayerControlRC.prototype.overlayChanged = function overlayChanged(exclusive, event) {
        var _this3 = this;

        var overlays = [].concat(this.props.overlays);
        var id = event.target.getAttribute('data-layername');
        var newOverlays = void 0;
        if (exclusive === 'exclusive') {
            // event.target true other items in exclusive group is false
            newOverlays = overlays.map(function (overlay, index) {
                if (overlay.groupTitle + '-' + _this3.id === '' + event.target.name) {
                    return {
                        checked: overlay.name === id,
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    };
                }
                return overlay;
            });
        }
        if (exclusive === 'nonExclusive') {
            // change with event.target.checked true or false
            newOverlays = overlays.map(function (overlay, index) {
                if (overlay.groupTitle + '-' + _this3.id === '' + event.target.name && overlay.name === id) {
                    return {
                        checked: event.target.checked,
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    };
                }
                return overlay;
            });
        }

        if (this.props.onOverlayChange) {
            this.props.onOverlayChange(newOverlays);
        }
    };

    RLGroupedLayerControlRC.prototype.baseLayerChange = function baseLayerChange(event) {
        if (this.props.onBaseLayerChange) {
            this.props.onBaseLayerChange(event.target.getAttribute('data-layername'));
        }
    };

    RLGroupedLayerControlRC.prototype.setMaxHeight = function setMaxHeight() {
        var containerRect = this.props.map.getContainer().getBoundingClientRect();
        var divRect = this.div.getBoundingClientRect();
        var maxHeight = Math.floor((containerRect.bottom - divRect.y) * 0.95) + 'px';
        this.div.style.maxHeight = maxHeight;
    };

    RLGroupedLayerControlRC.prototype.componentDidMount = function componentDidMount() {
        var _this4 = this;

        setInterval(function () {
            if (_this4.state.open) {
                _this4.setState({
                    open: true
                });
            }
        }, 1);
        this.setMaxHeight();
    };

    RLGroupedLayerControlRC.prototype.render = function render() {
        var _this5 = this;

        this.reduceWithProps();
        var baseGroup = this.groupContainer(_react2.default.createElement(
            'span',
            { key: 'title-baselayer', className: 'rlglc-grouptitle' },
            'Base Layers'
        ), this.props.baseLayers.map(function (e, i) {
            return _this5.listItem('baselayer', e, e.name === _this5.props.checkedBaseLayer, 'radio', _this5.baseLayerChange);
        }), 'baselayer');

        var groups = this.props.overlays ? this.groupTitles.reduce(function (a, b) {
            var groupTitle = _react2.default.createElement(
                'span',
                { key: 'title-' + b, className: 'rlglc-grouptitle' },
                b
            );
            var groupElemans = void 0;
            if (_this5.props.exclusiveGroups && _this5.props.exclusiveGroups.includes(b)) {
                // exclusives
                groupElemans = _this5.groups[b].groupItems.map(function (e, i) {
                    return _this5.listItem(b, e, e.checked, 'radio', _this5.overlayChanged.bind(_this5, 'exclusive'));
                });
            } else {
                // standard overlays
                groupElemans = _this5.groups[b].groupItems.map(function (e, i) {
                    return _this5.listItem(b, e, e.checked, 'checkbox', _this5.overlayChanged.bind(_this5, 'nonExclusive'));
                });
            }
            return [].concat(a, [_this5.groupContainer(groupTitle, groupElemans, b)]);
        }, []) : null;

        return _react2.default.createElement(
            'div',
            {
                ref: function ref(_ref) {
                    return _this5.div = _ref;
                },
                className: 'rlglc' + (this.state.open ? ' rlglc-active' : ''),
                onMouseEnter: this.mainDivMouseEnter.bind(this),
                onMouseLeave: this.mainDivMouseLeave.bind(this)
            },
            _react2.default.createElement(
                'a',
                { className: 'rlglc-a' },
                _react2.default.createElement(
                    'div',
                    { className: this.state.open ? 'rlglc-open' : 'rlglc-close' },
                    baseGroup,
                    this.props.overlays ? _react2.default.createElement('div', { className: 'rlglc-seperator' }) : null,
                    groups
                )
            )
        );
    };

    return RLGroupedLayerControlRC;
}(_react2.default.Component);

exports.default = RLGroupedLayerControlRC;