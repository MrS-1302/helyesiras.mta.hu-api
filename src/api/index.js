const express = require('express');

const check = require('./endpoints/check');

const router = express.Router();

router.use('/check', check);

router.all('*', async (req, res, next) => {
    res.json({
        status: "nope"
    })
});

module.exports = router;