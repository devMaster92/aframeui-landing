import React from "react";
import * as helperFunctions from "../utils/helperFunction";
import "../css/radio.css";

const Radio = ({ label, isSelected, onRadioChange, type }) => (
  <div className='promo-form'>
    <label className='radio-label' id={`${label}_${type}`}>
      <input
        type='radio'
        value={label}
        checked={isSelected}
        onChange={onRadioChange}
        className='input'
      />
      <span class='radiomark' />
      {helperFunctions.convertToTitleCase(label)}
    </label>
  </div>
);

export default Radio;
