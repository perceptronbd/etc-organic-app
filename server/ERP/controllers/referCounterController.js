const MobileUser = require('../../models/mobileUserModel');

async function countReferrals(req, res) {
 try {
    const userId= req.params.userId; // Assuming the user ID is passed as a URL parameter
    const count = await MobileUser.countDocuments({ referredBy: userId });
    res.json({ count });
 } catch (error) {
    console.error('Error counting referrals:', error);
    res.status(500).json({ error: 'An error occurred while counting referrals.' });
 }
}

module.exports = {countReferrals}