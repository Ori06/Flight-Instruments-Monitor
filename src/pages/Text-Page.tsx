// Import the CSS for the text page layout
import "../css/Text-Page.css";

// Define the props for the TextPage component
type TextPageProps = {
  altValue: number; // Altitude value
  hsiValue: number; // HSI value
  adiValue: number; // ADI value
};

// Main TextPage component to show instrument details as text boxes
export default function TextPage({ altValue, hsiValue, adiValue }: TextPageProps) {
  return (
    <div className="text-page">
      {/* 1. Altitude info box */}
      <div className="text-box">
        <h3>
          Altitude / <span dir="rtl" className="hebrew-text">גובה</span>
        </h3>
        <p>
          <span className="value-text">{altValue} m</span>
        </p>
        <p>
          Altitude shows the aircraft's height above sea level. It is important for safe navigation.
        </p>
      </div>

      {/* 2. HSI info box */}
      <div className="text-box">
        <h3>
          HSI / <span dir="rtl" className="hebrew-text">מצפן אופקי</span>
        </h3>
        <p>
          <span className="value-text">{hsiValue}°</span>
        </p>
        <p>
          HSI combines a heading indicator with navigation signals for direction control.
        </p>
      </div>

      {/* 3. ADI infor box */}
      <div className="text-box">
        <h3>
          ADI / <span dir="rtl" className="hebrew-text">תנוחת מטוס</span>
        </h3>
        <p>
          <span className="value-text">{adiValue}°</span>
        </p>
        <p>
          ADI displays the aircraft's pitch and roll relative to the horizon.
        </p>
      </div>

      {/* 4. Empty box with a background image */}
      <div className="text-box background-box">
        {/* The background gif will be here */}
      </div>
    </div>
  );
}
