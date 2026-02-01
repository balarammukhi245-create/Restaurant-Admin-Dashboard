import Order from "../models/Order.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const topSellingItems = asyncHandler(async (req, res) => {
  
  const data = await Order.aggregate([
  
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.menuItem",
        totalQty: { $sum: "$items.quantity" }
      }
    },
  
    {
      $lookup: {
        from: "menuitems",
        localField: "_id",
        foreignField: "_id",
        as: "menuItem"
      }
    },
  
    { $unwind: "$menuItem" },
    { $sort: { totalQty: -1 } },
    { $limit: 5 }
  
  ]);

  res.status(200).json(new ApiResponse(200, data));

});
