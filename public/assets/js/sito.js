(function () {
  /* ---------- Membri ---------- */
  var CAPELLI = {
    folto: '<path d="M30 58 C26 20 94 14 92 56 C86 40 70 34 60 36 C46 36 36 44 30 58 Z" fill="#6E1C2C"/><path d="M34 46 C42 26 80 22 88 44" stroke="#4F1220" stroke-width="3" fill="none"/>',
    diradato: '<path d="M32 52 C34 30 88 28 90 52 C82 42 74 40 70 44 C64 38 56 38 50 44 C46 40 38 42 32 52 Z" fill="#6E1C2C" opacity=".85"/>',
    stempiato: '<path d="M32 54 C34 40 42 34 48 34 C44 40 42 46 42 52 Z M90 54 C88 40 80 34 74 34 C78 40 80 46 80 52 Z M54 30 C58 26 66 26 70 30 C66 34 58 34 54 30 Z" fill="#6E1C2C"/>',
    rasato: '<path d="M38 36 C46 30 54 30 58 32" stroke="#F1E6D0" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>'
  };
  var DOMINIO = ['lacappella', 'org'].join('.');
  var MEMBRI = [
    { nome: 'Giovanni Bonesso', ammissione: '2016, fondatore', capelli: 'Folto', tipo: 'folto', presidenze: '2', foto: 'bonesso', posta: 'gio },
    { nome: 'Matteo Celin', ammissione: '2016, fondatore', capelli: 'Stempiato', tipo: 'stempiato', presidenze: '0', foto: 'celin', posta: 'cel },
    { nome: 'Daniel Pettenon', ammissione: '2017, ammissione tardiva', capelli: 'Stempiato', tipo: 'stempiato', presidenze: '3, in carica', foto: 'daniel', posta: 'facc },
    { nome: 'Matteo Scanferla', ammissione: '2016, fondatore', capelli: 'Stempiato', tipo: 'stempiato', presidenze: '0', foto: 'scanferla', posta: 'scanf },
    { nome: 'Stefano Nosella', ammissione: '2016, fondatore', capelli: 'Rasato (non pelato)', tipo: 'rasato', presidenze: '1', foto: 'nosella', posta: 'nose }
  ];
  function ritratto(tipo) {
    return '<svg viewBox="0 0 122 140" aria-hidden="true">' +
      '<path d="M8 140 C8 104 34 92 61 92 C88 92 114 104 114 140 Z" fill="#1F2A44"/>' +
      '<rect x="50" y="78" width="22" height="20" fill="#C9A88A"/>' +
      '<ellipse cx="61" cy="58" rx="30" ry="34" fill="#E2C2A4"/>' +
      '<ellipse cx="31" cy="60" rx="5" ry="8" fill="#D9B595"/><ellipse cx="91" cy="60" rx="5" ry="8" fill="#D9B595"/>' +
      CAPELLI[tipo] +
      '<circle cx="50" cy="62" r="3" fill="#1F2A44"/><circle cx="72" cy="62" r="3" fill="#1F2A44"/>' +
      '<path d="M52 78 C58 82 64 82 70 78" stroke="#1F2A44" stroke-width="2.5" fill="none" stroke-linecap="round"/>' +
      '</svg>';
  }
  function mescola(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  var contenitore = document.getElementById('figurine');
  function disegnaFigurine() {
    var numeri = mescola([2, 3, 4, 2, 3]);
    contenitore.innerHTML = MEMBRI.map(function (m, i) {
      return '<article class="figurina">' +
        '<div class="stagione">STAGIONE 2026</div>' +
        '<div class="ritratto"><img src="assets/img/membri/' + m.foto + '.webp" alt="Ritratto di ' + m.nome + '" width="480" height="600"></div>' +
        '<div class="nome"><h3>' + m.nome + '</h3><span class="numero">N. ' + numeri[i] + '</span></div>' +
        '<dl><dt>Ammissione</dt><dd>' + m.ammissione + '</dd>' +
        '<dt>Capelli</dt><dd>' + m.capelli + '</dd>' +
        '<dt>Presidenze</dt><dd>' + m.presidenze + '</dd></dl>' +
        '<a class="recapito" href="mailto:' + m.posta + '@' + DOMINIO + '">' + m.posta + '<wbr>@' + DOMINIO + '</a>' +
        '</article>';
    }).join('');
  }
  disegnaFigurine();
  document.getElementById('rimescola').addEventListener('click', disegnaFigurine);

  /* ---------- Galleria ---------- */
  var FOTO = [
    ['31/07/2021', 'In spiaggia, al tramonto'],
    ['16/10/2021', 'Serata di poker'],
    ['18/02/2022', 'In piazza, sotto il cuore luminoso'],
    ['Data non verbalizzata', 'Selfie di gruppo'],
    ['11/06/2025', 'Compleanno con cappellini'],
    ['29/08/2025', 'Al luna park'],
    ['13/09/2025', 'In bici sul lago'],
    ['14/09/2025', 'Al minigolf'],
    ['22/02/2026', 'Uscita notturna'],
    ['2026', 'In macchina, addio al celibato'],
    ['21/06/2026', 'In piazza, d\'estate'],
    ['17/10/2026', 'A cena']
  ];
  var galleria = document.getElementById('galleria');
  galleria.innerHTML = FOTO.map(function (f, i) {
    var n = String(i + 1).padStart(2, '0');
    return '<button type="button" data-i="' + i + '" aria-label="Apri foto ' + (i + 1) + ': ' + f[1] + ', ' + f[0] + '">' +
      '<img src="assets/img/galleria/foto-' + n + '.webp" alt="" loading="lazy">' +
      '<span class="n">N. ' + n + '</span></button>';
  }).join('');
  var visore = document.getElementById('visore');
  var vImg = document.getElementById('visore-img');
  var vCap = document.getElementById('visore-cap');
  galleria.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var i = +b.dataset.i; var n = String(i + 1).padStart(2, '0');
    vImg.src = 'assets/img/galleria/foto-' + n + '.webp';
    vImg.alt = FOTO[i][1];
    vCap.textContent = 'Foto della Cappella n. ' + n + ' · ' + FOTO[i][0] + ' · ' + FOTO[i][1];
    if (visore.showModal) visore.showModal(); else visore.setAttribute('open', '');
  });
  document.getElementById('chiudi-visore').addEventListener('click', function () { visore.close(); });
  visore.addEventListener('click', function (e) { if (e.target === visore) visore.close(); });

  /* ---------- Contatore candidature ---------- */
  var conteggio = null;
  function mostraConteggio() {
    var testo = conteggio === null ? '…' : String(conteggio);
    document.querySelectorAll('[data-conteggio]').forEach(function (el) { el.textContent = testo; });
    var prossima = conteggio === null ? '…' : String(conteggio + 1).padStart(4, '0');
    document.querySelectorAll('[data-prossima]').forEach(function (el) { el.textContent = prossima; });
  }
  mostraConteggio();
  function aggiornaConteggio(dati) {
    if (dati && typeof dati.conteggio === 'number') { conteggio = dati.conteggio; mostraConteggio(); }
  }
  fetch('/api/candidature').then(function (r) { return r.ok ? r.json() : null; })
    .then(aggiornaConteggio).catch(function () {});

  /* ---------- Modulo ---------- */
  var form = document.getElementById('domanda');
  var esito = document.getElementById('esito');
  var errore = document.getElementById('errore');
  var motivazione = document.getElementById('motivazione');
  motivazione.addEventListener('input', function () { document.getElementById('caratteri').textContent = motivazione.value.length; });
  var nessuno = document.getElementById('t-nessuno');
  form.addEventListener('change', function (e) {
    if (e.target.name !== 'titoli') return;
    if (e.target === nessuno && nessuno.checked) {
      form.querySelectorAll('input[name="titoli"]').forEach(function (c) { if (c !== nessuno) c.checked = false; });
    } else if (e.target !== nessuno && e.target.checked) { nessuno.checked = false; }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var mancanti = [];
    if (!document.getElementById('nome').value.trim()) mancanti.push('il nome');
    if (!motivazione.value.trim()) mancanti.push('la motivazione');
    if (!document.getElementById('presa-visione').checked) mancanti.push('la presa visione dei comandamenti');
    if (mancanti.length) {
      errore.textContent = 'Per protocollare la domanda manca ' + mancanti.join(', ') + '.';
      errore.hidden = false; return;
    }
    errore.hidden = true;
    var numero = (conteggio || 0) + 1;
    conteggio = numero; mostraConteggio();
    fetch('/api/candidature', { method: 'POST' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (dati) {
        aggiornaConteggio(dati);
        if (dati && dati.pratica) document.getElementById('numero-pratica').textContent = String(dati.pratica).padStart(4, '0');
      }).catch(function () {});
    document.getElementById('numero-pratica').textContent = String(numero).padStart(4, '0');
    form.hidden = true;
    esito.hidden = false;
    esito.classList.remove('esito-anim'); void esito.offsetWidth; esito.classList.add('esito-anim');
    esito.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  document.getElementById('ripresenta').addEventListener('click', function () {
    form.reset();
    document.getElementById('caratteri').textContent = '0';
    esito.hidden = true; form.hidden = false;
    document.getElementById('nome').focus();
  });

  /* ---------- Indice attivo ---------- */
  var voci = document.querySelectorAll('.indice ol a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        voci.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false'); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }

  /* ---------- Cookie ---------- */
  var cookie = document.getElementById('cookie');
  var accettato = false;
  try { accettato = localStorage.getItem('cappella-cookie') === '1'; } catch (e) {}
  if (!accettato) cookie.hidden = false;
  cookie.querySelectorAll('[data-accetta]').forEach(function (b) {
    b.addEventListener('click', function () {
      cookie.hidden = true;
      try { localStorage.setItem('cappella-cookie', '1'); } catch (e) {}
    });
  });
})();
