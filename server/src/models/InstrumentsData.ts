import mongoose from "mongoose";

// Define the schema
const instrumentsDataSchema = new mongoose.Schema(
  {
    altitude: {
      type: Number,
      required: true,
      min: 0,
      max: 3000,
    },
    hsi: {
      type: Number,
      required: true,
      min: 0,
      max: 360,
    },
    adi: {
      type: Number,
      required: true,
      min: -100,
      max: 100,
    },
  }

);

// Export the model
export const InstrumentsData = mongoose.model("InstrumentsData", instrumentsDataSchema, "flightInstruments");
