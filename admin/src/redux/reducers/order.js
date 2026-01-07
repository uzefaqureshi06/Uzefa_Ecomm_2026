import {
  FETCH_ORDERS,
  FETCH_ORDERS_BY_USER_ID,
  CREATE_ORDERS,
  DELETE_ORDERS,
  UPDATE_ORDERS,
} from "../constants/actionTypes";

const initialState = {
  orders: [],
  singleOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS:
      return { ...state, orders: action.payload };

    case FETCH_ORDERS_BY_USER_ID:
      return { ...state, singleOrder: action.payload };

    case CREATE_ORDERS:
      return { ...state, orders: [...state.orders, action.payload] };

    case DELETE_ORDERS:
      return {
        ...state,
        orders: state.orders.filter(
          (product) => product._id !== action.payload._id
        ),
      };

    case UPDATE_ORDERS:
      return {
        ...state,
        orders: state.orders.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    default:
      return state;
  }
};
