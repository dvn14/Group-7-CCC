/* COMP90024 Cluster and Cloud Computing
   Assignment 2, Semester 1 2020
   City Analytics on the Cloud
   Team 7
   Kurniawan Lastanto - 1114056 - Melbourne
   Mochammad Chaerudin - 1041681 - Melbourne
   Devin Nanayakkara - 1132751 - Melbourne
   Abhishek Anand - 1005884 - Melbourne
   Shaik Anisuzzaman - 1060370 - Melbourne
 
   File:    ActivityChooser.js
   Purpose: A component for choosing daily activity.
*/

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
