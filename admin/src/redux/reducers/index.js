import { combineReducers } from "redux";
import authReducer from "./auth";
import products from "./products";
import cart from "./cart";
import category from "./category";
import order from "./order";

const rootReducer = combineReducers({
  authReducer,
  products,
  cart,
  category,
  order,
});

export default rootReducer;
