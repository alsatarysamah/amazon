import { createContext, useContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [],
  },
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
      paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : '',
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find(
        (item) => item.id === newItem.id
      );
      const cartItem = existItem
        ? state.cart.cartItem.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cart.cartItem, newItem];
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };

    case "REMOVE": {
      console.log("store");
      const cartItem = state.cart.cartItem.filter(
        (item) => item.id !== action.payload.id
      );
      console.log({ cartItem });
      localStorage.setItem("cartItem", JSON.stringify(cartItem));

      return { ...state, cart: { ...state.cart, cartItem } };
    }
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: { cartItem: [], shippingAddress: {} ,paymentMethod:""},
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

      case 'SAVE_PAYMENT_METHOD':
        return {
          ...state,
          cart: { ...state.cart, paymentMethod: action.payload },
        };
    default:
      return state;
  }
}
export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
