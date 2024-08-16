const express = require('express');
const router = express.Router();
const these = require('mr.s-these');
const db = require('../../connection');

router.get('/*', async (req, res, next) => {
    dbSize = these.fileSize('./src/words.db') + ' MB';
    wordsViewed = await db.all('SELECT SUM(viewed) AS wordsViewed FROM words');
    cachedWords = await db.all('SELECT * FROM words');
    validWords = await db.all('SELECT * FROM words WHERE valid IS TRUE');
    notValidWords = await db.all('SELECT * FROM words WHERE valid IS FALSE');
    lastCachedWord = await db.all('SELECT word, valid, viewed, cached FROM words ORDER BY cached DESC LIMIT 1');
    mostFamousWord = await db.all('SELECT word, valid, viewed, cached FROM words ORDER BY viewed DESC LIMIT 1');

    res.json({
        dbSize: dbSize,
        wordsViewed: wordsViewed[0]['wordsViewed'] || 0,
        cachedWords: cachedWords.length,
        validWords: validWords.length,
        notValidWords: notValidWords.length,
        lastCachedWord: lastCachedWord[0] || {},
        mostFamousWord: mostFamousWord[0] || {}
    });
})


module.exports = router;
