import './scss/main.scss';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import Templates from "./template/templates.json";
import FontAwesome  from "../node_modules/@fortawesome/fontawesome-free/js/all.js"
import NavBar from './js/NavBar/NavBar.jsx';
import Conatiner from './js/Container/Conatiner.jsx';
import Footer from './js/Footer/Footer.jsx';
const App = () => {
  const { useEffect } = React;
  useEffect(() => {
    let $ = require('jquery');
    $('#friend-tab').tab('show');
  }, []);
  return (<div>
    <NavBar templates={Templates} />
    <Conatiner templates={Templates} />
    <Footer />
  </div>);
};

ReactDOM.render(<App />, document.getElementById('root'));