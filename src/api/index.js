const express = require('express');

const check = require('./endpoints/check');
const status = require('./endpoints/status');

const router = express.Router();

router.use('/check', check);
router.use('/status', status);

router.all('*', async (req, res, next) => {
    res.json({
        status: "nope"
    })
});

module.exports = router;