import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import './Stepper.css'

const steps = [
  {
    label: 'Schedule an Appointment at Your Convenience',
    description: `You can schedule your appointment at your own convenience within the given slots.
    This will help in reducing the queue at the site.`,
  },
  {
    label: 'Arrive at the venue before the appointed time',
    description:
      'Once you have done the booking, You have to be present at the clinic to confirm your appointment.',
  },
  {
    label: 'Scan the QR code to confirm your attendance at the venue',
    description: `After reaching the Clinic, you can scan the QR Code available at the reception to
    to confirm your appointment for that selected time slot, which you have booked.`,
  },
  {
    label: 'Keep track of the waiting time and the current serving token',
    description:
      'After confirmation of your appointment, you can keep track of your appointment status. You will also receive a notification 30 minutes before the appointment slot time to get an update on your booking status.'
  },
];

// steps.style.fontSize = '4rem';


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

    <div className="newStepper">
      <h2 className='stepperHeader'>Book Your Slot Today!!!</h2>
      <Box sx={{ maxWidth: 400}}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 3 ? (
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
                      {index === steps.length - 1 ? 'Finish' : 'Continue'}
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
