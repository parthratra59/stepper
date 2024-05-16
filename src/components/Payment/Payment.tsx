import React, { useEffect, useRef} from "react";
import { stepContext } from "../../context/StepContext";

import toast from "react-hot-toast";

interface StylesType {
  [key: string]: React.CSSProperties;
}

const Payment = () => {
  const styles: StylesType = {
    box: {
      width: "340px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.6)", // Adjust shadow values as needed
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
    },
    btnColor: {
      backgroundColor: "#45B59B",
      color: "#fff",
      borderRadius: "8px",
      padding: "10px 20px",
      margin: "10px 0",
      cursor: "pointer",
    },
  };

  const {
    stepData,
    setStepData,
    setValidcvv,
    setExpiryDate,

    setValidcarddigit,
  } = React.useContext(stepContext);

  const cvvRef = useRef<HTMLInputElement>(null);
  const expiryDateRef = useRef<HTMLInputElement>(null);
  const cardNumberRef = useRef<HTMLInputElement>(null);
 


  // to check if the cvv is valid

  useEffect(() => {
    if (cvvRef.current) {
      const cvvregex = /^[0-9]{3}$/;
      if (stepData.cvv.length === 0) {
        cvvRef.current.style.borderColor = "#6b7280";
        setValidcvv(false);
      } else if (!cvvregex.test(stepData.cvv)) {
        cvvRef.current.style.borderColor = "red";
        setValidcvv(false);
      } else {
        toast.success("CVV is in the correct format");
        cvvRef.current.style.borderColor = "blue";
        setValidcvv(true);
      }
    }
  }, [stepData.cvv, setValidcvv]);

  // check if the card number is valid
  useEffect(() => {
    if (cardNumberRef.current) {
      const cardRegex = /^(?:\d{4}-){3}\d{4}|\d{16}$/;
      if (stepData.cardNumber.length === 0) {
        cardNumberRef.current.style.borderColor = "#6b7280";
        setValidcarddigit(false);
      } else if (!cardRegex.test(stepData.cardNumber)) {
        cardNumberRef.current.style.borderColor="red"
        setValidcarddigit(false);
      } else {
        toast.success("Card number is in the correct format");
        cardNumberRef.current.style.borderColor="blue"
        setValidcarddigit(true);
      }
    }
  }, [stepData.cardNumber, setValidcarddigit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    if (field === "cardNumber") {
      // if any cahracter name which is not in between 0-9 is entered, it will be marked as empty
      // this ^ is a negation operator
      const rawvalue = e.target.value.replace(/[^0-9]/g, "");
      let formatedstring = "";
      for (let i = 0; i < rawvalue.length; i++) {
        if (i > 0 && i % 4 === 0) {
          formatedstring += "-";
        }
        formatedstring += rawvalue[i];
      }
      setStepData({ ...stepData, cardNumber: formatedstring });
      setValidcarddigit(true);
    } else if (field === "cvv") {
      setValidcvv(true);
      setStepData({ ...stepData, [field]: e.target.value.replace(/\D/g, "") });
    } else if (field === "expiryDate") {
      const currentDate = new Date();
      const selectedDate = new Date(e.target.value);
      if (selectedDate > currentDate) {
        setExpiryDate(true);

        setStepData({ ...stepData, [field]: e.target.value });
        toast.success("Expiry date is valid");
      } else {
        setExpiryDate(false);
        // If expiry date is not in the future, do not update the state
        // You can also show a message to the user indicating that the expiry date must be in the future
        toast.error("Expiry date must be in the future");
      }
    } else {
      setStepData({ ...stepData, [field]: e.target.value });
    }
  };
  

 
  
  return (
    <div>
      <div className="m-auto max-w-[1080px] mt-4 mb-2 flex flex-col items-center justify-center w-11/12">
        <div style={styles.box} className="max-h-fit">
          <div className={`font-bold text-center  text-2xl pl-1 text-black`}>
            Payment Information
          </div>
          <div className="mt-6 pl-1 ">
          <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Card Holder Name
                  <input
                    type="text"
                    className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                    placeholder="Holder's Name"
                    name="holderName"
                    value={stepData.cardHolderName}
                    onChange={(e) => handleChange(e, "cardHolderName")}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Card Number <span className="text-red-500">*</span>
                  <input
                    type="text"
                    ref={cardNumberRef}
                    className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                    placeholder="Card Number"
                    name="CardNumber"
                    value={stepData.cardNumber}
                    maxLength={19}
                    onChange={(e) => handleChange(e, "cardNumber")}
                    required
                  />
                </label>
              </div>
              <div className="flex justify-around">
                <div className="mb-4 mr-2 relative">
                  <label className="block text-sm font-medium text-gray-700" htmlFor="cvv">
                    CVV Code <span className="text-red-500">*</span></label>
                    <div className="flex items-center ">
                      <input
                        type="password"
                        id="cvv"
                        ref={cvvRef}
                        className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                        placeholder="cvv code"
                        name="CVV"
                        value={stepData.cvv}
                        maxLength={3}
                        onChange={(e) => handleChange(e, "cvv")}
                        required
                      />

                       
                    </div>
                
                </div>
                <div className="mb-4 ml-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Expiry Date <span className="text-red-500">*</span>
                    <input
                      type="date"
                      ref={expiryDateRef}
                      className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                      name="ExpiryDate"
                      placeholder="Expiry Date"
                      value={stepData.expiryDate}
                      onChange={(e) => handleChange(e, "expiryDate")}
                      required
                    />
                  </label>
                </div>
              </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
