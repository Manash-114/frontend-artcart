import { BASE_URL_LOCAL } from "../common-db";
import { createOrder } from "./createOrder";
export const generatePaymentWithRazopay = async (
  data,
  token,
  dispatch,
  orderReqData
) => {
  const res = await fetch(
    `${BASE_URL_LOCAL}/api/customer/order/razor-payment`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 200) {
    const resData = await res.json();
    console.log(resData);
    var options = {
      key: "rzp_test_b7cdwAk8TAVDye", // Enter the Key ID generated from the Dashboard
      amount: resData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Artcart", //your business name
      //   description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: resData.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        console.log("payment done");
        //now create a order to your backend
        orderReqData.paymentReq.id = response.razorpay_payment_id;
        console.log("order data ", JSON.stringify(orderReqData));
        createOrder(orderReqData, token, dispatch);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  } else {
    alert("Internal server error while making addresss");
  }
};
