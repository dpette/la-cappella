# La Cappella

Sito ufficiale della Cappella, culto che conta 5 membri: [lacappella.org](https://lacappella.org).

Pagina unica statica, ospitata su Cloudflare Pages. L'unica parte dinamica è il contatore delle candidature, una Pages Function che salva un numero su Cloudflare KV.

## Struttura

```
index.html                    testi e struttura della pagina
assets/css/stile.css          stile
assets/js/sito.js             figurine, galleria, modulo, contatore, cookie
assets/img/presidenti/        foto di insediamento (mandato-N.webp)
assets/img/galleria/          foto della cappella (foto-NN.webp)
assets/img/membri/            ritratti delle figurine
functions/api/candidature.js  contatore delle candidature
wrangler.toml                 configurazione Cloudflare
```

## Aggiornamenti ricorrenti

**Nuovo presidente**
1. Aggiungere la foto in `assets/img/presidenti/mandato-N.webp` (verticale 3:4, volto dell'estrattore sfocato).
2. In `index.html`, sezione `#presidenti`: aggiungere una `<figure class="insediamento">` in cima all'albo, spostare la classe `in-carica` sulla nuova figura e aggiornare il riquadro "Presidente in carica".
3. In `assets/js/sito.js` aggiornare il conteggio delle presidenze del membro in `MEMBRI`.

**Nuove foto in galleria**: aggiungere `foto-NN.webp` in `assets/img/galleria/` e una riga nell'elenco `FOTO` di `assets/js/sito.js` (data, descrizione). Sfocare i volti di chi non è membro.

**Modifica ai comandamenti**: sezione `#comandamenti` di `index.html`. Ricordare che chi propone la modifica non vota.

## Primo deploy su Cloudflare

1. Workers & Pages → KV → creare il namespace `cappella-candidature` e copiarne l'id in `wrangler.toml`.
2. Workers & Pages → Create → Pages → collegare questo repository. Build command: nessuno. Output directory: `/`.
3. Nelle impostazioni del progetto Pages → Bindings → aggiungere il KV namespace con nome `CANDIDATURE` (se non letto da `wrangler.toml`).
4. Custom domains → aggiungere `lacappella.org` e `www.lacappella.org`.

## Prova in locale

```
npx wrangler pages dev .
```
