import React from 'react'

const Bound = ({id, name, onBoundChange}) => {
  return (
        <div>
          <input
            id={id}
            name="group1"
            type="radio"
            onChange={e => onBoundChange(name) }/>

          <label htmlFor={id}>{name} Bound</label>
        </div>
  )
}

export default Bound
