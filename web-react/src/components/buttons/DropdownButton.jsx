import React from 'react'
import { Link } from 'react-router-dom'

const DropdownButton = (props) => {
  const { items } = props

  return (
    <div className="dropdoown">
      <button
        className="btn btn-primary dropdown-toggle"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Add
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton"
      >
        {items.map((item, index) => (
          <Link key={index} to={item.link} className="dropdown-item">
            {item.buttonText}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DropdownButton
