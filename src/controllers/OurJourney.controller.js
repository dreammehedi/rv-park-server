import cloudinary from "../config/cloudinary.config.js";
import OurJourney from "../models/OurJourney.model.js";

const getData = async (req, res) => {
  try {
    const data = await OurJourney.find();
    res.status(200).json({
      success: true,
      payload: data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateData = async (req, res) => {
  try {
    const { id, title, description, journeyItems } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid ID!",
      });
    }

    const data = await OurJourney.findById(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data not found!",
      });
    }

    const updatedFields = {
      ...(title && { title }),
      ...(description && { description }),
      ...(journeyItems && { journeyItems }), // Accept full array from frontend
    };

    // Handle image upload (optional - for top-level image only)
    if (req.file) {
      try {
        const cloudinaryResult = req.file;

        // Remove old image if it exists
        if (data.imagePublicId) {
          await cloudinary.uploader.destroy(data.imagePublicId);
        }

        updatedFields.image = cloudinaryResult.path;
        updatedFields.imagePublicId = cloudinaryResult.filename;
      } catch (fileError) {
        return res.status(500).json({
          success: false,
          message: "File upload failed.",
          error: fileError.message,
        });
      }
    }

    const updatedData = await OurJourney.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while updating the data!",
    });
  }
};


// export { addData, getData, updateData };
export { getData, updateData };

