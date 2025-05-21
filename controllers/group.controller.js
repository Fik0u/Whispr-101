const Group = require("../model/Group");
const Message = require('../model/Message');


// Create new group
exports.newGroup = async (req, res) => {
    const { name, description, admin, members } = req.body;
    if (!name || ! admin) {
        return res.status(400).json({ msg: 'Name & Admin are required' })
    }
    try {
        let membersList = members || [];
        if (!membersList.includes(admin)) {
            membersList.push(admin)
        }

        const newGroup = new Group({
            name, description, admin, members: membersList
        });

        const savedGroup = await newGroup.save();
        res.status(201).json(savedGroup);
    } catch (error) {
        res.status(400).json({ msg: 'Error creating group', error })
    }
};

// Add member to the group
exports.addMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ msg: 'User is required' })
    }
    try {
        const group = await Group.findById(groupId)
        if (!group) return res.status(404).json({ msg: 'Group not found'})
        if (!group.members.includes(userId)) {
            group.members.push(userId);
            await group.save()
        }
        res.status(200).json({ msg: 'User added to group successfully', group})
    } catch (error) {
        res.status(400).json({ msg: 'Error adding member', error})
    }
};

// Remove member from group
exports.removeMember = async (req, res) => {
    const { groupId } = req.params;
    const { userId } = req.body;

    if(!userId) {
        return res.status(400).json({ msg: 'User is required' })
    }
    try {
        const group = await Group.findById(groupId);
        if(!group) {
            return res.status(404).json({ msg: 'Group not found' })
        }
        group.members = group.members.filter(memberId => memberId.toString() !== userId);
        await group.save();
        const updatedGroup = await Group.findById(groupId)
            .populate('members', 'username')
            .populate('admin', 'username')

        res.status(200).json({ msg: 'User removed from group successfully', group: updatedGroup })
    } catch (error) {
        res.status(400).json({ msg: 'Error removing member', error })
    }
};

// Find user's groups
exports.getGroups = async (req, res) => {
    const { userId } = req.params;
    try {
        const groups = await Group.find({ members: userId }).populate('members', 'username').populate('admin', 'username');

        res.status(200).json({ msg: 'Groups fetched successfully', groups })
    } catch (error) {
        console.error(error)
        res.status(400).json({ msg: 'Error getting groups', error })
    }
};

// Send Group Message
exports.sendGroupMessage = async (req, res) => {
    const { groupId } = req.params;
    const { senderId, text } = req.body;
    if (!senderId || !text) {
        return res.status(400).json({ msg: 'Send & Text are required' })
    }
    try {
        const message = new Message({
            sender: senderId, text
        });
        const savedMessage = await message.save();
        const group = await Group.findById(groupId);
        group.messages.push(savedMessage._id);
        await group.save();
        res.status(201).json({ msg: 'Message sent successfully', savedMessage })
    } catch (error) {
        res.status(400).json({ msg: "Couldn't send group message", error })
    }
};

// Get group messages
exports.getGroupMessages = async (req, res) => {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId).populate({
            path: 'messages',
            populate: { path: 'sender', select: 'username avatar' }
        });
        if (!group) {
            return res.status(404).json({ msg: 'Group not found'});
        }
        res.status(200).json({ msg: 'Group messages found succesfully', group })
    } catch (error) {
        res.status(400).json({ msg: "Couldn't get group messages", error })
    }
};