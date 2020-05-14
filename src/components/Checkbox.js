// CheckBox component used in Product and Promotion Widgets

import React from "react";
import * as helperFunctions from "../utils/helperFunction";
import "../css/Checkbox.css";

const Checkbox = ({ label, isSelected, onCheckboxChange, type }) => (
  <div className='product-form'>
    <label className='checkbox-label' id={`${label}_${type}`}>
      <input
        type='checkbox'
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className='input'
      />
      <span class='checkmark' />
      {helperFunctions.convertToTitleCase(label)}
    </label>
  </div>
);

export default Checkbox;
