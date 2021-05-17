import React from 'react'
import PropTypes from 'prop-types'
const HeaderNavItem = ({ name, displayName }) => {
  return (
    <li className="nav-item" role="presentation">
      <a className="nav-link" data-toggle="tab" id={name + '-tab'} href={'#' + name} role="tab" aria-controls={name} aria-selected="false">{displayName}</a>
    </li>)
}
HeaderNavItem.propTypes = {
  name: PropTypes.string,
  displayName: PropTypes.string
}
export default HeaderNavItem
