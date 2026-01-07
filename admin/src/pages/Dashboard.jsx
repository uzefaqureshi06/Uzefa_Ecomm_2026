import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions/products";
import { getOrder } from "../redux/actions/orders";
import { getUsers } from "../redux/actions/auth";

export default function Dashboard() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.authReducer?.users);
  const orderData = useSelector((state) => state?.order?.orders);
  const productData = useSelector(
    (state) => state?.products?.products?.products
  );
  console.log(userData, "This is userData");
  console.log(orderData, "This is orderData");
  console.log(productData, "This is productData");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrder());
    dispatch(getUsers());
  }, []);
  return (
    <div>
      <h2 className="text-2xl text-yellow-400 mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Products" value={productData?.length} />
        <Card title="Customers" value={userData?.length} />
        <Card title="Orders" value={orderData?.length} />
      </div>
    </div>
  );
}
function Card({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-yellow-700 rounded-xl p-4">
      <p className="text-gray-400">{title}</p>
      <h3 className="text-3xl text-yellow-400 font-bold">{value}</h3>
    </div>
  );
}
