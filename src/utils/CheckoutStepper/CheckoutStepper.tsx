import React, { useEffect, useRef, useState, useContext } from "react";
import { stepContext } from "../../context/StepContext";

interface StepConfig {
  name: string;
  component: React.ComponentType<[]>;
}

interface CheckoutStepperProps {
  stepsConfig: StepConfig[];
}

const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ stepsConfig = [] }) => {
  const { Currstep } = useContext(stepContext);
  const [margins, setMargins] = useState<{ marginLeft: number; marginRight: number }>({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef<HTMLElement[]>([]);

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
