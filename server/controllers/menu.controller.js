import MenuItem from "../models/MenuItem.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getMenuItems = asyncHandler(async (req, res) => {
  const { category, isAvailable, minPrice, maxPrice } = req.query;

  const filter = {};
  if (category) filter.category = category;

  if (isAvailable !== undefined)
    filter.isAvailable = isAvailable === "true";

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  
  }

  const items = await MenuItem.find(filter).sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, items));
});

export const searchMenuItems = asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q) return res.json(new ApiResponse(200, []));

 const items = await MenuItem.find({ $text: { $search: q } });
 
 res.status(200).json(new ApiResponse(200, items));

});

export const getMenuItemById = asyncHandler(async (req, res) => {
 
  const item = await MenuItem.findById(req.params.id);
 
  if (!item) throw new ApiError(404, "Menu item not found");

  res.status(200).json(new ApiResponse(200, item));

});

export const createMenuItem = asyncHandler(async (req, res) => {

  const item = await MenuItem.create(req.body);

  res.status(201).json(new ApiResponse(201, item, "Menu item created"));

});

export const updateMenuItem = asyncHandler(async (req, res) => {

  const item = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }

  );

  if (!item) throw new ApiError(404, "Menu item not found");

  res.status(200).json(new ApiResponse(200, item, "Menu item updated"));

});

export const deleteMenuItem = asyncHandler(async (req, res) => {

  const item = await MenuItem.findByIdAndDelete(req.params.id);

  if (!item) throw new ApiError(404, "Menu item not found");

  res.status(200).json(new ApiResponse(200, null, "Menu item deleted"));
});

export const toggleAvailability = asyncHandler(async (req, res) => {

  const item = await MenuItem.findById(req.params.id);

  if (!item) throw new ApiError(404, "Menu item not found");

  item.isAvailable = !item.isAvailable;
  await item.save();

  res.status(200).json(
    new ApiResponse(200, item, "Availability updated")
  );
});
