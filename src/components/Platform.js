import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Picker from './Picker'
import Stations from './Stations'
import Nav from './Nav'
import Footer from './Footer'
import SelectBound from './SelectBound'
import * as actions from '../actions'
import {getSelectedStation } from '../reducers'

let Modal = require('boron/DropModal');

export class Platform extends Component {
  handleOnStationClick(e, name) {
    e.preventDefault()
    const { selectStation } = this.props
    selectStation(name)
    this.refs.modal.show()
  }

  handlePickerChanged(incident) {
    const { selectIncident } = this.props
    selectIncident(incident)
  }

  hideModal() {
    this.refs.modal.hide()
  }

  componentWillReceiveProps(props) {
    const { incident } = props
    if (incident.created) {
      this.hideModal()
    }
  }

  render() {
    const {
      stations,
      reportIncident,
      selectedStation
    } = this.props;

    return (
      <div>
        <Nav />
        < br/>
        <div className="container">
          <p>
          OUTSMARTING MRT, TOGETHER.
          Get real-time help from fellow MRT riders.
          </p>

          <SelectBound id="1" name="South" />
          <SelectBound id="2" name="North" />

          <Modal ref="modal">
            <Picker onChange={this.handlePickerChanged.bind(this)} station={selectedStation}>
              <a
                className="waves-effect waves-light btn"
                onClick={reportIncident}>Report</a>
            </Picker>
          </Modal>

          <Stations
            stations={stations}
            onStationClick={this.handleOnStationClick.bind(this)}
          />
        </div>
       <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: state.stations,
  incident: state.incident,
  selectedStation: getSelectedStation(state)
})

export default connect(mapStateToProps, actions)(Platform)
