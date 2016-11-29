import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import Picker from './Picker'
import Stations from './Stations'
import Nav from './Nav'
import SelectBound from './SelectBound'
import * as actions from '../actions'

let Modal = require('boron/DropModal');

export class Platform extends Component {
  showModal() {
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
    const { stations, reportIncident } = this.props;

    return (
      <div>
        <Nav />
        < br/>

        <SelectBound id="1" name="South" />
        <SelectBound id="2" name="North" />

        <Modal ref="modal">
          <Picker onChange={ this.handlePickerChanged.bind(this) }>
            <a
              className="waves-effect waves-light btn"
              onClick= { reportIncident }>Report</a>
          </Picker>
        </Modal>
          <Stations stations={ stations }>
            <a className="secondary-content btn-floating btn"
              onClick={ this.showModal.bind(this) }>
              <i className="material-icons">add</i>
            </a>
          </Stations>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stations: state.stations,
  selectedIncident: state.selectedIncident,
  incident: state.incident
})

export default connect(mapStateToProps, actions)(Platform)
