
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import PropTypes from 'prop-types';

export default function ProgressMobileStepper({ handleNextImage , rectangleCount }) {
  // ... rest of the code

  ProgressMobileStepper.propTypes = {
    handleNextImage: PropTypes.func.isRequired,
    rectangleCount: PropTypes.number.isRequired,
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    let checkImageChange =  handleNextImage();
    if (!checkImageChange) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  return (
    <MobileStepper
      variant="progress"
      steps={4}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 4 || rectangleCount <= 0}>
          {activeStep < 3 ? "Next" : "Submit"}
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small"  disabled={activeStep === 0}>
        </Button>
      }
    />
  );
}