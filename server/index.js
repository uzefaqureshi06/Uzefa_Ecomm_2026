import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { productRouter } from "./routes/product.js";
import { dataBaseConnection } from "./db/connection.js";
import { cartRouter } from "./routes/cart.js";
import {orderRouter} from "./routes/orders.js"
import { categoryRouter } from "./routes/category.js";
import { statusRouter } from "./routes/status.js";
import paymentRouter from "./routes/payment.js";
const app = express();
const PORT = 8700;
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dataBaseConnection();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/status", statusRouter);
app.use("/api/v1/payment",paymentRouter );
app.listen(PORT, () => {
  console.log(`SERVER IS CONNECTED TO PORT ${PORT}`);
});
