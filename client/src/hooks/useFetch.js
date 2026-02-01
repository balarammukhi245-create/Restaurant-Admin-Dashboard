import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useFetch(url, deps = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(url);
        setData(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps);

  return { data, setData, loading };
}
