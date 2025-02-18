// PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({total}) => {
  console.log(total);
  
  return (
  <PayPalScriptProvider>
        <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total+".00", // Replace with the actual amount
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          alert("Transaction completed by " + details.payer.name.given_name);
        });
      }}
    />
  </PayPalScriptProvider>

  );
};

export default PayPalButton;
