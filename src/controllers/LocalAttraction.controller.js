import cloudinary from "../config/cloudinary.config.js";
import LocalAttraction from "../models/LocalAttraction.model.js";
const getDataFrontend = async (req, res) => {
  try {
    const data = await LocalAttraction.find();

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

    const data = await LocalAttraction.find(query).skip(skip).limit(limit);
    const totalDataCount = await LocalAttraction.countDocuments(query);

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

// const addData = async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     // Validate required fields
//     const missingFields = [];
//     if (!title) missingFields.push("Title");
//     if (!description) missingFields.push("Description");

//     if (missingFields.length > 0) {
//       return res.status(400).json({
//         success: false,
//         message: `${missingFields.join(", ")} field(s) are required.`,
//       });
//     }

//     const cloudinaryResult = req.file;
//     if (!cloudinaryResult) {
//       res.status(500).json({
//         success: false,
//         message: "Image is required!",
//       });
//       return;
//     }

//     const newData = new LocalAttraction({
//       title,
//       description,
//       image: cloudinaryResult.path,
//       imagePublicId: cloudinaryResult.filename,
//       status: 1,
//     });
//     // Save to database
//     await newData.save();

//     res.status(201).json({
//       success: true,
//       message: "Data added successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to add data!",
//     });
//   }
// };

// const updateData = async (req, res) => {
//   try {
//     const { id, ...otherFields } = req.body;

//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide a valid ID!",
//       });
//     }

//     const data = await LocalAttraction.findById(id);

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Data not found!",
//       });
//     }

//     let updatedFields = { ...otherFields };
//     if (req.file) {
//       try {
//         if (data.imagePublicId) {
//           await cloudinary.uploader.destroy(data.imagePublicId);
//         }
//         const cloudinaryResult = req.file;

//         // Add the new image data to updated fields
//         updatedFields.image = cloudinaryResult.path;
//         updatedFields.imagePublicId = cloudinaryResult.filename;
//       } catch (imageError) {
//         return res.status(500).json({
//           success: false,
//           message: "Image update failed.",
//           error: imageError.message,
//         });
//       }
//     }

//     await LocalAttraction.findByIdAndUpdate(id, updatedFields, {
//       new: true,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Data updated successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "An error occurred while updating the data!",
//     });
//   }
// };

const addData = async (req, res) => {
  try {
    const {
      title,
      description,
      lat,
      long,
      proximity,
      nearbyPoints,
      distanceFrom,
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("Title");
    if (!description) missingFields.push("Description");
    if (!lat) missingFields.push("Latitude");
    if (!long) missingFields.push("Longitude");
    if (!proximity) missingFields.push("Proximity");
    if (!nearbyPoints) missingFields.push("Nearby Points");
    if (!distanceFrom) missingFields.push("Distance From");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `${missingFields.join(", ")} field(s) are required.`,
      });
    }

    const cloudinaryResult = req.file;
    if (!cloudinaryResult) {
      res.status(500).json({
        success: false,
        message: "Image is required!",
      });
      return;
    }
    const proximityData = JSON.parse(proximity);
    const nearbyPointsData = JSON.parse(nearbyPoints);

    const newData = new LocalAttraction({
      title,
      description,
      lat,
      long,
      proximity: proximityData,
      nearbyPoints: nearbyPointsData,
      distanceFrom,
      image: cloudinaryResult.path,
      imagePublicId: cloudinaryResult.filename,
      status: 1,
    });
    // Save to database
    await newData.save();

    res.status(201).json({
      success: true,
      message: "Data added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add data!",
    });
  }
};

const updateData = async (req, res) => {
  try {
    const { id, nearbyPoints, proximity, ...otherFields } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await LocalAttraction.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    const nearbyPointsData = JSON.parse(nearbyPoints);
    const proximityData = JSON.parse(proximity);

    let updatedFields = {
      ...otherFields,
      proximity: proximityData,
      nearbyPoints: nearbyPointsData,
    };
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

    await LocalAttraction.findByIdAndUpdate(id, updatedFields, {
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
    const data = await LocalAttraction.findById(id);

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

    await LocalAttraction.findByIdAndDelete(id);

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

    const data = await LocalAttraction.findById(id);
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
export { addData, deleteData, getData, getDataFrontend, updateData, viewData };
