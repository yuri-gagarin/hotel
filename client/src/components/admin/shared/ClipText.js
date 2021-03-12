import React from "react";
import PropTypes from "prop-types";
// styles and css //
import styles from "./css/clipText.module.css";

const ClipText = ({ text, className, textId, fontSize, letterSpacing }) => {

  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" className={ className }>
      <defs>
        <pattern id="pattern" width="1" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="0" y="0" width="1" height=".8" fill="#ffffff"/>
        </pattern>
          
        <text id={textId} y="50%" x="50%" fontFamily="'Oswald', sans-serif" fontSize={ fontSize ? fontSize : "3em"} letterSpacing={ letterSpacing ? letterSpacing : "15px"} textAnchor="middle" dominantBaseline="middle">{ text }</text>
        
        <mask id="mask">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
          <use x="-6" y="-6" stroke="#000" strokeWidth="5" xlinkHref="#text" opacity="1" fill="#000"/>
        </mask>
      </defs>
    
      <use x="6" y="6" xlinkHref={`#${textId}`} opacity="1" fill="url(#pattern)" mask="url(#mask)"/>
        
      <use x="0" y="0" xlinkHref={`#${textId}`} fill="#fff"/>
    </svg>
  );
};

ClipText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  textId: PropTypes.string.isRequired,
  fontSize: PropTypes.string,
  letterSpacing: PropTypes.string
};

export default ClipText;

/*

<svg x="50%" overflow="visible">
  <polygon fill="black" points="0 38 56 0 -38 0" />
</svg>
*/