import React from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField.jsx'
import { useCustomEssay } from '../../customEssayContext.jsx'
const Conatiner = ({ templates }) => {
  const { state } = useCustomEssay()
  const { useState, useEffect } = React
  const [essays, setEssays] = useState([])
  const [isInit, setIsInit] = useState(false)
  useEffect(() => {
    templates.forEach(({ filename }) => {
      import('../../template/' + filename + '.json').then(Essay => {
        setEssays(prevEssays => {
          return prevEssays.concat(
            <div className="tab-pane fade" id={filename} role="tabpanel" aria-labelledby={filename + '-tab'} key={Essay.title}>
              <InputField Essay={Essay} />
            </div>
          )
        })
        if (!isInit) {
          const defaultTag = 'friend'
          const $ = require('jquery')
          const targetTab = $('#' + defaultTag + '-tab')
          const targetPage = $('#' + defaultTag + '')
          if (targetTab && targetTab.length > 0 && targetPage && targetPage.length > 0) {
            setIsInit(true)
            targetTab.tab('show')
          }
        }
      })
    })
  }, [])
  useEffect(() => {
    const { customEssay } = state
    if (customEssay.title === '') return
    setEssays(prevEssays => {
      return prevEssays.concat(
        <div className="tab-pane fade" id={customEssay.title} role="tabpanel" aria-labelledby={customEssay.title + '-tab'} key={customEssay.title}>
          <InputField Essay={customEssay} />
        </div>
      )
    })
  }, [state])
  return (
    <main role="main" style={{ minHeight: '850px' }}>
      <div className="container-fluid" >
        <div className="tab-content my-3" id="tabContent">
          {essays}
        </div>
      </div>
    </main>
  )
}
Conatiner.propTypes = {
  templates: PropTypes.array
}
export default Conatiner
