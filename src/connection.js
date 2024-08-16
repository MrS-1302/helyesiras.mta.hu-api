var sqlite3 = require('sqlite3');
const these = require('mr.s-these');

var dbCon = new sqlite3.Database('./src/words.db', err => {
    if (err) {
        these.log('e', err.message);
    }
    these.log('s', 'Connected to the database.');
});

function run(asd) {
    return new Promise((resolve) => {
        dbCon.run(asd, [], (err, result) => {
            resolve(true)
        });
    });
}

function all(asd) {
    return new Promise((resolve) => {
        dbCon.all(asd, [], (err, result) => {
            resolve(result)
        });
    });
}

(async function () {
    await run("CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY, word VARCHAR(75), valid BOOLEAN, viewed INT DEFAULT 1, cached DATETIME)");
    await run("CREATE TRIGGER IF NOT EXISTS set_words_timestamp AFTER INSERT ON words FOR EACH ROW WHEN NEW.cached IS NULL BEGIN UPDATE words SET cached = datetime('now', 'localtime') WHERE id = NEW.id; END;");
})()

module.exports = {all, run}