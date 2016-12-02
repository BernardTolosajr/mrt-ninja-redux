import React from 'react'

const Status = ({status}) => {
  if (status.includes('Normal')) {
    return (
      <i className="material-icons circle green"></i>
    )
  } else {
    return (
      <i className="material-icons circle red"></i>
    )
  }
}

export default Status
