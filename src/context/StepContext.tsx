import { createContext } from "react";
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
// Define the interface for the context type
interface stepContextType {
  stepData: stepDataProvider;
  setStepData: React.Dispatch<React.SetStateAction<stepDataProvider>>;
  Currstep: number;
  complete: boolean;
  setCurrStep: React.Dispatch<React.SetStateAction<number>>;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
  showThankYou: boolean;
  setShowThankYou: React.Dispatch<React.SetStateAction<boolean>>;
  requiredfilled: boolean;
  setRequiredfilled: React.Dispatch<React.SetStateAction<boolean>>;
  phoneEdited: boolean;
  setPhoneEdited: React.Dispatch<React.SetStateAction<boolean>>;
  validcarddigit: boolean;
  setValidcarddigit: React.Dispatch<React.SetStateAction<boolean>>;
  validcvv: boolean;
  setValidcvv: React.Dispatch<React.SetStateAction<boolean>>;
  expiryDate: boolean;
  setExpiryDate: React.Dispatch<React.SetStateAction<boolean>>;
}
// Create the context with default values
export const stepContext = createContext<stepContextType>({
  stepData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvv: "",
  },
  setStepData: () => {},
  Currstep: 1,
  setCurrStep: () => {},
  complete: false,
  setComplete: () => {},
  showThankYou: false,
  setShowThankYou: () => {},
  requiredfilled: false,
  setRequiredfilled: () => {},
  phoneEdited: false,
  setPhoneEdited: () => {},
  validcarddigit: false,
  setValidcarddigit: () => {},
  validcvv: false,
  setValidcvv: () => {},
  expiryDate: false,
  setExpiryDate: () => {},
});
