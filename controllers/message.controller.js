const Message = require("../model/Message");



exports.getMessages = async (req, res) => {
    const { userId, otherUserId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: otherUserId },
                { senderId: otherUserId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages)

    } catch (error) {
        res.status(400).json({ msg: "Couldn't get messages", error })
    }
};

exports.createMessage = async (req, res) => {
    const { senderId, receiverId, text } = req.body;
    try {
        const message = new Message({ senderId, receiverId, text });

        const savedMessage = await message.save();

        res.status(200).json(savedMessage)

    } catch (error) {
        res.status(400).json({ msg: "Error while sending message", error })
    }
};