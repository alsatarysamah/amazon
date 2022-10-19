import { createContext, useContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItem: [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      // console.log(action.payload.qun);
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItem: [...state.cart.cartItem, action.payload],
        },
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
