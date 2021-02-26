import React from "react";
const InputItem = ({ id, type, description, hint, updateValue }) => {
  const Tag = type;
  const placeholder = hint ? hint : "";
  return (
    <div className="px-3">
      <label htmlFor={id}>{description}</label>
      <div className="input-group mb-3">
        <Tag type="text" className="form-control" id={id} placeholder={placeholder} onChange={(e) => updateValue(id, e.target.value)}></Tag>
      </div>
    </div>
  );
}
export default InputItem;