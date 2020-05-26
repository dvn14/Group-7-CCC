/* COMP90024 Cluster and Cloud Computing
   Assignment 2, Semester 1 2020
   City Analytics on the Cloud
   Team 7
   Kurniawan Lastanto - 1114056 - Melbourne
   Mochammad Chaerudin - 1041681 - Melbourne
   Devin Nanayakkara - 1132751 - Melbourne
   Abhishek Anand - 1005884 - Melbourne
   Shaik Anisuzzaman - 1060370 - Melbourne
 
   File:    Header.js
   Purpose: The header component for web-app.
*/

import React, { Component } from 'react';
import { Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';

export class Header extends Component {
  state = {
    aboutShown: false,
    area: "AUS"
  }

  showAbout = (shown) => {
    this.setState({ aboutShown: !this.state.aboutShown })
  }
  
  selectArea = (area) => {
    this.setState({ area })
    this.props.selectArea(area)
  }
  render() {
    return (
    <>
        <header>
          <h1 className="text1">Activities in {this.state.area}</h1>
          <h2 className="text2">#AustraliaLockdown</h2>
          <DropdownButton
            className="area-selector" variant="outline-warning"
            onSelect={e => {this.selectArea(e)}}
            id="dropdown-basic-button"
            title="Select Area">
              <Dropdown.Item eventKey="aus">Australia</Dropdown.Item>
              <Dropdown.Item eventKey="nsw">New South Wales</Dropdown.Item>
            </DropdownButton>
          <Button
            variant="outline-warning" className="text3"
            onClick={this.showAbout}>About this map
          </Button>
        </header>
        <Modal show={this.state.aboutShown} onHide={this.showAbout}>
          <Modal.Header closeButton>
            <Modal.Title>Activities during #AustraliaLockdown</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>This map shows popular activities in Australian metropolitan
              areas as well as New South Wales during #LockdownAustralia based
              on Twitter data.</p>
            <p>This application is developed for Cluster and Cloud Computing
              assigment 2 Semester 1 2020 by</p>
            <ul>
              <li>klastanto@student.unimelb.edu.au</li>
              <li>mchaerudin@student.unimelb.edu.au</li>
              <li>sanisuzzaman@student.unimelb.edu.au</li>
              <li>devinvinun@student.unimelb.edu.au</li>
              <li>abhisheka@student.unimelb.edu.au</li>
            </ul>
            Credits:
            <ul>
            <li>Map provider: OpenStreetMap by OpenStreetMap contributors</li>
            <li>Data provider: Twitter, AURIN</li>
            <li>Icons provider: Fontawesome (CC BY 4.0 License)</li>
            </ul>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.showAbout}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    </>
    )
}
}

export default Header;
