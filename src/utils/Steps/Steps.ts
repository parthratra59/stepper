import PersonalDetails from "../../components/Personal_Details/Personal_Details";
import Payment from "../../components/Payment/Payment";
import ThankYouComponent from "../../components/Thankyou_Component/Thankyou_Component";


const Steps = [
  {
      name: "User Details",
      component: PersonalDetails
  },
  {
      name: "Payment",
      component: ThankYouComponent
  },
  {
      name: "ThankYou",
      component: Payment
  }
];

export default Steps;
