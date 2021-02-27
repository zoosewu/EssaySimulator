import React from "react";
import HeaderNavItem from "./HeaderNavItem.jsx";
const NavBar = ({ templates }) => {
  const navitems = templates.map(
    function ({ displayname, filename }) { console.log(displayname, filename); return <HeaderNavItem displayName={displayname} key={filename} name={filename} /> }
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">文體產生器</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav mr-auto" id="tab">
          {navitems}
        </ul>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="還不能用" aria-label="Search"></input>
          <button className="btn btn-outline-info my-2 my-sm-0" type="submit" role="tab" aria-controls="custome" aria-label="" selected={false}>載入自訂模板</button>
        </form>
      </div>
    </nav>
  );
}
export default NavBar;