import { useCaptureOrderMutation } from "@/redux/features/order/orderApi";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderDetails = () => {
  const location = useLocation();
  const [captureOrder, {data, status}]: any = useCaptureOrderMutation();        

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get('token'); // PayPal sends back the orderId as 'token'

    const capturePayment = async () => {
      try {
        await captureOrder(orderId);
        console.log('Payment successful:', data);
        // Display success message
      } catch (error) {
        console.error('Error capturing PayPal order:', error);
        // Display failure message
      }
    };

    capturePayment();
  }, [location]);

  return (
    <>
    {status === 'pending'?<div>Processing payment...</div>:<h1>Payment successful!</h1>}
    </>
);
};


export default OrderDetails;
