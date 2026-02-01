import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Check, X, Loader2 } from "lucide-react";
import api from "../api/axios";
import useDebounce from "../hooks/useDebounce";
import MenuModal from "./MenuModal";

export default function MenuManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const res = await api.get("/menu", {
        params: {
          q: debouncedSearch,
          category: categoryFilter !== "All" ? categoryFilter : undefined,
          isAvailable:
            availabilityFilter === "Available"
              ? true
              : availabilityFilter === "Unavailable"
              ? false
              : undefined,
        },
      });
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [debouncedSearch, categoryFilter, availabilityFilter]);

  const toggleAvailability = async (id) => {
    await api.patch(`/menu/${id}/availability`);
    setItems(items =>
      items.map(i => i._id === id ? { ...i, isAvailable: !i.isAvailable } : i)
    );
  };

  const deleteItem = async (id) => {
    await api.delete(`/menu/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  const handleSave = async (data) => {
    if (editingItem) await api.put(`/menu/${editingItem._id}`, data);
    else await api.post("/menu", data);
    setModalOpen(false);
    setEditingItem(null);
    fetchMenu();
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-emerald-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <button onClick={() => setModalOpen(true)} className="flex items-center bg-emerald-600 text-white px-4 py-2 rounded-lg">
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="flex space-x-4">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="All">All Categories</option>
          <option value="Appetizer">Appetizer</option>
          <option value="Main Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Beverage">Beverage</option>
        </select>

        <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)} className="border rounded-lg px-3 py-2">
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 border rounded-lg w-full py-2"
          />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No menu items found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item._id} className="bg-white p-4 rounded-xl border">
              <img src={item.imageUrl} className="h-40 w-full object-cover rounded-lg" />
              <h3 className="font-bold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="flex justify-between mt-3">
                <button onClick={() => toggleAvailability(item._id)} className={`px-3 py-1 text-xs rounded ${item.isAvailable ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                  {item.isAvailable ? <X size={14} /> : <Check size={14} />}
                </button>
                <div className="flex space-x-2">
                  <button onClick={() => { setEditingItem(item); setModalOpen(true); }}>
                    <Check size={16} className="text-emerald-500" />
                  </button>
                  <button onClick={() => deleteItem(item._id)}>
                    <Trash2 className="text-red-500" size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MenuModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initialData={editingItem} />
    </div>
  );
}
