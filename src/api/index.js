const express = require('express');

const check = require('./endpoints/check');
const random = require('./endpoints/random');
const list = require('./endpoints/lists');
const stats = require('./endpoints/stats');

const router = express.Router();

router.use('/word/check', check);
router.use('/word/random', random);
router.use('/lists', list);
router.use('/stats', stats);

router.all('*', async (req, res, next) => {
    res.json({
        status: "nope"
    })
});

module.exports = router;