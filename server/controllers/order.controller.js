import Order from "../models/Order.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 5 } = req.query;

  const filter = status ? { status } : {};
 
  const orders = await Order.find(filter)
    .populate("items.menuItem")
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, orders));

});

export const getOrderById = asyncHandler(async (req, res) => {

  const order = await Order.findById(req.params.id).populate(
    "items.menuItem"

  );

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order));

});

export const createOrder = asyncHandler(async (req, res) => {

  const order = await Order.create(req.body);

  res.status(201).json(new ApiResponse(201, order, "Order created"));

});

export const updateOrderStatus = asyncHandler(async (req, res) => {

  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }

  );

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json(new ApiResponse(200, order, "Status updated"));

});
