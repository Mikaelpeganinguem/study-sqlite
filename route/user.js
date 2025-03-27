const express = require('express');
const User = require('../model/user');
const router = express.Router();


router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.post('/users', async (req, res) => {
    try {
        const { username, birthday } = req.body;
        if (!username || !birthday) {
            res.status(400).json({ error: "Bad request - username and birthday are required" });
        } else {
            // Convert birthday to YYYY-MM-DD format
            const [day, month, year] = birthday.split('/');
            const formattedBirthday = `${year}-${month}-${day}`;
            const user = await User.create({ username, birthday: formattedBirthday });
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update(req.body);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

module.exports = router;