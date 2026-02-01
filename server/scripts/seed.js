import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "../models/MenuItem.model.js";
import Order from "../models/Order.model.js";

dotenv.config({ path: "./.env" });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await MenuItem.deleteMany();
    await Order.deleteMany();

    console.log("Old data removed");

    // Menu items
    const menuItems = await MenuItem.insertMany([
      { name: "Spring Rolls", category: "Appetizer", price: 120, ingredients: ["Cabbage", "Carrot"] },
      { name: "Paneer Tikka", category: "Appetizer", price: 180, ingredients: ["Paneer", "Spices"] },
      { name: "Chicken Biryani", category: "Main Course", price: 250, ingredients: ["Chicken", "Rice"] },
      { name: "Veg Biryani", category: "Main Course", price: 220, ingredients: ["Vegetables", "Rice"] },
      { name: "Butter Naan", category: "Main Course", price: 40 },
      { name: "Chicken Curry", category: "Main Course", price: 230 },
      { name: "Gulab Jamun", category: "Dessert", price: 90 },
      { name: "Ice Cream", category: "Dessert", price: 100 },
      { name: "Brownie", category: "Dessert", price: 140 },
      { name: "Cold Coffee", category: "Beverage", price: 120 },
      { name: "Lime Soda", category: "Beverage", price: 80 },
      { name: "Masala Tea", category: "Beverage", price: 50 },
      { name: "French Fries", category: "Appetizer", price: 110 },
      { name: "Veg Burger", category: "Main Course", price: 150 },
      { name: "Chicken Burger", category: "Main Course", price: 180 }
    ]);

    console.log("Menu items seeded");

    // Orders
    // Orders
const orders = Array.from({ length: 10 }).map((_, i) => ({
  orderNumber: `ORD-${Date.now()}-${i+1}`, 
  items: [
    {
      menuItem: menuItems[i]._id,
      quantity: Math.floor(Math.random() * 3) + 1,
      price: menuItems[i].price
    }
  ],
  totalAmount: menuItems[i].price * Math.floor(Math.random() * 3 + 1), // adjust totalAmount if quantity > 1
  status: ["Pending", "Preparing", "Ready", "Delivered"][i % 4],
  customerName: `Customer ${i + 1}`,
  tableNumber: i + 1
}));

await Order.insertMany(orders);

console.log("Orders seeded");

    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
