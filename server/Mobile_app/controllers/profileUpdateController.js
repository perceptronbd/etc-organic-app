const asyncHandler = require("express-async-handler");
const UserDetails = require("../../models/userDetailsModel");
const cloudinary = require('../../utils/cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();

exports.upload = multer({ storage: storage });

exports.uploadProfileImage = asyncHandler(async (req, res) => {
 const userId = req.user._id;

 // Check if the file was uploaded
 if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
 }

 let image;
 try {
    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "profile_images" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    // Prepare the image object with Cloudinary's public_id and secure_url
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };

    const userDetails = await UserDetails.findOne({ user: userId });

    if (userDetails) {
       // If userDetails exists, update the image
       userDetails.image = image;
       await userDetails.save();
    } else {
       // If userDetails does not exist, create a new one
       const newUserDetails = await UserDetails.create({
         user: userId,
         image,
       });
   
       if (!newUserDetails) {
         throw new Error("Failed to create user details");
       }
    }
   
    res.status(200).json({
       message: "Image updated successfully",
       imagePath: image.secure_url,
    });
 } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return res.status(500).json({ message: 'Server error' });
 }


});

exports.uploadNationalImage = asyncHandler(async (req, res) => {
  const userId = req.user._id;
 
  // Check if the file was uploaded
  if (!req.file) {
     return res.status(400).json({ message: 'No file uploaded' });
  }
 
  let nationalIdImage;
  try {
     // Upload image to Cloudinary
     const result = await new Promise((resolve, reject) => {
       cloudinary.uploader.upload_stream(
         { folder: "national_id_images" },
         (error, result) => {
           if (error) reject(error);
           else resolve(result);
         }
       ).end(req.file.buffer);
     });
 
     // Prepare the nationalIdImage object with Cloudinary's public_id and secure_url
     nationalIdImage = {
       public_id: result.public_id,
       secure_url: result.secure_url
     };
 
     const userDetails = await UserDetails.findOne({ user: userId });
 
     if (userDetails) {
       // If userDetails exists, update the nationalIdImage
       userDetails.nationalIdImage = nationalIdImage;
       await userDetails.save();
     } else {
       // If userDetails does not exist, create a new one
       const newUserDetails = await UserDetails.create({
         user: userId,
         nationalIdImage,
       });
 
       if (!newUserDetails) {
         throw new Error("Failed to create user details");
       }
     }
 
     res.status(200).json({
       message: "National ID Image updated successfully",
       imagePath: nationalIdImage.secure_url,
     });
  } catch (error) {
     console.error('Error uploading image to Cloudinary:', error);
     return res.status(500).json({ message: 'Server error' });
  }
 });

exports.handleDistrictAndDivision = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { district, division } = req.body;

  console.log("req.body", req.body);

  const missingFields = [];

  // Check if district is empty
  if (!district) {
    missingFields.push("District");
  }

  // Check if division is empty
  if (!division) {
    missingFields.push("Division");
  }

  // Construct a message based on the missing fields
  let message;
  if (missingFields.length === 1) {
    message = `Please provide ${missingFields[0]}`;
  } else if (missingFields.length > 1) {
    message = `Please provide ${missingFields.join(", ")}`;
  }

  // If there are missing fields, return the message
  if (message) {
    return res.status(400).json({ message });
  }

  const userDetails = await UserDetails.findOne({ user: userId });

  if (userDetails) {
    userDetails.district = district || userDetails.district;
    userDetails.thana = division || userDetails.thana;
    await userDetails.save();
  } else {
    // Create a new userDetails if it doesn't exist
    const newUserDetails = await UserDetails.create({
      user: userId,
      district,
      thana: division,
    });

    if (!newUserDetails) {
      throw new Error("Failed to create user details");
    }
  }

  res
    .status(200)
    .json({ message: "District and Division updated successfully" });
});

exports.getProfileDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userDetails = await UserDetails.findOne({ user: userId });

  if (!userDetails) {
    throw new Error("User details not found");
  }

  res.status(200).json({ userDetails });
});


