import React from 'react'
import PropTypes from 'prop-types'
import HeaderNavItem from './HeaderNavItem.jsx'
import UploadCustomEssay from './UploadCustomEssay.jsx'
import { useCustomEssay } from '../../customEssayContext.jsx'
const NavBar = ({ templates }) => {
  const { state } = useCustomEssay()
  const { useState, useEffect } = React
  const [navItem, setNavItem] = useState([])
  useEffect(() => {
    setNavItem(templates.map(
      function ({ displayname, filename }, index) { return <HeaderNavItem displayName={displayname} key={index} name={filename} /> }
    ))
  }, [])
  useEffect(() => {
    const { customEssay } = state
    if (customEssay.title === '') return
    setNavItem(prevNavItem => {
      const newNavItem = <HeaderNavItem displayName={customEssay.title} key={prevNavItem.length} name={customEssay.title} />
      console.log(newNavItem)
      return prevNavItem.concat(newNavItem)
    })
    setTimeout(() => {
      const $ = require('jquery')
      $('#' + customEssay.title + '-tab').tab('show')
    }, 50)
  }, [state])
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">文體產生器</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="nav navbar-nav mr-auto" id="tab">
          {navItem}
        </ul>
        <UploadCustomEssay />
      </div>
    </nav >
  )
}
NavBar.propTypes = {
  templates: PropTypes.array
}
export default NavBar
