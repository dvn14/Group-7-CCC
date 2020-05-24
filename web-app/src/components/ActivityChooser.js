import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ActivityChooser extends Component {
  render() {
    const { id, text, icon, variant, className } = this.props.activity;
      return (
        <div>
          <Button variant={ variant }
            onClick={this.props.selectActivity.bind(this, id)}
            type="button"
            className={ className }>
              { text }
              <FontAwesomeIcon
                icon={ icon }
                size="2x"/>
            </Button>
        </div>
      )
    }
  }

ActivityChooser.propTypes = {
  activity: PropTypes.object.isRequired
}

export default ActivityChooser;
