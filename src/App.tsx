import React, { useContext } from "react";
import CheckoutStepper from "./utils/CheckoutStepper/CheckoutStepper";
import Steps from "./utils/Steps/Steps";
import "./App.css";
import PersonalDetails from "./components/Personal_Details/Personal_Details";
import Payment from "./components/Payment/Payment";
import ThankYouComponent from "./components/Thankyou_Component/Thankyou_Component";
import { stepContext } from "./context/StepContext";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";

function App() {
  const {
    Currstep,
    setCurrStep,
    stepData,
    // showThankYou,
    requiredfilled,
    phoneEdited,
    validcvv,
    validcarddigit,
    expiryDate,
  } = useContext(stepContext);

  const showComponent = (step: number) => {
    switch (step) {
      case 1:
        return <PersonalDetails />;
      case 2:
        return <Payment />;
      case 3:
        return <ThankYouComponent />;
    }
  };

  const handleNext = () => {
    if (!phoneEdited || !requiredfilled) {
      // Display error toast if required fields are not filled

      toast.error("Please fill all the Required fields");
    } else {
      // Proceed to the next step

      setCurrStep(Currstep + 1);
    }
  };

  // console.log(stepData)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!expiryDate || !validcvv || !validcarddigit) {
      // Display error toast if required fields are not filled
      toast.error("Please fill all the Required fields");
      return;
    }

    console.log(stepData)

    try {
      const response = await axios.post("https://stepper-3f76.onrender.com/api/v1/users/createUser", {
        fullName: stepData.fullName,
        email: stepData.email,
        phoneNumber: stepData.phoneNumber,
        address: stepData.address,
        dob: stepData.dob,
        cardNumber: stepData.cardNumber,
        cardHolderName: stepData.cardHolderName,
        expiryDate: stepData.expiryDate,
        cvv: stepData.cvv,
      });
    
      const data = await response.data;
      console.log(data);
    
      if (response.status === 201) {
        // User created successfully
        toast.success("User created successfully");
        setCurrStep(Currstep + 1);
      }
    } catch (error:unknown) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError; // Type assertion
        if (err.response && err.response.status === 400) {
          toast.error("User already exists with the provided details");
        } else {
          toast.error("Error creating user. Please try again.");
          console.error("There was an error!", err);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }

    // // showThankYou(true);
  };

  return (
    <div className="app-container">
      <div className="center-content">
        <CheckoutStepper stepsConfig={Steps as []} />
        <div>{showComponent(Currstep)}</div>

        {/* Button Div */}

        <div className="flex items-center justify-center ">
          {Currstep > 1 && Currstep < 3 && (
            <button
              className="button"
              style={{
                marginRight: "10px",
                backgroundColor: "red",
                padding: "10px 30px",
              }}
              onClick={() => setCurrStep(Currstep - 1)}
            >
              Back
            </button>
          )}
          {Currstep === 2 && (
            <form onSubmit={handleSubmit}>
              <button className="button" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center justify-center">
          {Currstep < 2 && (
            <button className="button" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
