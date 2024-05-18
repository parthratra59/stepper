import React, { useState, useEffect, useRef } from "react";
import { stepContext } from "../../context/StepContext"
import { toast } from "react-hot-toast";

interface StylesType {
  [key: string]: React.CSSProperties;
}

const Personal_Details = () => {
  const styles: StylesType = {
    box: {
      width: "340px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.6)",
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
    setRequiredfilled,
    requiredfilled,
    phoneEdited,
    setPhoneEdited,
  } = React.useContext(stepContext);
  const [emailError, setEmailError] = useState<string | null>(null);

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  //   useEffect for email validation
  useEffect(() => {
    if (emailInputRef.current) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;

      if (stepData.email.length === 0) {
        // If the length of email is 0, set border color to #6b7280
        emailInputRef.current.style.borderColor = "#6b7280";
        setEmailError(null);
        setRequiredfilled(false);
      } else if (
        !emailRegex.test(stepData.email) &&
        stepData.email.length > 0
      ) {
        setEmailError("Invalid email format");
        setRequiredfilled(false);
        // For invalid email format, set border color to red
        emailInputRef.current.style.borderColor = "red";
      } else {
        // For valid email, set border color to default
        setEmailError(null);
        setRequiredfilled(true);
        emailInputRef.current.style.borderColor = "blue"; // Reset border color to default
      }
    }
  }, [stepData.email, requiredfilled, setRequiredfilled]);

  // useEffect for phone number validation
  useEffect(() => {
    if (phoneInputRef.current) {
      const phoneLength = phoneInputRef.current.value.replace(/\D/g, "").length;

      if (phoneEdited === true && phoneLength === 10) {
        phoneInputRef.current.style.borderColor = "blue";
        setPhoneEdited(true);
        toast.success("Phone number is in the valid format");
      } else {
        setPhoneEdited(false);
        phoneInputRef.current.style.borderColor =
          phoneLength === 0 ? "#6b7280" : "red";
      }
    }
  }, [stepData.phoneNumber, phoneEdited, setPhoneEdited]);

  //   field === name of the field which we define
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    // field is key of the object that we want to update in stepData
    // like ["cardHolderName"]:"value"
    // that's why we are using field name exact which we are using in stepData

    if (field === "phoneNumber") {
      //   every time when i change the phone number it will set the phoneEdited to true
      // but in the useEffect it will check if the phone number is valid or not if it is valid then it will show the success toast message
      setPhoneEdited(true);
      const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Allow only numbers and limit to 10 digits
      setStepData({ ...stepData, [field]: value });
    } else if (field === "email") {
      {
        setRequiredfilled(true);
        setStepData({ ...stepData, [field]: e.target.value });
      }
    } else if (field === "dob") {
      const today = new Date().toISOString().split("T")[0];
      if (e.target.value >= today) {
        toast.error("Date of Birth can't be greater than today's date");
        return;
      } else {
        setStepData({ ...stepData, [field]: e.target.value });
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
            User Details
          </div>
          <div className="mt-6 pl-1 ">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  User Name
                  <input
                    type="text"
                    className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                    placeholder="Name"
                    name="Fullname"
                    value={stepData.fullName}
                    onChange={(e) => handleChange(e, "fullName")}
                  />
                </label>
              </div>
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                  User Email <span className="text-red-500">*</span>
                  <input
                    type="email"
                    ref={emailInputRef}
                    className={`mt-1 p-2 block w-full border ${
                      emailError ? "border-red-500" : "border-gray-500"
                    } rounded-md outline-none shadow-sm text-black`}
                    placeholder="Email"
                    name="Email"
                    value={stepData.email}
                    onChange={(e) => handleChange(e, "email")}
                    required
                  />
                </label>
                {emailError && (
                  <p className="text-red-500 absolute text-xs">{emailError}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                  <input
                    ref={phoneInputRef}
                    type="tel" // Change type to tel to allow only numeric input
                    className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                    placeholder="Phone Number"
                    name="PhoneNumber"
                    value={stepData.phoneNumber}
                    onChange={(e) => handleChange(e, "phoneNumber")}
                    maxLength={10} // Limit the input length to 10
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                  <input
                    type="date"
                    className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                    name="DateofBirth"
                    placeholder="Date of Birth"
                    value={stepData.dob}
                    onChange={(e) => handleChange(e, "dob")}
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                  <input
                    type="text"
                    className="mt-1 p-2 block w-full border border-gray-500 rounded-md outline-none shadow-sm text-black"
                    name="Address"
                    placeholder="Address"
                    value={stepData.address}
                    onChange={(e) => handleChange(e, "address")}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal_Details;
