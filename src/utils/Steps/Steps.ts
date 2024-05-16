// utils/Steps/Steps.ts

import React from 'react';
const Steps = [
    {
      name: "User Details",
      component: React.lazy(() => import('../../components/Personal_Details/Personal_Details'))
    },
    {
      name: "Payment",
      component: React.lazy(() => import('../../components/Payment/Payment'))
    },
    {
      name: "ThankYou",
      component: React.lazy(() => import('../../components/Thankyou_Component/Thankyou_Component'))
    }
  ];
  
  export default Steps;
  