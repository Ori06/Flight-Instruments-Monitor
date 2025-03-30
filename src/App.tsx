// Import React and required components/CSS
import { useState } from "react";
import Dialog from "./components/Dialog";
import TextPage from "./pages/Text-Page";
import VisualPage from "./pages/Visual-Page"; // New visual page component
import logo from "./assets/logo.png";
import "./css/App.css";

// Main App component
export default function App() {
  // State to control dialog visibility and view mode (text or visual)
  const [showDialog, setShowDialog] = useState(false);
  const [viewMode, setViewMode] = useState<"text" | "visual">("visual");

  // State for instrument values
  const [adiValue, setAdiValue] = useState(0);
  const [hsiValue, setHsiValue] = useState(0);
  const [altValue, setAltValue] = useState(0);

  // Function to submit data to the server and update state
  const handleSubmit = async (data: { altitude: number; hsi: number; adi: number }) => {
    try {
      // Send a POST request to our server with the instrument data.
      // convert the 'data' object to a JSON string.
      const response = await fetch("http://localhost:3000/data", {
        method: "POST", // Use POST method to send data.
        headers: {
          "Content-Type": "application/json", // make sure that we're sending JSON.
        },
        body: JSON.stringify(data), // convert the data to a JSON string.
      });
  
      // If the server response is not OK, throw an error
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
  
      // Convert the server's response to JSON.
      const result = await response.json();
      console.log("✅ Server response:", result);
  
      // Update our state with the new instrument values.
      setAdiValue(data.adi);
      setHsiValue(data.hsi);
      setAltValue(data.altitude);
    } catch (error) {
      // Log any errors that occur during the fetch.
      console.error("❌ Error saving data:", error);
    }
  };
  
  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <header className="app-header">
        <div className="header-left">
          {/* Buttons to switch between Text and Visual view and open the dialog */}
          <button onClick={() => setViewMode("text")}>
            Text / <span dir="rtl" className="hebrew-button">פרטי מחוונים</span>
          </button>
          <button onClick={() => setViewMode("visual")}>
            Visual / <span dir="rtl" className="hebrew-button">תצוגה ויזואלית</span>
          </button>
          <button onClick={() => setShowDialog(true)}>+</button>
        </div>
        <div className="header-right">
          {/* Logo container with image */}
          <div className="logo-container">
            <img src={logo} alt="Flight Instruments Logo" className="header-logo" />
          </div>
          {/* App title in both English and Hebrew */}
          <h1>
            <span className="english-title"> Flight Instruments Monitor / </span>
            <span dir="rtl" className="hebrew-title"> מוניטור מחווני טיסה</span>
          </h1>
        </div>
      </header>

      {/* DIALOG SECTION */}
      {showDialog && (
        // Render the dialog to input new instrument values
        <Dialog onSubmit={handleSubmit} onClose={() => setShowDialog(false)} />
      )}

      {/* MAIN CONTENT SECTION */}
      <main className="app-main">
        {viewMode === "visual" ? (
          // Show the visual page layout if viewMode is "visual"
          <VisualPage altValue={altValue} hsiValue={hsiValue} adiValue={adiValue} />
        ) : (
          // Otherwise, show the text page layout
          <TextPage altValue={altValue} hsiValue={hsiValue} adiValue={adiValue} />
        )}
      </main>

      {/* FOOTER SECTION */}
      <footer className="app-footer">
        <span dir="rtl" className="hebrew-title">
          פרויקט מוניטור מחווני טיסה עבור מסלול פרויקטנטים
        </span>
      </footer>
    </div>
  );
}
