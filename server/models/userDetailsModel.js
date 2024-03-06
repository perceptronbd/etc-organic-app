const mongoose = require('mongoose');
const mobileUserModel = require('./mobileUserModel');



const userDetailsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: mobileUserModel
    },
    image: {
        public_id: {
            type: String,
            
          },
          secure_url: {
            type: String,
            
          
          },
    },
    nationalIdImage: {
        public_id: {
            type: String,
            
          },
          secure_url: {
            type: String,
           
          
          },
    },
    district: {
        type: String,
        required: false
    },
    thana: {
        type: String,
        required: false
    }
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = UserDetails;