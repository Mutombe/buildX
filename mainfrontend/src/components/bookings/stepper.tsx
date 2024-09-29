import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import EnhancedUniversalBooking from "./universalBookForm";
import EnhancedBookingConfirmation from "./bookingConfirmation";

const BookingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = ["Select Date", "Confirm Booking"];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", mt: 4, marginTop: "100px" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <EnhancedUniversalBooking handleNext={handleNext} />
        )}
        {activeStep === 1 && (
          <EnhancedBookingConfirmation
            handleBack={handleBack}
            handleReset={handleReset}
          />
        )}
      </Box>
    </Box>
  );
};

export default BookingProcess;
