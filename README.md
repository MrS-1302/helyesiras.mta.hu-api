# helyesiras.mta.hu-api
Nem hivatalos api a helyesiras.mta.hu hoz.

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
    "msg": string
}

```

| Response | status | msg |
| --- | --- | --- |
| /api/check/:word | 1 | helyes |
|  |  | hibás |
| /api/check/:word | 0 | Ismeretlen hiba! |
|  |  | Csak egy szót tartalmazhat! |
|  |  | Nem tartalmazhat speciális karaktert! |

### /api/status

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