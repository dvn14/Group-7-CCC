import React from 'react'
import ListItem from './ListItem'

/**
 * Props:
 *  baseLayers
 *  checkhedBaseLayer
 *  overlays
 *  exclusiveGroups
 *  onBaseLayerChange
 *  onOverlayChange
 */

export default class RLGroupedLayerControlRC extends React.Component {
    constructor(props) {
        super(props);
        this.listItem = this.listItem.bind(this);
        this.reduceWithProps = this.reduceWithProps.bind(this);
        this.baseLayerChange = this.baseLayerChange.bind(this);
        this.state = { open: false }
        this.groups;
        this.id = Math.ceil(Math.random() * 1000);
    }

    /**
     * Events
     */
    mainDivMouseEnter(e) { this.state.open || this.setState({ open: true }); }
    mainDivMouseLeave(e) { this.setState({open: false}); }
    // Events End

    reduceWithProps() {
        this.groups = this.props.overlays && this.props.overlays.reduce((a, b) => {
            if (typeof a[b.groupTitle] === 'undefined') {
                a[b.groupTitle] = {
                    exclusive: undefined,
                    groupItems: []
                }
            }
            if (typeof a[b.groupTitle]['exclusive'] === 'undefined') {
                if (this.props.exclusiveGroups && this.props.exclusiveGroups.includes(b.groupTitle)) {
                    a[b.groupTitle]['exclusive'] = true;
                } else {
                    a[b.groupTitle]['exclusive'] = false;
                }
            }
            a[b.groupTitle]['groupItems'].push(b);
            return a;
        }, { init: true });
        this.groupTitles = this.props.overlays && Array.from(new Set(this.props.overlays.map(e => e.groupTitle)))
    }

    groupContainer(groupTitle, groupElemans, key) {
        return (
            <div key={key} className={`rlglc-group`}>
                {groupTitle}
                {groupElemans}
            </div>
        )
    }

    listItem(groupName, e, checked, type, onClick) {
        return (
            <ListItem
                key={`${e.name}-${this.id}`}
                groupName={groupName}
                id={this.id}
                e={e}
                checked={checked}
                type={type}
                onClick={onClick} />
        )
    }

    overlayChanged(exclusive, event) {
        const overlays = [...this.props.overlays];
        const id = event.target.getAttribute('data-layername');
        let newOverlays;
        if (exclusive === 'exclusive') {
            // event.target true other items in exclusive group is false
            newOverlays = overlays.map((overlay, index) => {
                if ((`${overlay.groupTitle}-${this.id}`) === `${event.target.name}`) {
                    return {
                        checked: (overlay.name === id),
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    }
                }
                return overlay;
            });
        }
        if (exclusive === 'nonExclusive') {
            // change with event.target.checked true or false
            newOverlays = overlays.map((overlay, index) => {
                if ((`${overlay.groupTitle}-${this.id}`) === `${event.target.name}` && overlay.name === id) {
                    return {
                        checked: event.target.checked,
                        groupTitle: overlay.groupTitle,
                        name: overlay.name,
                        title: overlay.title
                    }
                }
                return overlay;
            });
        }

        if (this.props.onOverlayChange) {
            this.props.onOverlayChange(newOverlays);
        }
    }
    shouldComponentUpdate

    baseLayerChange(event) {
        if (this.props.onBaseLayerChange) {
            this.props.onBaseLayerChange(event.target.getAttribute('data-layername'));
        }
    }

    setMaxHeight() {
        const containerRect = this.props.map.getContainer().getBoundingClientRect();
        const divRect = this.div.getBoundingClientRect();
        const maxHeight = `${Math.floor((containerRect.bottom - divRect.y) * 0.95)}px`
        this.div.style.maxHeight = maxHeight;
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.open) {
                this.setState({
                    open: true
                })
            }
        }, 1)
        this.setMaxHeight();
    }

    render() {
        this.reduceWithProps();
        const baseGroup = this.groupContainer(
            (<span key={`title-baselayer`} className={`rlglc-grouptitle`}>Base Layers</span>),
            (
                this.props.baseLayers.map(
                    (e, i) => this.listItem(
                        'baselayer',
                        e,
                        (e.name === this.props.checkedBaseLayer), 'radio',
                        this.baseLayerChange
                    )
                )
            ), `baselayer`
        );

        const groups = this.props.overlays ? this.groupTitles.reduce((a, b) => {
            const groupTitle = (<span key={`title-${b}`} className={`rlglc-grouptitle`}>{b}</span>)
            let groupElemans;
            if (this.props.exclusiveGroups && this.props.exclusiveGroups.includes(b)) {
                // exclusives
                groupElemans = this.groups[b].groupItems.map((e, i) => {
                    return this.listItem(b, e, e.checked, 'radio',
                        this.overlayChanged.bind(this, 'exclusive')
                    )
                });
            } else {
                // standard overlays
                groupElemans = this.groups[b].groupItems.map((e, i) => {
                    return this.listItem(b, e, e.checked, 'checkbox',
                        this.overlayChanged.bind(this, 'nonExclusive')
                    )
                });
            }
            return [...a, this.groupContainer(groupTitle, groupElemans, b)];
        }, []) : null;

        return (
            <div
                ref={ref=>(this.div=ref)}
                className = {`rlglc${this.state.open ? ' rlglc-active' : ''}`}
                onMouseEnter={this.mainDivMouseEnter.bind(this)}
                onMouseLeave={this.mainDivMouseLeave.bind(this)}
            >
                <a className={`rlglc-a`}>
                    <div className={this.state.open ? 'rlglc-open' : 'rlglc-close'}>
                        {baseGroup}
                        {
                            this.props.overlays ?
                                <div className={`rlglc-seperator`}></div> : null
                        }
                        { groups }
                    </div>
                </a>
            </div>
        )
    }
}
