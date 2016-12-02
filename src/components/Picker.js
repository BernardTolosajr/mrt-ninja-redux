import React, { Component } from 'react'

class Picker extends Component {
  render() {
    const { onChange, station } = this.props
    return (
        <div className="row">
          <form className="col s12">
            <h5>{station} Station</h5>
            <div className="row">
              <div className="input-field col s12">
                <select onChange={e => onChange(e.target.value) } className="browser-default">
                <option defaultValue="">Select Incident</option>
                <option value="Delayed train">Delayed train</option>
                <option value="Train too crowded to board">Train too crowded to board</option>
                <option value="Overcrowded platform">Overcrowded platform</option>
                <option value="Overcrowded train">Overcrowded train</option>
                <option value="Train stopped between stations">Train stopped between stations</option>
                <option value="Disabled train">Disabled train</option>
                <option value="Medical emergency">Medical emergency</option>
                <option value="Police action">Police action</option>
                <option value="Normal conditions">Normal conditions</option>
              </select>
              </div>
            </div>
            {this.props.children}
          </form>
        </div>
    )
  }
}

export default Picker
