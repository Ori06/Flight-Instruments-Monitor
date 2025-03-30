// Import CSS and overlay image for ADI
import "../css/ADI.css";
import overlay from "../assets/adi-overlay.png";

// Define props (value between -100 and 100)
type Props = {
  value: number;
};

// ADI component: draws a circle with a fill, a line, and an overlay image
export default function ADI({ value }: Props) {
  // Clamp value between -100 and 100
  const clamped = Math.max(-100, Math.min(100, value));
  // Get a percentage from the clamped value
  const percent = Math.abs(clamped);
  // Determine fill direction: if value positive, fill from top; else from bottom
  const direction = clamped > 0 ? "top" : "bottom";

  return (
    <div className="adi-circle">
      {/* Fill area grows with the value */}
      <div
        className={`adi-fill ${direction}`}
        style={{ height: `${percent}%` }}
      />
      {/* Center black line */}
      <div className="adi-line" />
      {/* Overlay image on top */}
      <img src={overlay} className="adi-overlay" alt="ADI Overlay" />
    </div>
  );
}
