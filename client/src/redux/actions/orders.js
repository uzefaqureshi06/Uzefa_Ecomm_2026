import * as api from "../api";
import {
  CREATE_PRODUCT,
  DELETE_ORDERS,
  FETCH_ORDERS,
  FETCH_ORDERS_BY_USER_ID,
} from "../constants/actionTypes";

export const addOrder = (order) => async (dispatch) => {
  try {
    const { data } = await api.createOrder(order);
    dispatch({ type: CREATE_PRODUCT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = () => async (dispatch) => {
  try {
    const { data } = await api.fetchOrder();
    dispatch({ type: FETCH_ORDERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getProductByID = (id) => async (dispatch) => {
  console.log(id);
  try {
    const { data } = await api.fetchOrderById(id);
    dispatch({ type: FETCH_ORDERS_BY_USER_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await api.deleteOrder(id);
    dispatch({ type: DELETE_ORDERS, payload: id });
  } catch (error) {
    console.log(error);
  }
};
