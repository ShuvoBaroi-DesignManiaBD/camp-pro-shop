import { AiOutlineShopping } from "react-icons/ai";
import { Drawer, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  clearCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  selectCartItems,
  selectTotalPrice,
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
  const totalAmount = useAppSelector(selectTotalPrice);
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
    // if(cartItems.length === 0) {
    //   return clearCart();
    // }
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
      footerStyle={{
        backgroundColor: "rgb(236 221 213 / var(--tw-bg-opacity))",
      }}
      placement="right"
      onClose={() => dispatch(setShowHideCartDrawer())}
      open={cartDrawerState as boolean}
      width={340}
      footer={
        <div className="flex flex-col gap-3 py-3 justify-between">
          <NavLink
            to="/checkout"
            onClick={() => dispatch(setShowHideCartDrawer())}
            className="primaryButton w-full text-center"
          >
            {`Checkout Now ( ${totalAmount.toFixed(2)} )`}
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => dispatch(setShowHideCartDrawer())}
            className="w-full primaryButtonOutlined text-center"
          >
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
                    Total: ${item.total.toFixed(2)}
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
