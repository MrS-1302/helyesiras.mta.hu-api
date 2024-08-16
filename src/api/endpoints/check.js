const express = require('express');
const router = express.Router();
const these = require('mr.s-these');
const axios = require('axios');
const https = require('https');
var querystring = require('querystring');
const db = require('../../connection');

router.get('/*', async (req, res, next) => {
    let q = decodeURIComponent(req.path.slice(1));
    let status = 0;
    let msg = 'Ismeretlen hiba!';
    let fromCache = false;
    if (q.indexOf(' ') == -1) {
        if (!/[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ\-]/g.test(q)) {
            check = await db.all(`SELECT * FROM words WHERE word = '${q}'`);

            if (check.length == 1) {
                fromCache = true;
                await db.run(`UPDATE words SET viewed = viewed + 1 WHERE word = '${q}'`);
                if (check[0].valid == 1) {
                    status = 1;
                    msg = 'helyes';
                } else if (check[0].valid == 0) {
                    status = 1;
                    msg = 'hibás';
                }
            } else {
                const agent = axios.create({
                    httpsAgent: new https.Agent({  
                        rejectUnauthorized: false
                    })
                });

                const response = await agent({
                    headers: { 
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: 'POST',
                    url: 'https://helyesiras.mta.hu/helyesiras/default/suggest',
                    data: querystring.stringify({
                        word: q,
                        _formkey: '4ef997c2-85a9-4770-ad36-60f28c4755cc',
                        _formname: 'default'
                    })
                })

                const result = response.data.match(/(?<=<b>).*(?=<)/g);
                if (result.length == 1 && result[0] == 'helyes') {
                    status = 1;
                    msg = 'helyes';
                } else if (result.length == 1 && result[0] == 'ismeretlen') {
                    status = 1;
                    msg = 'hibás';
                }

                these.log('i', `New word saved! | valid: ${msg == 'helyes' ? 'true ' : 'false'} | ${q} `);
                await db.run(`INSERT INTO words (word, valid) VALUES ('${q}', ${msg == 'helyes' ? 1 : 0})`);
            }
        } else {
            msg = 'Nem tartalmazhat speciális karaktert!';
        }
    } else {
        msg = 'Csak egy szót tartalmazhat!';
    }

    res.json({status: status, msg: msg, fromCache:fromCache});
});

module.exports = router;
