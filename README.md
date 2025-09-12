# I manoscritti di Marcello Oretti – Sito riscritto

- Navbar unificata
- Breadcrumb nelle pagine interne
- Navigazione precedente/successiva nelle opere
- Griglia del catalogo generata automaticamente da `data/opere.json`
- Placeholder immagini in `images/placeholder.jpg`

## Aggiornare il Catalogo
Per aggiungere una nuova opera:
1. Crea `item-opera-XXX.html` (con numero progressivo).
2. Popola titolo (elemento `<h1>`) e immagine nella pagina.
3. Non serve modificare `catalog.html`: la griglia legge automaticamente `data/opere.json`.
4. Rigenera `data/opere.json` (puoi utilizzare lo script di build o rigenerare con lo stesso processo usato ora).
