
const Steps = [
    {
        name: "User Details",
        component: () => import('../../components/Personal_Details/Personal_Details')
    },
    {
        name: "Payment",
        component: () => import('../../components/Payment/Payment')
    },
    {
        name: "ThankYou",
        component: () => import('../../components/Thankyou_Component/Thankyou_Component')
    }
];

export default Steps;
