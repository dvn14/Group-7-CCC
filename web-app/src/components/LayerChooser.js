import React, { Component } from "react";
import PropTypes from "prop-types";

import { Dropdown, DropdownButton } from 'react-bootstrap';

export class LayerChooser extends Component {

  selectLayer = (content) => {
    this.props.selectLayer(content)
  }
  
  render() {
    const { text, variant, className, contents } = this.props.layer;
      return (
        <div>
          <DropdownButton
            className={ className }
            variant={ variant }
            id="dropdown-basic-button"
            title={ text }>
              { contents.map(content => (
                <Dropdown.Item
                  key={ content.id }
                  eventKey={ content.id }
                  onSelect={ () => this.selectLayer(content) }>{ content.text }
                </Dropdown.Item>
              )) }
          </DropdownButton>
        </div>
      )
    }
  }

LayerChooser.propTypes = {
  layer: PropTypes.object.isRequired
}

export default LayerChooser;
