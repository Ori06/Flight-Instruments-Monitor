// Import components and CSS for the visual page
import Altitude from "../components/Altitude";
import HSI from "../components/HSI";
import ADI from "../components/ADI";
import "../css/Visual-Page.css";

// Define the expected props for the Visual-Page 
type VisualProps = {
  altValue: number; // Altitude value
  hsiValue: number; // HSI value
  adiValue: number; // ADI value
};

// Main VisualPage component to display the visual layout
export default function VisualPage({ altValue, hsiValue, adiValue }: VisualProps) {
  return (
    <div className="visual-page">
      {/* Left section: Altitude box */}
      <div className="alt-rectangle">
        <h2>
          Altitude / <span dir="rtl" className="hebrew-text">גובה</span>
        </h2>
        {/* Show the Altitude component with the given value */}
        <Altitude value={altValue} />
      </div>

      {/* Right section: Two boxes for HSI and ADI */}
      <div className="side-gauges">
        <div className="square-gauge">
          <h2>
            HSI / <span dir="rtl" className="hebrew-text">מצפן אופקי</span>
          </h2>
          {/* Show the HSI component with the given value */}
          <HSI value={hsiValue} />
        </div>

        <div className="square-gauge">
          <h2>
            ADI / <span dir="rtl" className="hebrew-text">תנוחת מטוס</span>
          </h2>
          {/* Show the ADI component with the given value */}
          <ADI value={adiValue} />
        </div>
      </div>
    </div>
  );
}
