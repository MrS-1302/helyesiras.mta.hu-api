const express = require('express');
const router = express.Router();
const db = require('../../connection');

router.get('/mostFamousWords', async (req, res, next) => {
    const mostFamousWords = await db.all('SELECT word, valid, checked, cached FROM words ORDER BY checked DESC LIMIT 10');

    res.json({
        mostFamousWords: mostFamousWords
    });
})

router.get('/lastCachedWords', async (req, res, next) => {
    const lastCachedWords = await db.all('SELECT word, valid, checked, cached FROM words ORDER BY cached DESC LIMIT 10');

    res.json({
        lastCachedWords: lastCachedWords
    });
})

module.exports = router;
