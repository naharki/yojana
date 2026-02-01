'use client';
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NepaliDatePicker from "../../../shared/nepali-date-picker/NepaliDatePicker";

export default function App() {
  const [selectedDate, setSelectedDate] = React.useState("");

  return (
    <div className="App">
      <Box sx={{ p: 6 }}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          sx={{ fontWeight: "600" }}
        >
          Nepali Date Picker v3.7 with MUI v5
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Nepali Date Picker v3.7 for non-modal working fine
        </Typography>
        <NepaliDatePicker
          id="date_picker_in_non_modal"
          name="date_picker_in_non_modal"
          label="Select a date"
          value={selectedDate}
          onDateChange={(val) => setSelectedDate(val)}
        />
      </Box>
      
    </div>
  );
}
