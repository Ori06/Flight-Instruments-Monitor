// Import React, images, and the CSS for HSI
import React from "react";
import underlay from "../assets/hsi-underlay.png";
import overlay from "../assets/hsi-overlay.png";
import "../css/HSI.css";

// Define the props (one number: value in degrees)
interface HSIProps {
  value: number;
}

// HSI component: shows a static underlay and a rotating overlay based on the value
const HSI: React.FC<HSIProps> = ({ value }) => {
  return (
    <div className="hsi-container">
      {/* Underlay image stays fixed */}
      <img src={underlay} alt="HSI Underlay" className="hsi-underlay" />
      {/* Overlay rotates depending on the value */}
      <img
        src={overlay}
        alt="HSI Overlay"
        className="hsi-overlay"
        style={{ transform: `rotate(${-value}deg)` }}
      />
    </div>
  );
};

export default HSI;
