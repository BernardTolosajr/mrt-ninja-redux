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
                <option value="Delayed">Delayed</option>
                <option value="Crowded">Crowded</option>
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
