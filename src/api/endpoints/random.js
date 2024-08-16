const express = require('express');
const router = express.Router();
const db = require('../../connection');

router.get('/', async (req, res, next) => {
    const random = await db.all('SELECT word FROM words WHERE LENGTH(word) >= 3 AND valid = 1 ORDER BY RANDOM() LIMIT 1');

    res.json({
        word: (random.length != 0 ? random[0]['word'] : 'alma')
    });
})


module.exports = router;
