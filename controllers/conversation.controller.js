const Conversation = require('../model/Conversation');
const User = require('../model/User');

// Create new conversation
exports.createConversation = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        let foundConv = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (foundConv) {
            return res.status(200).json(foundConv)
        }

        const newConv = new Conversation({
            members: [senderId, receiverId]
        })

        const savedConv = await newConv.save();
        res.status(201).json(savedConv)
    } catch (error) {
        res.status(400).json(error)
    }
};

// Get user's conversations
exports.getConversations = async (req, res) => {
    const userId = req.params.userId;
    try {
        const convs = await Conversation.find({
            members: { $in: [userId] }
        }).populate({
            path: 'members',
            select: 'username'
        });
        return res.status(200).json(convs)
    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
};