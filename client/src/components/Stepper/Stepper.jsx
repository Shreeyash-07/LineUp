import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./Stepper.css";

const steps = [
  {
    label: "Login / Register",
    description: `User should Login or Register before using the LineUp service.`,
  },
  {
    label: "Select desired Services",
    description:
      "Select the desired amenity present according to your requirements.",
  },
  {
    label: "Book among Available slot",
    description: `A User can select the timing of an appointment within the given groove.`,
  },
  {
    label: "Scan and Confirm",
    description:
      "Reach the venue on or before time of slot and scan to confirm your appointment.",
  },
  {
    label: "Track your consultation",
    description:
      "You can track the current token and estimated time left for your session.",
  },
  {
    label: "Notification",
    description:
      "A prompt proclamation will appear when your time comes for the appointment.",
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="newStepper" style={{ fontSize: "20px" }}>
      <h2 className="stepperHeader">Book Your Slot Today!!!</h2>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} style={{ fontSize: "20px" }}>
              <StepLabel
                style={{ fontSize: "20px" }}
                optional={
                  index === 5 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}
