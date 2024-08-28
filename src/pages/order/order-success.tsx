import CustomContainer from "@/components/layouts/CustomContainer";
import Failed from "@/components/ui/icons/Failed";
import LoadingSpin from "@/components/ui/spinners/LoadingSpin";
import { useCaptureOrderMutation } from "@/redux/features/order/orderApi";
import { Button } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const [captureOrder, { data, status,error }]: any = useCaptureOrderMutation();
  const orderData = data?.data;
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("token"); // PayPal sends back the orderId as 'token'
    console.log(query, orderId);
    const capturePayment = async () => {
      try {
        await captureOrder({ orderId }).unwrap();

        // console.log("Payment successful:", order, '==========', data);
        // Display success message
      } catch (error) {
        console.error("Error capturing PayPal order:", error);
        // Display failure message
      }
    };

    capturePayment();
  }, []);

  return (
    <>
      {status === "pending" ? (
        <LoadingSpin></LoadingSpin>
      ) : (
        <CustomContainer className='text-center flex flex-col justify-center items-center gap-4 h-[100vh]'>
          {error ? <Failed size='120'></Failed>: <img src="https://i.ibb.co/Hx0QWmM/verified-2.gif" alt="success" className="size-[150px]"/>}
          {error ? <h2 className="secondaryHeading font-bold">Sorry! Something went wrong!</h2>: <h2 className="secondaryHeading font-bold">Order Received Successfully!</h2>}
          {!error && <p className="text max-w-[500px]">Your transaction id is <strong>{orderData?.transactionId}</strong> & order id <strong>{orderData?._id}</strong></p>}
          
          <ButtonGroup className="space-x-3 hover:none mt-5">
            <NavLink to='/products' className="primaryButtonSm font-semibold">Continue shopping</NavLink>
            {!error && <NavLink to='/dashboard/orders' className="primaryButtonOutlinedSm font-semibold">View orders</NavLink>}
          </ButtonGroup>
        </CustomContainer>
      )}
    </>
  );
};

export default OrderSuccess;
