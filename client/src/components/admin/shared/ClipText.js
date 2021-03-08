import React from "react";
import PropTypes from "prop-types";
// styles and css //
import styles from "./css/clipText.module.css";

const ClipText = ({ text, className }) => {

  return (
    <svg width="100%" className={ className }>
      <defs>
        <mask id="myMask" x="0" y="0" width="100%" height="100%">
          <rect fill="white" x="0" y="0" width="100%" height="100%" />

          <text fill="#999" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="2em" fill="#999" stroke="red" strokeWidth="4px">{ text }</text>  
        </mask>
      </defs>

      <rect id="baseMask" mask="url(#myMask)" x="0" y="0" width="100%" height="100%" />
    </svg>
  );
};

ClipText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ClipText;

/*

<svg x="50%" overflow="visible">
  <polygon fill="black" points="0 38 56 0 -38 0" />
</svg>
*/