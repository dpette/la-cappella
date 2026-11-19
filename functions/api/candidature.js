// Contatore delle candidature della Cappella (Cloudflare Pages Function).
// GET  /api/candidature -> { conteggio }
// POST /api/candidature -> { conteggio, pratica }
// Non salva dati personali: solo il numero totale e la data dell'ultima domanda.
// Richiede un namespace KV collegato con il nome CANDIDATURE.

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

export async function onRequestGet({ env }) {
  return json({ conteggio: await leggi(env) });
}

export async function onRequestPost({ env }) {
  const nuovo = (await leggi(env)) + 1;
  await env.CANDIDATURE.put(CHIAVE, String(nuovo));
  await env.CANDIDATURE.put("ultima", new Date().toISOString());
  return json({ conteggio: nuovo, pratica: nuovo });
}
