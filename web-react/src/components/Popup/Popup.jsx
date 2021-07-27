import React from 'react'
import './Popup.css'

const Popup = (props) => {
  // if (!isOpen) {
  //   return null
  // }

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.children}
      </div>
    </div>
  )
}

export default Popup
