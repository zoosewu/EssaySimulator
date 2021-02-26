import React from "react";
import InputField from "./InputField.jsx";
const NavBar = ({ templates }) => {
  const inputDatas = {};
  const Essays = templates.map(function ({ filename }) { return <InputField filename={filename} key={filename} /> });
  return (
    <main role="main" style={{ minHeight: "850px" }}>
      <div className="container-fluid" >
        <div className="tab-content my-3" id="tabContent">
          {Essays}
        </div>
      </div>
    </main>
  );
}
export default NavBar;