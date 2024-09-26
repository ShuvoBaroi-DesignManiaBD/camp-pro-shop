import {
  clearCart,
  decreaseItemQuantity,
  increaseItemQuantity,
  removeItemFromCart,
  selectCartItems,
  selectNumberOfProducts,
  selectOriginalTotalPrice,
} from "@/redux/features/cart/cartSlice";
import {
  selectShowHideCartDrawer,
  setShowHideCartDrawer,
} from "@/redux/features/ui/cartDrawer/drawerShowHideSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
const dispatch = useDispatch();
export const cartItems = useAppSelector(selectCartItems);
export const totalAmount = useAppSelector(selectOriginalTotalPrice);
export const numberOfProducts = useAppSelector(selectNumberOfProducts);
export const cartDrawerState = useAppSelector(selectShowHideCartDrawer);

export const handleRemoveItem = (id: string) => {
  dispatch(removeItemFromCart(id));
};

export const handleIncreaseQuantity = (id: string) => {
  dispatch(increaseItemQuantity(id));
};

export const handleDecreaseQuantity = (id: string) => {
  dispatch(decreaseItemQuantity(id));
};

export const handleClearCart = () => {
  dispatch(clearCart());
};

export const showHideCartDrawer = () => {
  dispatch(setShowHideCartDrawer());
};
