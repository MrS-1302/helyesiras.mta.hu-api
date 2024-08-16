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
| /word/check/:word | Szó helyességét ellenőrzi |
| /word/random | DB ből egy random szóval tér vissza |
| /lists/mostFamousWords | TOP 10 legtöbbször ellenőrzött szó |
| /lists/lastCachedWords | Utolsó 10 rögízett szó |
| /stats | Általános adatokat mutat az adatbázisról |

## Response

### /word/check/:word

```
{
    "status": integer,
    "msg": string,
    "fromCache" boolean
}
```

| status | msg |
| --- | --- |
| 1 | helyes |
|  | hibás |
| 0 | Ismeretlen hiba! |
|  | Csak egy szót tartalmazhat! |
|  | Nem tartalmazhat speciális karaktert! |

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

### /word/random

```
{
    "word": string
}
```

<details>
    <summary>Example</summary>


```json
{
    "word": "alma"
}
```
</details>

### /lists/mostFamousWords

```
{
    "mostFamousWords": [
        {
            "word": string,
            "valid": integer,
            "checked": integer,
            "cached": string
        },
        ...
    ]
}
```

<details>
    <summary>Example</summary>


```json
{
    "mostFamousWords": [
        {
            "word": "alma",
            "valid": 1,
            "checked": 6,
            "cached": "2024-08-16 10:44:50"
        }
        //...
    ]
}
```
</details>

### /lists/lastCachedWords

```
{
    "lastCachedWords": [
        {
            "word": string,
            "valid": integer,
            "checked": integer,
            "cached": string
        },
        ...
    ]
}
```

<details>
    <summary>Example</summary>


```json
{
    "lastCachedWords": [
        {
            "word": "alma",
            "valid": 1,
            "checked": 6,
            "cached": "2024-08-16 10:44:50"
        }
        //...
    ]
}
```
</details>

### /stats

```
{
    "dbSize": string,
    "wordsChecked": integer,
    "cachedWords": integer,
    "validWords": integer,
    "notValidWords": integer,
    "lastCachedWord": {
        "word": string,
        "valid": integer,
        "checked": integer,
        "cached": string
    },
    "mostFamousWord": {
        "word": string,
        "valid": integer,
        "checked": integer,
        "cached": string
    }
}
```

<details>
    <summary>Example</summary>
    
```json
    {
        "dbSize": "0.01 MB",
        "wordsChecked": 9,
        "cachedWords": 4,
        "validWords": 4,
        "notValidWords": 0,
        "lastCachedWord": {
            "word": "körte",
            "valid": 1,
            "checked": 1,
            "cached": "2024-08-16 10:44:50"
        },
        "mostFamousWord": {
            "word": "alma",
            "valid": 1,
            "checked": 5,
            "cached": "2024-08-16 10:17:17"
        }
    }
```
</details>