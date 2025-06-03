import SelfBooking from "../models/SelfBooking.model.js";
import SpotsRvPark from "../models/SpotsRvPark.model.js";

const getData = async (req, res) => {
  try {
    const { skip, limit, page } = req.pagination;
    const search = req.query.search || "";
    const searchRegex = new RegExp(search, "i");

    const query = {
      $or: [
        { name: searchRegex },
        { email: searchRegex },
        { reason: searchRegex },
      ],
    };

    const data = await SelfBooking.find(query)
      .populate("spot")
      .skip(skip)
      .limit(limit);

    const totalDataCount = await SelfBooking.countDocuments(query);

    res.status(200).json({
      success: true,
      payload: data,
      pagination: {
        totalData: totalDataCount,
        totalPages: Math.ceil(totalDataCount / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch data!",
    });
  }
};

const addData = async (req, res) => {
  try {
    const { name, email, spot, checkInDate, checkOutDate, reason } = req.body;

    if (!name || !email || !spot || !checkInDate || !checkOutDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Create a new booking entry
    const newBooking = new SelfBooking({
      name,
      email,
      spot,
      checkInDate,
      checkOutDate,
      reason,
    });

    await newBooking.save();

    // Find the selected spot
    const findSelectedSpot = await SpotsRvPark.findById(spot);
    if (!findSelectedSpot) {
      return res.status(404).json({
        success: false,
        message: "Spot not found.",
      });
    }

    // Process availability
    const { availability } = findSelectedSpot;
    const { available = [], booked = [] } = availability || {};

    const checkIn = new Date(checkInDate).toISOString().split("T")[0];
    const checkOut = new Date(checkOutDate).toISOString().split("T")[0];

    const updatedBooked = [...booked, { from: checkIn, to: checkOut }];
    const updatedAvailable = [];

    for (const range of available) {
      const from = range.from;
      const to = range.to;

      if (from <= checkIn && (to === "future" || to >= checkOut)) {
        if (from < checkIn) {
          updatedAvailable.push({ from, to: dayBefore(checkIn) });
        }
        if (to === "future" || checkOut < to) {
          updatedAvailable.push({ from: dayAfter(checkOut), to });
        }
      } else {
        updatedAvailable.push(range);
      }
    }

    // Save spot updates
    findSelectedSpot.isAvailable = 0; // optional, mark spot as unavailable
    findSelectedSpot.availability.booked = updatedBooked;
    findSelectedSpot.availability.available = updatedAvailable;

    await findSelectedSpot.save();

    return res.status(201).json({
      success: true,
      message: "Booking added and spot availability updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to add booking!",
    });
  }
};

// Utility functions
const dayBefore = (dateStr) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

const dayAfter = (dateStr) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

export { addData, getData };
