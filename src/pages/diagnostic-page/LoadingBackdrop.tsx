import { Backdrop, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

type Props = {
  isLoading: boolean;
};

const diagnosticSteps = [
  {
    id: 1,
    title: "Select master blaster campaign settings",
  },
  {
    id: 2,
    title: "Create an ad group",
  },
  {
    id: 3,
    title: "Create an ad",
  },
];

const LoadingBackdrop = ({ isLoading }: Props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  //https://www.svgrepo.com/show/509001/avatar-thinking-9.svg
  return (
    <Backdrop
      open={isLoading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      className="bg-opacity-90 bg-black flex items-center justify-center"
    >
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-40 w-40 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-artificial-intelligence-robot-illustration-png-image_6654937.png"
          className="rounded-full h-36 w-36"
        />
      </div>
    </Backdrop>
  );
};

export default LoadingBackdrop;
