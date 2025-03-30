// Import React, the altitude bar image, and its CSS
import React from "react";
import bar from "../assets/altitude-bar.png";
import "../css/Altitude.css";

// Define props: value is a number (0 to 3000)
interface AltitudeProps {
  value: number;
}

// Altitude component: shows a background image and a red indicator bar that moves
const Altitude: React.FC<AltitudeProps> = ({ value }) => {
  // Clamp the altitude value between 0 and 3000
  const altitude = Math.max(0, Math.min(3000, value));

  // Calculate the usable height for the indicator (based on container height minus padding)
  const usableHeight = 488; // 500 - (10px padding)
  const offsetBottom = 0; // start position at bottom

  // Convert altitude value to pixels from bottom
  const pixelsFromBottom = (altitude / 3000) * usableHeight + offsetBottom;

  return (
    <div className="altitude-container">
      {/* Background image for altitude scale */}
      <img src={bar} alt="Altitude Bar" className="altitude-image" />
      {/* Red indicator that moves based on altitude */}
      <div
        className="altitude-indicator"
        style={{ bottom: `${pixelsFromBottom}px` }}
      />
    </div>
  );
};

export default Altitude;
