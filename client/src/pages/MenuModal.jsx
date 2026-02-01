import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function MenuModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    ingredients: "",
    preparationTime: "",
    imageFile: null,
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        price: initialData.price,
        ingredients: initialData.ingredients.join(", "),
        preparationTime: initialData.preparationTime,
        imageFile: null,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (key === "ingredients") data.append(key, form[key].split(","));
      else if (key === "imageFile") data.append("image", form[key]);
      else data.append(key, form[key]);
    });
    await onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X size={20} />
        </button>
        <h2 className="text-lg font-bold mb-4">{initialData ? "Edit" : "Add"} Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Ingredients (comma separated)"
            value={form.ingredients}
            onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Preparation Time (mins)"
            value={form.preparationTime}
            onChange={(e) => setForm({ ...form, preparationTime: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
            className="w-full"
          />
          <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">
            {initialData ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
