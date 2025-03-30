// Import useState hook and the CSS for the dialog
import { useState } from "react";
import "../css/Dialog.css";

// Define props: functions to submit data and close the dialog
type Props = {
  onSubmit: (data: { altitude: number; hsi: number; adi: number }) => void;
  onClose: () => void;
};

// Dialog component: lets the user input instrument values via text fields
export default function Dialog({ onSubmit, onClose }: Props) {
  // Save input values as strings for easy validation
  const [altitude, setAltitude] = useState("1500");
  const [hsi, setHsi] = useState("180");
  const [adi, setAdi] = useState("0");

  // Save error messages for each input
  const [altError, setAltError] = useState("");
  const [hsiError, setHsiError] = useState("");
  const [adiError, setAdiError] = useState("");

  // Validate and update altitude input
  const handleAltitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^-?\d*\.?\d*$/.test(val) && val !== "") return;
    setAltitude(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setAltError("Invalid number");
    } else if (num < 0 || num > 3000) {
      setAltError("Altitude must be between 0 and 3000");
    } else {
      setAltError("");
    }
  };

  // Validate and update HSI input
  const handleHsiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^-?\d*\.?\d*$/.test(val) && val !== "") return;
    setHsi(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setHsiError("Invalid number");
    } else if (num < 0 || num > 360) {
      setHsiError("HSI must be between 0 and 360");
    } else {
      setHsiError("");
    }
  };

  // Validate and update ADI input
  const handleAdiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^-?\d*\.?\d*$/.test(val) && val !== "") return;
    setAdi(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setAdiError("Invalid number");
    } else if (num < -100 || num > 100) {
      setAdiError("ADI must be between -100 and 100");
    } else {
      setAdiError("");
    }
  };

  // Handle submit button click. If errors, show alert; else submit values.
  const handleSubmit = () => {
    if (altError || hsiError || adiError) {
      alert("Please fix input errors before submitting.");
      return;
    }
    const altNum = parseFloat(altitude);
    const hsiNum = parseFloat(hsi);
    const adiNum = parseFloat(adi);
    if (
      altNum < 0 || altNum > 3000 ||
      hsiNum < 0 || hsiNum > 360 ||
      adiNum < -100 || adiNum > 100
    ) {
      alert("One or more inputs are out of range. Please correct them.");
      return;
    }
    onSubmit({ altitude: altNum, hsi: hsiNum, adi: adiNum });
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        {/* Dialog title */}
        <h2>
          Input Flight Instruments /
          <span dir="rtl" className="hebrew-title1">הזן מחווני טיסה</span>
        </h2>

        {/* Altitude input block */}
        <div className="input-block">
          <label className="text-label">
            <span className="label-text">Altitude /</span>
            <span dir="rtl" className="label-text">גובה</span>
          </label>
          <div className="input-container">
            <input
              type="text"
              value={altitude}
              onChange={handleAltitudeChange}
              placeholder="0 - 3000"
            />
          </div>
          {altError && <div className="input-error">{altError}</div>}
        </div>

        {/* HSI input block */}
        <div className="input-block">
          <label className="text-label">
            <span className="label-text">HSI /</span>
            <span dir="rtl" className="label-text">מצפן אופקי</span>
          </label>
          <div className="input-container">
            <input
              type="text"
              value={hsi}
              onChange={handleHsiChange}
              placeholder="0 - 360"
            />
          </div>
          {hsiError && <div className="input-error">{hsiError}</div>}
        </div>

        {/* ADI input block */}
        <div className="input-block">
          <label className="text-label">
            <span className="label-text">ADI /</span>
            <span dir="rtl" className="label-text">תנוחה אופקית</span>
          </label>
          <div className="input-container">
            <input
              type="text"
              value={adi}
              onChange={handleAdiChange}
              placeholder="-100 - 100"
            />
          </div>
          {adiError && <div className="input-error">{adiError}</div>}
        </div>

        {/* Buttons to send or cancel */}
        <div className="dialog-buttons">
          <button onClick={handleSubmit}>Send</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
