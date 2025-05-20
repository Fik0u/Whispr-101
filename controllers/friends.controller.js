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

// Get Friend Requests List
exports.getFriendRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate({
            path: "friendRequests",
            select: "username avatar"
        });
        res.status(200).json({ msg: "Friend requests list fetched successfully", friendRequests: user.friendRequests })
    } catch (error) {
        res.status(400).json({ msg: "Couldn't get the requests list", error })
    }
};

// Get Sent Requests List
exports.getSentRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate({
            path: 'sentRequests',
            select: 'username avatar status'
        });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }
        res.status(200).json({ msg: 'Sent requests fetched successfully', sentRequests: user.sentRequests })
    } catch (error) {
        console.error(error)
        res.status(400).json({ msg: "Error fetching sent requests", error })
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
            if (!user.friends.includes(senderId)) user.friends.push(senderId);
            if (!sender.friends.includes(userId)) sender.friends.push(userId);
        }
        await user.save();
        await sender.save();
        res.status(200).json({ msg: accept ? 'Friend added' : 'Request rejected' });
    } catch (error) {
        res.status(400).json({ msg: "Couldn't respond the request" })
    }
};

// Get Friends List
exports.getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({
            path: "friends",
            select: "username avatar status"
        });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' })
        }
        const friendsList = user.friends;
        res.status(200).json({ msg: 'Friends list fetched successfully', friendsList })
    } catch (error) {
        res.statsu(400).json({ msg: "Couldn't find the friends list" })
    }
};