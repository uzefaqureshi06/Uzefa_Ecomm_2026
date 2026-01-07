import { combineReducers } from "redux";
import authReducer from "./auth";
import products from "./products";
import cart from "./cart";
import category from "./category";

const rootReducer = combineReducers({
  authReducer,
  products,
  cart,
  category
});

export default rootReducer;
