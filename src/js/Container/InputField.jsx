import React from "react";
import InputItem from "./InputItem.jsx";
import GeneratePost from "./GeneratePost.jsx";
const InputField = ({ filename }) => {
  const { useState, useEffect } = React;
  const [title, setTitle] = useState("");
  const [inputItems, setInputItems] = useState([]);
  const [postTemplates, setPostTemplates] = useState([]);
  const [inputDatas, setInputDatas] = useState({});
  const [post, setPost] = useState("");
  useEffect(() => import("../../template/" + filename + ".json").then(({ title, inputrule, template }) => {
    setTitle(title);
    setInputItems(inputrule.map(
      function ({ id, type, description, hint }) { return <InputItem id={id} key={id} type={type} description={description} hint={hint} updateValue={updateValue} /> }
    ));
    setPostTemplates(template);
    const tempdata = { inputrule };
    for (let i = 0; i < inputrule.length; i++) tempdata[inputrule[i].id] = "";
    setInputDatas(tempdata);
  }), []);
  const updateValue = (key, value) => {
    setInputDatas(prevInputDatas => {
      let updatedInputDatas = { ...prevInputDatas };
      updatedInputDatas[key] = value;
      console.log(key, value, updatedInputDatas, prevInputDatas);
      return updatedInputDatas;
    });
  }
  // console.log(title, inputItems, postTemplates, inputDatas, post);

  const postClasses = post && post.length > 0 ? "card-body" : "";
  return (
    <div className="tab-pane fade" id={filename} role="tabpanel" aria-labelledby={filename + "-tab"}>
      <h1 className="mb-3 text-center">{title}</h1>
      <div className="row mb-3">
        <div className="col-12 col-md-6">
          {inputItems}
          <div className="px-3">
            <div className="input-group mb-3">
              <button type="button" className="btn btn-primary" onClick={() => setPost(GeneratePost(inputDatas, postTemplates))}>產生文章</button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card px-3">
            <span id="post" className={postClasses} style={{ whiteSpace: "pre-line" }}>{post}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputField;