# La Cappella

Sito ufficiale della Cappella, culto che conta 5 membri: [lacappella.org](https://lacappella.org).

Pagina unica statica, pubblicata come Cloudflare Worker con asset statici. L'unica parte dinamica è il contatore delle candidature, gestito dal Worker, che salva un numero su Cloudflare KV.

## Struttura

```
public/index.html                    testi e struttura della pagina
public/assets/css/stile.css          stile
public/assets/js/sito.js             figurine, galleria, modulo, contatore, cookie
public/assets/img/presidenti/        foto di insediamento (mandato-N.webp)
public/assets/img/galleria/          foto della cappella (foto-NN.webp)
public/assets/img/membri/            ritratti delle figurine
src/worker.js                        contatore delle candidature + servizio del sito
wrangler.toml                        configurazione Cloudflare
```

## Aggiornamenti ricorrenti

**Nuovo presidente**
1. Aggiungere la foto in `public/assets/img/presidenti/mandato-N.webp` (verticale 3:4, volto dell'estrattore sfocato).
2. In `public/index.html`, sezione `#presidenti`: aggiungere una `<figure class="insediamento">` in cima all'albo, spostare la classe `in-carica` sulla nuova figura e aggiornare il riquadro "Presidente in carica".
3. In `public/assets/js/sito.js` aggiornare il conteggio delle presidenze del membro in `MEMBRI`.

**Nuove foto in galleria**: aggiungere `foto-NN.webp` in `public/assets/img/galleria/` e una riga nell'elenco `FOTO` di `public/assets/js/sito.js` (data, descrizione). Sfocare i volti di chi non è membro.

**Modifica ai comandamenti**: sezione `#comandamenti` di `public/index.html`. Ricordare che chi propone la modifica non vota.

## Deploy su Cloudflare

Il Worker `la-cappella` è collegato a questo repository: ogni push su `main` viene pubblicato in automatico (`npx wrangler deploy`).
- Il contatore usa il namespace KV `cappella-candidature`, già indicato in `wrangler.toml`.
- Dominio: Worker → Settings → Domains & Routes → `lacappella.org` e `www.lacappella.org`.

## Prova in locale

```
npx wrangler dev
```
