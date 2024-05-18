import React, { useEffect, useRef, useState, useContext } from "react";
import { stepContext } from "../../context/StepContext";

// Define the interface for the step configuration
interface StepConfig {
  name: string;
  component: React.ComponentType<[]>;
}

// Define the interface for the props of the CheckoutStepper component
interface CheckoutStepperProps {
  stepsConfig: StepConfig[];
}
// Define the CheckoutStepper component that will render the stepper UI
const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ stepsConfig = [] }) => {
  // Extract the current step from the context
  const { Currstep } = useContext(stepContext);

  
    // State to manage the left and right margins of the progress bar
  const [margins, setMargins] = useState<{ marginLeft: number; marginRight: number }>({
    marginLeft: 0,
    marginRight: 0,
  });

   // Ref to store references to each step element
  const stepRef = useRef<HTMLElement[]>([]);


  // useEffect to calculate margins for the first and last steps
  useEffect(() => {
    if (stepsConfig.length > 0) {
      setMargins({
        marginLeft: stepRef.current[0]?.offsetWidth ? stepRef.current[0].offsetWidth / 2 : 0,
        marginRight: stepRef.current[stepsConfig.length - 1]?.offsetWidth
          ? stepRef.current[stepsConfig.length - 1].offsetWidth / 2
          : 0,
      });
    }
  }, [stepsConfig.length]);


// Function to calculate the width of the progress bar based on the current step
  const calculateProgressBarWidth = () => {
    return ((Currstep - 1) / (stepsConfig.length - 1)) * 100;
  };

  return (
    <div className="checkout-stepper">
      <div className="stepper">
        {stepsConfig.map((step, index) => (
            <div
                key={step.name}
                className={`step ${Currstep > index + 1  || Currstep===3 ? "complete" : ""} ${
                    Currstep === index + 1 ? "active" : ""
                }`}
                ref={(el) => el && (stepRef.current[index] = el)}
            >
                <div className="step-number">{Currstep > index + 1 || Currstep===3 ? <span>&#10003;</span> : index + 1}</div>
                <div className="step-title">{step.name}</div>
            </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div className="progress" style={{ width: `${calculateProgressBarWidth()}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStepper;
