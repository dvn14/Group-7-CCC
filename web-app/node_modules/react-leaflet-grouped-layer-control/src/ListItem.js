import React from 'react'

export default class RLGroupedLayerControlRC extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      checked: this.props.checked
    }
  }

  render() {
    const { groupName, e, checked, type, onClick, id } = this.props;
    return (
      <label
          htmlFor = {
            `${groupName}-${e.name}-${id}`
          }
          key={`${e.name}-${id}`}
          className={`rlglc-option`}>
          <input
              name={`${groupName}-${id}`}
              data-layername={e.name}
              id = {
                `${groupName}-${e.name}-${id}`
              }
              className={`rlglc-input`}
              type={type}
              checked={checked}
              readOnly={true}
              onClick={onClick || (() => {})}
          />
          <span className={`rlglc-title`}>{e.title}</span>
      </label>
    )
  }

  onClick(...e) {
    if (this.state.checked && this.props.type === 'radio') {
    } else {
      this.setState({ checked: !this.state.checked },
      );
      this.props.onClick(...e)
    }
  }

}
