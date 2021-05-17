import './scss/main.scss'
import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import Templates from './template/templates.json'
// eslint-disable-next-line no-unused-vars
import FontAwesome from '../node_modules/@fortawesome/fontawesome-free/js/all.js'
import NavBar from './js/NavBar/NavBar.jsx'
import Conatiner from './js/Container/Conatiner.jsx'
import Footer from './js/Footer/Footer.jsx'
import { CustomEssayProvider } from './customEssayContext.jsx'
const App = () => {
  return (
    <CustomEssayProvider>
      <NavBar templates={Templates} />
      <Conatiner templates={Templates} />
      <Footer />
    </CustomEssayProvider>)
}

ReactDOM.render(<App />, document.getElementById('root'))
