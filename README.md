# Pribehy 2

## TODO

- sinty files
- nejake API na vtipy (https://jokeapi.dev/) (co offline?)
- LLM API?
- questy
- main screen (menu)
  - credits
  - hlasky
- intro

## Convo style

```JavaScript
{
  "[jmeno odkazu]": {
    text: "[text ktery se ukaze]",
    next?: "[jmeno odkazu, na ktery se presune]",
    options?: {                                          // NOTE: jmeno odkazu se trimuje,
      "[odkaz, na ktery se presune]": "[text moznosti]", // takze "odkaz1" a "odkaz1   " 
      "[odkaz, na ktery se presune]": "[text moznosti]", // odkazuji na stejny odkaz
      ...                                                // (uzitecne, kdyz vice moznosti
    },                                                   // odkazuje na stejny odkaz)
    code?: "[JS kod, ktery se provede v eval() *před* write()]"
  } 
}
```
- Vstupni odkaz je `start`
- Pokud `jmeno` neexistuje v JSON, funkce ho vrati.
- V text je povoleno HTML
