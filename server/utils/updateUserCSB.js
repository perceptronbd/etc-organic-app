const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Product = require("../models/productModel");
const MobileUser = require('../models/mobileUserModel')
const WalletHistory = require('../models/walletHistory');

const updateUserCSB = asyncHandler(async (productId, customerId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error('Product not found');
    }
    const productCSB = product.csb;
    const productPoints = product.points;
    const primaryCSBIncrement = 0.45 * productCSB * quantity;

    await MobileUser.findByIdAndUpdate(customerId, {
        $inc: { CSB: primaryCSBIncrement, points: productPoints* quantity, totalCSB: primaryCSBIncrement }
    });

    let remainingCSB = 1-0.45;
    const distributionPercentages = [0.20, 0.10, 0.05, 0.03, 0.02, 0.01];
    let currentUserId = customerId;
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB'); // Format: YYYY-MM-DD
    const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' }); 
        

    for (let i = 0; i < distributionPercentages.length; i++) {
        const currentUser = await MobileUser.findById(currentUserId);
        // console.log(currentUser.referredBy);
        if (currentUser.referredBy.equals(new ObjectId('65f5e017685c5c2075118160'))) {
            break;
        }

        
        const newWalletHistory = new WalletHistory({
            recieverId:currentUser.referredBy,
            purchaserId:customerId,
            date: formattedDate,
            time: currentTime,
            csb: distributionPercentages[i] * productCSB * quantity,
            percentage: distributionPercentages[i],
        });
        
        await newWalletHistory.save();

        const increment = distributionPercentages[i] * productCSB * quantity;
        remainingCSB -= distributionPercentages[i];

        await MobileUser.findByIdAndUpdate(currentUser.referredBy, {
            $inc: { CSB: increment, totalCSB: increment }
        });

        currentUserId = currentUser.referredBy;
    }

    if (remainingCSB > 0) {
        const motherAccountId = '6570b8a8b40bb675bcffd527';

        await MobileUser.findByIdAndUpdate(motherAccountId, {
            $inc: { CSB: productCSB*remainingCSB*quantity, totalCSB: productCSB*remainingCSB*quantity }
        });

        const newWalletHistory = new WalletHistory({
            recieverId:motherAccountId,
            purchaserId:customerId,
            date: formattedDate,
            time: currentTime,
            csb: productCSB*remainingCSB*quantity,
            percentage: remainingCSB,
        });
        await newWalletHistory.save();
    }
});

module.exports = updateUserCSB;
