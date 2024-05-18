import PersonalDetails from "../../components/Personal_Details/Personal_Details";
import Payment from "../../components/Payment/Payment";
import ThankYouComponent from "../../components/Thankyou_Component/Thankyou_Component";

// Define the steps for the stepper with their names and corresponding components
const Steps = [
  {
      name: "User Details",
      component: PersonalDetails  // Component to collect personal details from the user
  }, 
  {
      name: "Payment",
      component: ThankYouComponent  // Component to handle payment details and processing
  },
  {
      name: "ThankYou",
      component: Payment   // Component to display a thank you message after successful completion
  }
];

export default Steps;
