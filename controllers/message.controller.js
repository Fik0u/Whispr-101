const Message = require("../model/Message");



exports.getMessages = async (req, res) => {
    const { userId, otherUserId } = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: otherUserId },
                { sender: otherUserId, receiver: userId }
            ]
        }).sort({ timestamp: 1 })
        .populate([
            { path: 'sender', select: 'username avatar' },
            { path: 'receiver', select: 'username avatar' }]);

        res.status(200).json(messages)

    } catch (error) {
        console.error(error)
        res.status(400).json({ msg: "Couldn't get messages", error })
    }
};

exports.createMessage = async (req, res) => {
    const { senderId, receiverId, text } = req.body;
    if (!senderId || !receiverId || !text) {
        return res.status(400).json({ msg: "Sender, receiver, and text are required." });
    }
    
    try {
        const message = new Message({ sender: senderId, receiver: receiverId, text });

        const savedMessage = await message.save();

        const populatedMessage = await savedMessage
        .populate([
            { path: 'sender', select: 'username avatar' },
            { path: 'receiver', select: 'username avatar' }
        ])

        res.status(200).json(populatedMessage)

    } catch (error) {
        console.error(error)
        res.status(400).json({ msg: "Error while sending message", error })
    }
};