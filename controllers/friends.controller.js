const User = require("../model/User");



// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { recipientId } = req.body;

        if (senderId.toString() === recipientId) {
            return res.status(400).json({ msg: "You can't add yourself 🫤" })
        }

        const sender = await User.findById(senderId);
        const recipient = await User.findById(recipientId);

        if (!recipient) return res.status(404).json({ msg: 'User not found' });
        
        if (sender.friends.includes(recipientId)) {
            return res.status(400).json({ msg: "Request already sent" })
        }

        sender.sentRequests.push(recipientId);
        recipient.friendRequests.push(senderId);

        await sender.save();
        await recipient.save();

        res.status(200).json({ msg: 'Friend request successfully sent'});
    } catch (error) {
        res.status(400).json({ msg: "Couldn't send request", error })
    }
};

// Respond Friend Request (Accept or Reject)
exports.respondFriendRequest = async (req, res) => {
    try {
        const userId = req.user._id;
        const { senderId, accept } = req.body;

        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!user.friendRequests.includes(senderId)) {
            return res.status(400).json({ msg: 'Request not found' })
        }

        user.friendRequests = user.friendRequests.filter(id => id.toString() !== senderId);
        sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== userId);
        if (accept) {
            user.friends.push(senderId);
            sender.friends.push(userId);
        }
        await user.save();
        await sender.save();
        res.status(200).json({ msg: accept ? 'Friend added' : 'Request rejected' });
    } catch (error) {
        res.status(400).json({ msg: "Couldn't respond the request" })
    }
};