import { AiOutlineShopping } from "react-icons/ai";
// import React from "react";
// import { Drawer, Button } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { clearCart, removeItemFromCart } from "@/redux/features/cart/cartSlice";
// import { RootState } from "@/redux/store";
// import { CartItem } from "@/types/cart.type";

// interface CartDrawerProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const CartDrawer: React.FC<CartDrawerProps> = ({ visible, onClose }) => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state: RootState) => state.cart.items);
//   const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);

//   const handleRemoveItem = (id: string) => {
//     dispatch(removeItemFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//     onClose();
//   };

//   return (
//     <Drawer
//       title="Your Cart"
//       placement="right"
//       onClose={onClose}
//       visible={visible}
//       width={320}
//       footer={
//         <div className="flex justify-between">
//           <Button onClick={handleClearCart}>Clear Cart</Button>
//           <div className="font-bold text-lg">
//             Total: ${totalAmount.toFixed(2)}
//           </div>
//         </div>
//       }
//     >
//       {cartItems.length === 0 ? (
//         <div>Your cart is empty.</div>
//       ) : (
//         cartItems.map((item: CartItem) => (
//           <div key={item._id} className="mb-4">
//             <div className="flex justify-between">
//               <div>
//                 <div className="font-medium">{item.name}</div>
//                 <div className="text-sm text-gray-600">
//                   Quantity: {item.quantity}
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Price: ${item.price.toFixed(2)}
//                 </div>
//               </div>
//               <Button danger onClick={() => handleRemoveItem(item._id)}>
//                 Remove
//               </Button>
//             </div>
//           </div>
//         ))
//       )}
//     </Drawer>
//   );
// };

// export default CartDrawer;


import { Drawer, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  clearCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  selectCartItems,
  selectTotalAmount,
  selectNumberOfProducts,
} from "@/redux/features/cart/cartSlice";
import { RootState } from "@/redux/store";
import { CartItem } from "@/types/cart.type";
import { useAppSelector } from "@/redux/hooks";
import {
  selectShowHideCartDrawer,
  setShowHideCartDrawer,
} from "@/redux/features/ui/drawerShowHideSlice";
import { NavLink } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const totalAmount = useAppSelector(selectTotalAmount);
  const numberOfProducts = useAppSelector(selectNumberOfProducts);
  const cartDrawerState = useAppSelector(selectShowHideCartDrawer);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseItemQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseItemQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const shopingIcon = <AiOutlineShopping />;

  return (
    <Drawer
      title={
        <div className="flex justify-between">
          <span className="flex gap-2 text-xl items-center">
            {shopingIcon}{" "}
            <p>
              {numberOfProducts} {numberOfProducts > 1 ? "items" : "item"}
            </p>
          </span>
          <Button type="primary" danger onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
      }
      footerStyle={{backgroundColor: 'rgb(236 221 213 / var(--tw-bg-opacity))'}}
      placement="right"
      onClose={() => dispatch(setShowHideCartDrawer())}
      open={cartDrawerState as boolean}
      width={340}
      footer={
        <div className="flex flex-col gap-3 py-3 justify-between">
          <NavLink to='/checkout' className="primaryButton w-full text-center">
            {`Checkout Now ( ${totalAmount.toFixed(2)} )`}
          </NavLink>
          <NavLink to='/cart' onClick={()=>dispatch(setShowHideCartDrawer())} className="w-full primaryButtonOutlined text-center">
            View Cart
          </NavLink>
        </div>
      }
    >
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        cartItems.map((item: CartItem) => (
          <div
            key={item._id}
            className="mb-4 &:not(:last-child)]:border-b border-sky-500"
          >
            <div className="flex flex-col justify-between items-start gap-2.5">
              <div className="flex gap-2">
                <img
                  src={item?.images[0]?.url as any}
                  alt={item?.images[0]?.alt}
                  className="size-10"
                />
                <div className="flex-grow space-y-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: ${item.totalPrice.toFixed(2)}
                  </div>
                  <div className="flex items-center">
                    <Button onClick={() => handleDecreaseQuantity(item._id)}>
                      -
                    </Button>
                    <span className="mx-2">{item?.quantity}</span>
                    <Button onClick={() => handleIncreaseQuantity(item._id)}>
                      +
                    </Button>
                    <Button
                      danger
                      onClick={() => handleRemoveItem(item._id)}
                      className="ml-2"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </Drawer>
  );
};

export default CartDrawer;
