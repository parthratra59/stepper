import {  useState } from "react";
import { stepContext } from "./StepContext";

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




interface stepProviderProps {
  children: React.ReactNode;
}

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
 





  const [Currstep, setCurrStep] = useState(1);

  const [complete, setComplete] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [requiredfilled, setRequiredfilled] = useState(false);
  const [phoneEdited, setPhoneEdited] = useState<boolean>(false);

  // card page
  const [validcarddigit, setValidcarddigit] = useState(false);
  const [validcvv, setValidcvv] = useState(false);
  const [expiryDate, setExpiryDate] = useState(false);

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

  return <stepContext.Provider value={value}>{children}</stepContext.Provider>;
};

export default StepProvider;
