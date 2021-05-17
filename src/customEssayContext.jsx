// https://kentcdodds.com/blog/how-to-use-react-context-effectively
import * as React from 'react'
import PropTypes from 'prop-types'
const CustomEssayContext = React.createContext({
  customEssay: {
    title: '',
    inputrule: [],
    template: [
      [
        []
      ]
    ]
  }
})
function customEssayReducer (state, action) {
  if (action.title && action.inputrule && action.template) {
    return { customEssay: action }
  }
  return state
}
function CustomEssayProvider ({ children }) {
  const [state, dispatch] = React.useReducer(customEssayReducer, {
    customEssay: {
      title: '',
      inputrule: [],
      template: [
        [
          []
        ]
      ]
    }
  })
  const value = { state, dispatch }
  return (
    <CustomEssayContext.Provider value={value}>
      {children}
    </CustomEssayContext.Provider>
  )
}
CustomEssayProvider.propTypes = {
  children: PropTypes.array
}
function useCustomEssay () {
  const context = React.useContext(CustomEssayContext)
  if (context === undefined) {
    throw new Error('useCustomEssay must be used within a CustomEssayContext')
  }
  return context
}
export { CustomEssayProvider, useCustomEssay }
