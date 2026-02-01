import { useEffect, useState } from "react";
import { TrendingUp, Award, ShoppingBag, BarChart2 } from "lucide-react";
import api from "../api/axios";

export default function Analytics() {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics/top-sellers");
        setTopSellers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Business Analytics</h1>
        <p className="text-gray-500">Performance insights generated from order data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "$4,320.50", icon: Award, color: "emerald" },
          { label: "Orders Completed", value: "142", icon: ShoppingBag, color: "blue" },
          { label: "Avg Order Value", value: "$30.42", icon: TrendingUp, color: "purple" },
          { label: "Active Sessions", value: "8", icon: BarChart2, color: "orange" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
