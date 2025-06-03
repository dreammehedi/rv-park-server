import cron from "node-cron";
import cloudinary from "../config/cloudinary.config.js";
import SpotsRvPark from "../models/SpotsRvPark.model.js";
const getDataFrontend = async (req, res) => {
  try {
    const data = await SpotsRvPark.find();

    res.status(200).json({
      success: true,
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getData = async (req, res) => {
  try {
    const { skip, limit } = req.pagination;
    const search = req.query.search || "";
    const searchRegex = new RegExp(search, "i");

    // Build the base query
    let query = {};
    if (req.headers["x-source"] === "admin") {
      query = {
        $or: [{ title: searchRegex }],
      };
    } else if (req.headers["x-source"] === "frontend") {
      query = {
        status: 1,
        $or: [{ title: searchRegex }],
      };
    }

    const data = await SpotsRvPark.find(query).skip(skip).limit(limit);
    const totalDataCount = await SpotsRvPark.countDocuments(query);

    // Respond with the data
    res.status(200).json({
      success: true,
      payload: data,
      pagination: {
        totalData: totalDataCount,
        totalPages: Math.ceil(totalDataCount / limit),
        currentPage: req.pagination.page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addData = async (req, res) => {
  try {
    const { title, description, coordination } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!description) missingFields.push("Description");
    if (!coordination) missingFields.push("Coordination");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} field(s) are required.`,
      });
    }

    const cloudinaryResult = req.file;
    if (!cloudinaryResult) {
      return res.status(500).json({
        success: false,
        message: "Image is required!",
      });
    }

    // Constructing the document
    const newData = new SpotsRvPark({
      title,
      description,
      coordination,
      image: cloudinaryResult.path,
      imagePublicId: cloudinaryResult.filename,
      status: 1,
    });

    // Save to database
    await newData.save();

    res.status(201).json({
      success: true,
      message: "Data added successfully.",
      data: newData,
    });
  } catch (error) {
    console.error("AddData Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add data!",
    });
  }
};

const updateData = async (req, res) => {
  try {
    const { id, ...otherFields } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await SpotsRvPark.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    let updatedFields = { ...otherFields };
    if (req.file) {
      try {
        if (data.imagePublicId) {
          await cloudinary.uploader.destroy(data.imagePublicId);
        }
        const cloudinaryResult = req.file;

        // Add the new image data to updated fields
        updatedFields.image = cloudinaryResult.path;
        updatedFields.imagePublicId = cloudinaryResult.filename;
      } catch (imageError) {
        return res.status(500).json({
          success: false,
          message: "Image update failed.",
          error: imageError.message,
        });
      }
    }

    await SpotsRvPark.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data!",
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Please provide valid ID!",
      });
    }
    const data = await SpotsRvPark.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    if (data.image) {
      const publicId = data.imagePublicId;

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudinaryError) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete image from Cloudinary.",
          error: cloudinaryError.message,
        });
      }
    }

    await SpotsRvPark.findByIdAndDelete(id);

    res.json({ success: true, message: "Data deleted successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the data!",
    });
  }
};

const viewData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await SpotsRvPark.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }

    res.status(200).json({
      success: true,
      payload: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while fetching the data!",
    });
  }
};
const updateSpotAvailability = async () => {
  const today = new Date().toISOString().split("T")[0];
  const currentDate = new Date(today);

  const spots = await SpotsRvPark.find();

  for (const spot of spots) {
    let isStillBooked = false;

    // ✅ Filter out expired bookings
    const updatedBooked = spot.availability.booked.filter((range) => {
      const toDate = new Date(range.to);

      if (!range.to || range.to === "future") {
        isStillBooked = true;
        return true; // Keep "future" or open-ended bookings
      }

      if (currentDate <= toDate) {
        isStillBooked = true;
        return true; // Still valid booking
      }

      // Expired booking
      return false;
    });

    // ✅ Filter out expired available ranges
    const updatedAvailable = spot.availability.available.filter((range) => {
      const toDate = new Date(range.to === "future" ? "2999-12-31" : range.to);
      return currentDate <= toDate;
    });

    // Set availability based on booked
    const newAvailability = isStillBooked ? 0 : 1;

    // Update only if something has changed
    const availabilityChanged = spot.isAvailable !== newAvailability;
    const bookedChanged =
      JSON.stringify(spot.availability.booked) !==
      JSON.stringify(updatedBooked);
    const availableChanged =
      JSON.stringify(spot.availability.available) !==
      JSON.stringify(updatedAvailable);

    if (availabilityChanged || bookedChanged || availableChanged) {
      spot.isAvailable = newAvailability;
      spot.availability.booked = updatedBooked;
      spot.availability.available = updatedAvailable;
      await spot.save();
    }
  }
};

// updateSpotAvailability();
// Run at 12:01 AM
cron.schedule("1 0 * * *", async () => {
  await updateSpotAvailability();
});

// Run at 12:00 PM
cron.schedule("0 12 * * *", async () => {
  await updateSpotAvailability();
});

export { addData, deleteData, getData, getDataFrontend, updateData, viewData };
