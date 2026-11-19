// Worker della Cappella: serve il sito statico (cartella public/)
// e il contatore delle candidature su /api/candidature.
// GET  /api/candidature -> { conteggio }
// POST /api/candidature -> { conteggio, pratica }
// Non salva dati personali: solo il numero totale e la data dell'ultima domanda.

const CHIAVE = "conteggio";

const json = (dati, stato = 200) =>
  new Response(JSON.stringify(dati), {
    status: stato,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

async function leggi(env) {
  const valore = await env.CANDIDATURE.get(CHIAVE);
  return Number.parseInt(valore ?? "0", 10) || 0;
}

async function candidature(request, env) {
  if (request.method === "GET") return json({ conteggio: await leggi(env) });
  if (request.method === "POST") {
    const nuovo = (await leggi(env)) + 1;
    await env.CANDIDATURE.put(CHIAVE, String(nuovo));
    await env.CANDIDATURE.put("ultima", new Date().toISOString());
    return json({ conteggio: nuovo, pratica: nuovo });
  }
  return json({ errore: "Metodo non previsto dal regolamento." }, 405);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/candidature") return candidature(request, env);
    return env.ASSETS.fetch(request);
  },
};
