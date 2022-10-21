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
      const newItem = action.payload;
      const existItem = state.cart.cartItem.find(
        (item) => item.id === newItem.id
      );
      const cartItem = existItem
        ? state.cart.cartItem.map((item) =>
            item.id === existItem.id ? newItem : item
          )
        : [...state.cart.cartItem, newItem];
      localStorage.setItem('cartItem', JSON.stringify(cartItem));
      return { ...state, cart: { ...state.cart, cartItem } };
     

    default:
      return state;
  }
}
export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
