import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProducts } from "../redux/actions/products";
import { getOrder } from "../redux/actions/orders";
import { getUsers } from "../redux/actions/auth";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

/* ================= CONSTANTS ================= */
const USD_TO_INR = 88;
const OUNCE_TO_GRAM = 31.1035;
const INDIA_RETAIL_MULTIPLIER = 2.35; // GST + duty + local premium

export default function Dashboard() {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.authReducer?.users);
  const orderData = useSelector((state) => state?.order?.orders);
  const productData = useSelector(
    (state) => state?.products?.products?.products
  );

  /* ================= RANGE STATE ================= */
  const [range, setRange] = useState("1y");
  const [interval, setInterval] = useState("1mo");

  /* ================= GOLD CHART ================= */
  const [goldChart, setGoldChart] = useState({
    labels: [],
    datasets: [],
  });
  const [price, setPrice] = useState();
  /* ================= FETCH GOLD ================= */
  const fetchGoldData = async () => {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/GC=F?range=${range}&interval=${interval}`;

      const res = await axios.get(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      );

      const result = res.data?.chart?.result?.[0];
      if (!result) return;

      const prices = result.indicators.quote[0].close;
      const timestamps = result.timestamp;

      const filtered = prices
        .map((price, index) => ({
          price,
          time: timestamps[index],
        }))
        .filter((item) => item.price !== null);

      setGoldChart({
        labels: filtered.map((item) =>
          new Date(item.time * 1000).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })
        ),
        datasets: [
          {
            label: "24K Gold (India Retail • 1g • INR)",
            data: filtered.map((item) => {
              const internationalPerGram =
                (item.price * USD_TO_INR) / OUNCE_TO_GRAM;

              const indiaRetailPrice =
                internationalPerGram * INDIA_RETAIL_MULTIPLIER;

              return indiaRetailPrice;
            }),
            borderColor: "#D4AF37",
            backgroundColor: "rgba(212,175,55,0.25)",
            tension: 0.4,
            pointRadius: 3,
          },
        ],
      });
    } catch (error) {
      console.error("Gold API Error:", error);
    }
  };

  /* ================= USE EFFECT ================= */
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getOrder());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    fetchGoldData();
  }, [range, interval]);

  return (
    <div>
      <h2 className="text-2xl text-yellow-400 mb-6">Dashboard</h2>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Products" value={productData?.length || 0} />
        <StatCard title="Customers" value={userData?.length || 0} />
        <StatCard title="Orders" value={orderData?.length || 0} />
      </div>
      <div className="w-full my-6 flex justify-center ">
        <div className="bg-zinc-900 border border-yellow-700 rounded-xl p-4 w-full md:w-[380px] shadow-[0_0_18px_rgba(212,175,55,0.25)]">
          <p className="text-sm text-yellow-400 mb-2 font-semibold">
            Update Gold Price
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="₹ / gram"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 bg-black text-white border border-yellow-600 rounded px-3 py-2 outline-none"
            />

            <button
              // onClick={handleCalculate}
              className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-4 rounded"
            >
              Update Price
            </button>
          </div>
        </div>
      </div>
      {/* ===== GOLD CHART ===== */}
      <div className="mt-8 bg-black border border-yellow-700 rounded-xl p-6 shadow-[0_0_25px_rgba(212,175,55,0.3)]">
        <div className="flex flex-wrap justify-between items-center mb-4">
          <h3 className="text-xl text-yellow-400 font-semibold">
            24K Gold Price – India Retail (1 Gram • INR)
          </h3>

          <div className="flex gap-2">
            <select
              className="bg-zinc-900 text-white border border-yellow-600 rounded px-3 py-1"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            >
              <option value="1mo">1 Month</option>
              <option value="3mo">3 Months</option>
              <option value="6mo">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="5y">5 Years</option>
            </select>

            <select
              className="bg-zinc-900 text-white border border-yellow-600 rounded px-3 py-1"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
            >
              <option value="1d">Daily</option>
              <option value="1wk">Weekly</option>
              <option value="1mo">Monthly</option>
            </select>
          </div>
        </div>

        <div className="h-[360px]">
          <Line
            data={goldChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: "#D4AF37" },
                },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `₹${ctx.parsed.y.toFixed(2)} per gram`,
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#fff" },
                  grid: { color: "#222" },
                },
                y: {
                  ticks: {
                    color: "#fff",
                    callback: (value) => `₹${value.toFixed(0)}`,
                  },
                  grid: { color: "#222" },
                },
              },
            }}
          />
        </div>

        <p className="text-xs text-gray-400 mt-3">
          * India retail gold price derived from international gold (COMEX),
          adjusted for import duty, GST and local bullion premium. Actual prices
          may vary by city and jeweller.
        </p>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-yellow-700 rounded-xl p-4">
      <p className="text-gray-400">{title}</p>
      <h3 className="text-3xl text-yellow-400 font-bold">{value}</h3>
    </div>
  );
}
