import {  useState } from "react";
import { stepContext } from "./StepContext";

// Define the interface for the step data
interface stepDataProvider {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dob: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}



// Define the interface for the props of the StepProvider component
interface stepProviderProps {
  children: React.ReactNode;
}
// Define the StepProvider component that will provide the context to its children
const StepProvider: React.FC<stepProviderProps> = ({ children }) => {
  const [stepData, setStepData] = useState<stepDataProvider>({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  });
 




// State to manage the current step
  const [Currstep, setCurrStep] = useState(1);
 // State to manage the completion status
  const [complete, setComplete] = useState(false);
   // State to manage the visibility of the thank you message
  const [showThankYou, setShowThankYou] = useState(false);
   // State to manage the required fields' filled status
  const [requiredfilled, setRequiredfilled] = useState(false);
  // State to manage if the phone number has been edited
  const [phoneEdited, setPhoneEdited] = useState<boolean>(false);

  
   // States to manage card page validations
  const [validcarddigit, setValidcarddigit] = useState(false);
  const [validcvv, setValidcvv] = useState(false);
  const [expiryDate, setExpiryDate] = useState(false);

  // The value to be provided to the context consumers
  const value = {
    stepData,
    setStepData,
    Currstep,
    setCurrStep,
    complete,
    setComplete,
    showThankYou,
    setShowThankYou,
    requiredfilled,
    setRequiredfilled,
    phoneEdited,
    setPhoneEdited,
    validcarddigit,
    setValidcarddigit,
    validcvv,
    setValidcvv,
    expiryDate,
    setExpiryDate,
  };

   // Return the context provider with the value and children
  return <stepContext.Provider value={value}>{children}</stepContext.Provider>;
};

export default StepProvider;
