const MobileUser = require("../../models/mobileUserModel");


async function getCSBandTaka(req, res) {
    try {
      const user = req.user._id;
  
      const existingUser = await MobileUser.findById(user);
  
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let { CSB, taka } = existingUser;

      console.log(CSB, taka);
      
  
      // if (CSB === 0 || taka === 0) {
      //   return res.status(400).json({ message: "CSB or Taka cannot be zero" }); // Error for zero CSB
      // }
  
      //send taka and CSB as response
      return res.status(200).json({ taka, CSB });
    
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  
  module.exports = { getCSBandTaka };
  