const express = require('express');
const router = express.Router();
const these = require('mr.s-these');
const db = require('../../connection');

router.get('/', async (req, res, next) => {
    const dbSize = these.fileSize('./src/words.db') + ' MB';
    const wordsChecked = await db.all('SELECT SUM(checked) AS wordsChecked FROM words');
    const cachedWords = await db.all('SELECT * FROM words');
    const validWords = await db.all('SELECT * FROM words WHERE valid IS TRUE');
    const notValidWords = await db.all('SELECT * FROM words WHERE valid IS FALSE');
    const lastCachedWord = await db.all('SELECT word, valid, checked, cached FROM words ORDER BY cached DESC LIMIT 1');
    const mostFamousWord = await db.all('SELECT word, valid, checked, cached FROM words ORDER BY checked DESC LIMIT 1');

    res.json({
        dbSize: dbSize,
        wordsChecked: wordsChecked[0]['wordsChecked'] || 0,
        cachedWords: cachedWords.length,
        validWords: validWords.length,
        notValidWords: notValidWords.length,
        lastCachedWord: lastCachedWord[0] || {},
        mostFamousWord: mostFamousWord[0] || {}
    });
})


module.exports = router;
