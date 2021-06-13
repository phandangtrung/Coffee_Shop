const paypal = require("paypal-rest-sdk");
require("dotenv/config");

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

const create_payment = (items, total) => {
  return (create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.CLIENT_URL}/api/orders/paypal/success`,
      cancel_url: `${process.env.CLIENT_URL}/api/orders/paypal/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: items,
        },
        amount: {
          currency: "USD",
          total: total.toString(),
        },
        description: "Thanks for your shopping",
      },
    ],
  });
};

const execute_payment = (payerId) => {
  return (execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: total.toString(),
        },
      },
    ],
  });
};

module.exports = { create_payment, execute_payment };
