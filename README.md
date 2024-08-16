# helyesiras.mta.hu-api
Unofficial api for [helyesiras.mta.hu](https://helyesiras.mta.hu/helyesiras/default/suggest).

Use: [mtahelyesiras.myversion.hu](https://mtahelyesiras.myversion.hu)

## For self host

```bash
git clone https://github.com/MrS-1302/helyesiras.mta.hu-api.git
cd helyesiras.mta.hu-api
npm i
# optional | nano src/conf.json
node src/index.js
```

http://localhost:12300/

## Endpoints

| Endpoint (GET) | Descreption |
| --- | --- |
| /api/check/:word | Szó helyességét ellenőrzi |
| /api/status | Általános adatokat mutat az adatbázisról |

## Response

### /api/check/:word

```
{
    "status": integer,
    "msg": string,
    "fromCache" boolean
}
```

| Response | status | msg |
| --- | --- | --- |
| /api/check/:word | 1 | helyes |
|  |  | hibás |
| /api/check/:word | 0 | Ismeretlen hiba! |
|  |  | Csak egy szót tartalmazhat! |
|  |  | Nem tartalmazhat speciális karaktert! |

<details>
    <summary>Examples</summary>

+ **/api/check/Enikő**

```json
{
    "status": 1,
    "msg": "helyes",
    "fromCache": false
}
```
+ **/api/check/enikő**
    
```json
{
    "status": 1,
    "msg": "hibás",
    "fromCache": true
}
```
+ **/api/check/alma_hello**
    
```json
{
    "status": 0,
    "msg": "Nem tartalmazhat speciális karaktert!",
    "fromCache": false
}
```
</details>

### /api/status

```
{
    "dbSize": string,
    "wordsViewed": integer,
    "cachedWords": integer,
    "validWords": integer,
    "notValidWords": integer,
    "lastCachedWord": {
        "word": string,
        "valid": integer,
        "viewed": integer,
        "cached": string
    },
    "mostFamousWord": {
        "word": string,
        "valid": integer,
        "viewed": integer,
        "cached": string
    }
}
```

<details>
    <summary>Example</summary>
    
```json
{
    "dbSize": "0.01 MB",
    "wordsViewed": 9,
    "cachedWords": 4,
    "validWords": 4,
    "notValidWords": 0,
    "lastCachedWord": {
        "word": "körte",
        "valid": 1,
        "viewed": 1,
        "cached": "2024-08-16 10:44:50"
    },
    "mostFamousWord": {
        "word": "alma",
        "valid": 1,
        "viewed": 5,
        "cached": "2024-08-16 10:17:17"
    }
}
```
</details>
