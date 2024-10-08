import CustomContainer from "@/components/layouts/CustomContainer";
import Failed from "@/components/ui/icons/Failed";
import LoadingSpin from "@/components/ui/spinners/LoadingSpin";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useCaptureOrderMutation } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hooks";
import ButtonGroup from "antd/es/button/button-group";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const gateway = query.get("gateway"); // PayPal sends back the orderId as 'token'
  const [captureOrder, { data, status,error }]: any = useCaptureOrderMutation();
  const orderData = data?.data;
  useEffect(() => {
    const token = query.get("token"); // PayPal sends back the orderId as 'token'
    console.log(query, token, data, orderData);
    const capturePayment = async () => {
      try {
        const capturedOrder = await captureOrder({ token, gateway }).unwrap();
        console.log(capturedOrder, orderData);
      } catch (error) {
        console.error("Error capturing PayPal order:", error);
        // Display failure message
      }
    };

    capturePayment();
  }, [location]);

  return (
    <>
      {status === "pending" ? (
        <LoadingSpin></LoadingSpin>
      ) : (
        <CustomContainer className='text-center flex flex-col justify-center items-center gap-4 h-[100vh]'>
          {error ? <Failed size='120'></Failed>: <img src="https://i.ibb.co/Hx0QWmM/verified-2.gif" alt="success" className="size-[100px] md:size-[150px]"/>}
          {error ? <h2 className="secondaryHeading font-bold text-xl md:text-2xl">Sorry! Something went wrong!</h2>: <h2 className="secondaryHeading font-bold text-xl md:text-2xl">Order Received Successfully!</h2>}
          {(!error && gateway === 'paypal') && <p className="text max-w-[500px]">Your transaction id is <strong>{orderData?.transactionId}</strong> & order id <strong>{orderData?._id}</strong></p>}
          {(!error && (gateway === 'sslcommerz' || 'cash')) && <ul className="text text-start [&&_li]:mb-2 max-w-[500px]">
            <li><strong>Transaction Id: </strong> {orderData?.transactionId} </li>
            <li><strong>Order Id: </strong>{orderData?._id}</li>
            <li><strong>Gateway: </strong>{orderData?.gateWay}</li>
            {orderData?.paidBy && <li><strong>Payment method: </strong>{orderData?.paidBy}</li>}
            <li><strong>Total paid: </strong>{orderData?.totalPrice} {orderData?.currency}</li>
          </ul>}
          <ButtonGroup className="space-x-3 hover:none mt-5">
            <NavLink to='/products' className="primaryButtonSm font-semibold">Continue shopping</NavLink>
            {!error && <NavLink to={`${currentUser?.role === 'admin'?'/admin/orders':'/customer/orders'}`} className="primaryButtonOutlinedSm font-semibold">View orders</NavLink>}
          </ButtonGroup>
        </CustomContainer>
      )}
    </>
  );
};

export default OrderSuccess;
