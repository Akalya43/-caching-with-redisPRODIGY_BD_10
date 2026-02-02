const express = require('express');
const router = express.Router();
const User = require('../models/User');
const redisClient = require('../cache/redisClient');
router.get('/', async (req, res) => {
    try {
        const cacheResults = await redisClient.get('all_users');

        if (cacheResults) {
            console.log('Serving from cache');
            return res.json(JSON.parse(cacheResults));
        }
        const users = await User.find();
        await redisClient.setEx('all_users', 60, JSON.stringify(users)); // cache for 60 seconds
        console.log('Serving from MongoDB');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        await redisClient.del('all_users'); // invalidate cache
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        await redisClient.del('all_users'); 
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await redisClient.del('all_users'); 
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;
