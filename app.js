// Plans from 19/10/2026 (after the InBody of 19/10: legs are the least developed part, 104–105% vs arms ~120%).
// Thursday A = legs first (the day before the game: legs always with 3 reps in reserve), Saturday B = upper body only
// (Sunday is the long run). Exercise ids never change, so the history of each exercise is kept.
const EXD = {
  squat: { id: "squat", n: "Squat con bilanciere", s: 3, lo: 4, hi: 6, inc: 2.5, rest: 180, start: 50, cue: "Al rack, bilanciere sui trapezi, piedi larghezza spalle. Scendi finché le cosce sono parallele, schiena neutra, risali spingendo con tutto il piede. 3 ripetizioni in canna: domani c'è la partita. Le prime due sedute servono a trovare il carico giusto." },
  rdl_bil: { id: "rdl_bil", n: "Stacco rumeno con bilanciere", s: 3, lo: 6, hi: 8, inc: 2.5, rest: 150, start: 50, cue: "Ginocchia appena piegate, porta il bacino indietro e fai scendere il bilanciere vicino alle gambe fino a metà tibia. Schiena neutra, femorali in tensione. 3 in canna." },
  bulgaro: { id: "bulgaro", n: "Split squat bulgaro", s: 2, lo: 8, hi: 10, inc: 2, rest: 90, start: 10, cue: "kg di un manubrio, serie per gamba. Piede dietro sulla panca, scendi dritto. Allena una gamba alla volta, come nella corsa. 3 ripetizioni in canna." },
  leg_curl: { id: "leg_curl", n: "Leg curl", s: 2, lo: 10, hi: 12, inc: 2.5, rest: 75, start: 30, cue: "Femorali: proteggono le ginocchia nei cambi di direzione del basket e nella corsa. Sali in 1 secondo, scendi in 3." },
  calf: { id: "calf", n: "Polpacci su step, una gamba", s: 3, lo: 10, hi: 15, inc: 2, rest: 60, start: 8, cue: "Avampiede sul bordo dello step, tieniti con una mano. Scendi lento (3 secondi) fino in fondo, sali in punta e tieni 1 secondo. kg = manubrio nell'altra mano, serie per gamba. Polpacci e tendine d'Achille forti reggono la maratona.", alt: "In alternativa: spinta di punta al leg press, gambe tese, 3×12–15." },
  hip_thrust: { id: "hip_thrust", n: "Hip thrust con bilanciere", s: 3, lo: 8, hi: 10, inc: 2.5, rest: 120, start: 60, cue: "Schiena appoggiata alla panca, bilanciere sulle anche (con un cuscinetto). Spingi coi glutei fino ad avere busto e cosce in linea, tieni 1 secondo. Glutei forti = falcata e salto." },
  panca: { id: "panca", n: "Panca piana con bilanciere", s: 3, lo: 6, hi: 8, inc: 2.5, rest: 150, start: 60, cue: "Scapole strette e basse, piedi a terra, bilanciere sul petto basso. Il tuo massimale è 80 kg: si parte da 60." },
  trazioni: { id: "trazioni", n: "Trazioni alla sbarra", s: 3, lo: 6, hi: 10, inc: 2.5, rest: 120, start: 0, bw: true, cue: "kg = zavorra: 0 a corpo libero. Quando fai 3×10, aggiungi 2,5 kg con la cintura o un manubrio tra i piedi." },
  inclinata: { id: "inclinata", n: "Panca inclinata con manubri", s: 4, lo: 8, hi: 12, inc: 2, rest: 120, start: 20, cue: "Panca a 30°, kg di un manubrio. Il petto alto è quello che si vede in maglietta." },
  lat: { id: "lat", n: "Lat machine presa stretta", s: 3, lo: 10, hi: 12, inc: 2.5, rest: 90, start: 50, cue: "Petto verso la sbarra, risali lento. La V parte da qui." },
  lento: { id: "lento", n: "Lento avanti manubri seduto", s: 3, lo: 8, hi: 10, inc: 2, rest: 120, start: 14, cue: "kg di un manubrio. Addome contratto, non inarcare la schiena." },
  pulley: { id: "pulley", n: "Pulley basso", s: 3, lo: 10, hi: 12, inc: 2.5, rest: 90, start: 45, cue: "Busto fermo, tira verso l'ombelico, scapole indietro.", alt: "Senza pulley: rematore con bilanciere, 40 kg." },
  alzate: { id: "alzate", n: "Alzate laterali con manubri", s: 4, lo: 12, hi: 20, inc: 1, rest: 60, start: 7, cue: "kg di un manubrio. Leggero e pulito: le spalle larghe fanno metà del fisico." },
  facepull: { id: "facepull", n: "Face pull al cavo", s: 3, lo: 12, hi: 15, inc: 2.5, rest: 60, start: 20, cue: "Corda alla fronte, gomiti alti: protegge le spalle.", alt: "Senza cavo: alzate posteriori a busto flesso, 6 kg." },
  curl: { id: "curl", n: "Curl su panca inclinata", s: 3, lo: 10, hi: 12, inc: 1, rest: 60, start: 10, cue: "kg di un manubrio. Gomiti fermi dietro il busto." },
  pushdown: { id: "pushdown", n: "Pushdown alla corda", s: 3, lo: 10, hi: 12, inc: 2.5, rest: 60, start: 20, cue: "Gomiti incollati ai fianchi, apri la corda in fondo.", alt: "Senza cavo: french press con manubrio, 12 kg." },
  crunch: { id: "crunch", n: "Crunch alla macchina", s: 3, lo: 12, hi: 15, inc: 2.5, rest: 60, start: 30, cue: "Schiena appoggiata, arrotola la colonna portando lo sterno verso il bacino. Spingi con gli addominali, non con le braccia; risali lento.", alt: "Macchina occupata: crunch al cavo in ginocchio, stesso carico di partenza." },
  panca_incl_bil: { id: "panca_incl_bil", n: "Panca inclinata con bilanciere", s: 3, lo: 6, hi: 8, inc: 2.5, rest: 150, start: 50, cue: "Panca a 30°, bilanciere sotto le clavicole. Parti dall'80% circa del carico di panca piana." },
  trazioni_strette: { id: "trazioni_strette", n: "Trazioni presa neutra o supina", s: 3, lo: 6, hi: 10, inc: 2.5, rest: 120, start: 0, bw: true, cue: "Mani a larghezza spalle: più bicipite e dorsale bassa. kg = zavorra." },
  panca_man: { id: "panca_man", n: "Panca piana con manubri", s: 4, lo: 8, hi: 12, inc: 2, rest: 120, start: 24, cue: "kg di un manubrio. Scendi finché i gomiti sono poco sotto la panca." },
  lat_larga: { id: "lat_larga", n: "Lat machine presa larga", s: 3, lo: 10, hi: 12, inc: 2.5, rest: 90, start: 50, cue: "Mani oltre le spalle, tira verso il petto alto. Allarga la V." },
  military: { id: "military", n: "Military press in piedi con bilanciere", s: 3, lo: 6, hi: 8, inc: 2.5, rest: 150, start: 35, cue: "Glutei e addome stretti, il bilanciere sale passando vicino al viso. Niente slancio con le gambe." },
  rematore_appoggio: { id: "rematore_appoggio", n: "Rematore manubri con petto in appoggio", s: 3, lo: 10, hi: 12, inc: 2, rest: 90, start: 16, cue: "Panca inclinata a 30°, petto appoggiato, kg di un manubrio. Stringi le scapole in alto." },
  alzate_cavo: { id: "alzate_cavo", n: "Alzate laterali al cavo", s: 4, lo: 12, hi: 15, inc: 1.25, rest: 60, start: 5, cue: "Un braccio alla volta, cavo dietro la schiena: tensione costante.", alt: "Senza cavo: alzate laterali con manubri." },
  curl_bil: { id: "curl_bil", n: "Curl con bilanciere", s: 3, lo: 8, hi: 12, inc: 2.5, rest: 60, start: 25, cue: "Gomiti fermi ai fianchi, niente slancio con la schiena." },
  french: { id: "french", n: "French press con bilanciere EZ", s: 3, lo: 10, hi: 12, inc: 2.5, rest: 60, start: 20, cue: "Sdraiato, bilanciere verso la fronte, gomiti fermi." },
  leg_raise: { id: "leg_raise", n: "Leg raise alla sbarra", s: 3, lo: 10, hi: 15, inc: 2.5, rest: 60, start: 0, cue: "Appeso, gambe su fino a 90° senza dondolare. Troppo facile? Gambe tese più in alto." }
};
// Exercises of the first version of the plans (until 18/10): not in the plans any more, kept so their history still shows.
const LEGACY = [
  { id: "rematore", n: "Rematore con manubrio", s: 3, lo: 8, hi: 12, inc: 2, rest: 90, start: 24, cue: "" },
  { id: "rdl", n: "Stacco rumeno con manubri", s: 2, lo: 8, hi: 10, inc: 2, rest: 90, start: 18, cue: "" },
  { id: "croci", n: "Croci ai cavi", s: 3, lo: 12, hi: 15, inc: 2.5, rest: 60, start: 10, cue: "" },
  { id: "rematore_bil", n: "Rematore con bilanciere", s: 3, lo: 8, hi: 10, inc: 2.5, rest: 120, start: 45, cue: "" },
  { id: "dip", n: "Dip alle parallele", s: 3, lo: 8, hi: 12, inc: 2.5, rest: 90, start: 0, bw: true, cue: "" }
];
const pick = (...ids) => ids.map(id => EXD[id]);
const BLOCK1 = {
  A: { name: "Gambe e forza", day: "Giovedì", dur: "≈ 70 min", note: "Prima le gambe, quando sei fresco: forza per la maratona, il basket e il calcetto. Sempre 3 ripetizioni in canna: domani c'è la partita.",
    ex: pick("squat", "rdl_bil", "bulgaro", "leg_curl", "calf", "panca", "trazioni") },
  B: { name: "Estetica", day: "Sabato", dur: "≈ 60 min", note: "Solo parte alta, zero gambe: domani c'è il lungo. Recuperi brevi.",
    ex: pick("inclinata", "lat", "lento", "pulley", "alzate", "facepull", "curl", "pushdown", "crunch") }
};
const B2A = { name: "Gambe e forza", day: "Giovedì", dur: "≈ 70 min", note: "Nuovo stimolo per le gambe: entra l'hip thrust. Le prime due sedute prendi le misure ai carichi nuovi. Domani c'è la partita: 3 in canna.",
  ex: pick("squat", "hip_thrust", "bulgaro", "leg_curl", "calf", "panca_incl_bil", "trazioni_strette") };
const B2B = { name: "Estetica", day: "Sabato", dur: "≈ 60 min", note: "Solo parte alta, zero gambe: domani c'è il lungo. Più lavoro su spalle e braccia.",
  ex: pick("panca_man", "lat_larga", "military", "rematore_appoggio", "alzate_cavo", "facepull", "curl_bil", "french", "leg_raise") };
const maint = p => ({ ...p, note: "Mantenimento: arrivano i lunghi da 26–32 km. Una serie in meno, tieni i carichi del blocco 2 senza per forza salire.", ex: p.ex.filter(e => e.id !== "bulgaro").map(e => ({ ...e, s: Math.max(2, e.s - 1) })) });
const BLOCKS = [
  { n: 1, name: "Base", from: "2026-10-17", to: "2026-11-30", end: "2026-11-28", A: BLOCK1.A, B: BLOCK1.B, desc: "Il giovedì costruisci le gambe (squat, stacco rumeno, polpacci), il sabato la parte alta. Sali di carico ogni settimana." },
  { n: 2, name: "Variazione", from: "2026-12-01", to: "2027-01-17", end: "2027-01-16", A: B2A, B: B2B, desc: "Stessi muscoli, esercizi nuovi: hip thrust per le gambe, più volume su spalle e braccia." },
  { n: 3, name: "Mantenimento", from: "2027-01-18", to: "2027-03-14", end: "2027-03-06", A: maint(B2A), B: maint(B2B), desc: "La maratona ha la priorità. Una serie in meno e niente bulgaro: l'obiettivo è non perdere niente." }
];
const blockOf = date => BLOCKS.find(b => date >= b.from && date <= b.to) || (date < BLOCKS[0].from ? BLOCKS[0] : BLOCKS[2]);
const planOf = (code, date) => blockOf(date)[code];
const EX = Object.fromEntries([...LEGACY, ...BLOCKS.flatMap(b => [...b.A.ex, ...b.B.ex]).reverse()].map(e => [e.id, e]));
const curPlan = () => planOf(draft.plan, draft.date);
const curEx = id => sessionEx().find(e => e.id === id) || exDef(id);
const HEIGHT = 188;
const BENCH_1RM = 80;

const state = { sessions: [], body: [], profile: [], nutrition: [], intake: [], runs: [], photo: [], coach: [] };
let draft = null, dirty = false, saveTimer = null;

const $ = id => document.getElementById(id);
const arr = v => Array.isArray(v) ? v : [];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = v => { const n = parseFloat(String(v).replace(",", ".")); return isFinite(n) ? n : NaN; };
const r1 = n => Math.round(n * 10) / 10;
const fk = n => (Number.isInteger(n) ? String(n) : r1(n).toFixed(1)).replace(".", ",");
const today = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const ddmm = iso => iso.slice(8, 10) + "/" + iso.slice(5, 7);
const ts = iso => new Date(iso + "T12:00:00").getTime();
const GG = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
const MM = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
const longDate = iso => { const d = new Date(iso + "T12:00:00"); return `${GG[d.getDay()]} ${d.getDate()} ${MM[d.getMonth()]}`; };
const mmss = s => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
function lsGet(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch (e) { return fb; } }
// The phone's storage can fill up (photos waiting to be sent): saving then fails, so it is shown in the sync label.
let storageFull = false;
function lsSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); if (k === "olimpo-outbox") storageFull = false; return true; }
  catch (e) { if (k === "olimpo-outbox" || k === "olimpo-cache") { storageFull = true; if (typeof syncLabel === "function") syncLabel(); } return false; }
}

/* ---------- store: local-first, synced to Supabase ---------- */
// Every change is applied to the phone's copy first, queued in an outbox,
// and sent to Supabase when there is a connection (the gym may have none).
const CFG = window.OLIMPO_CONFIG || {};
const configured = !!(CFG.supabaseUrl && CFG.supabaseKey && !CFG.supabaseUrl.includes("INSERISCI"));
const sb = configured && window.supabase ? window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, storageKey: "olimpo-auth" } }) : null;
let uid = null, outbox = lsGet("olimpo-outbox", []), syncing = false;
const refused = new Set();   // changes the database refused (kept queued, shown to the user)

function setSync(text, off) {
  const el = $("sync");
  el.className = "sync " + (off ? "off" : "ok");
  el.querySelector("span").textContent = text;
  el.setAttribute("aria-label", text + (off ? ". Tocca per riprovare." : ""));
}
function syncLabel() {
  if (storageFull) return setSync("Memoria dell'app piena: collegati a internet per inviare le foto in attesa", true);
  if (!sb) return setSync("Non collegata al cloud: dati solo su questo telefono", true);
  if (!uid) return setSync("Accesso non fatto · tocca per entrare", true);
  if (refused.size) return setSync(`${refused.size} ${refused.size === 1 ? "modifica rifiutata" : "modifiche rifiutate"} dal database · tocca per riprovare`, true);
  if (!navigator.onLine) return setSync(outbox.length ? `Offline · ${outbox.length} modifiche da inviare` : "Offline · tutto salvato sul telefono", true);
  setSync(outbox.length ? `Invio ${outbox.length} modifiche…` : "Sincronizzato");
}
const cacheSave = () => lsSet("olimpo-cache", state);
// Photo images travel only in the outbox (until sent): the cached copy keeps everything but the image.
const withoutImage = (coll, data) => { if (coll !== "photo" || !data || !data.image) return data; const { image, ...rest } = data; return rest; };
function applyLocal(coll, id, data) {
  const list = state[coll].filter(x => x.id !== id);
  if (data) list.push({ id, ...withoutImage(coll, data) });
  state[coll] = list; cacheSave();
}
function enqueue(op) {
  outbox = outbox.filter(o => !(o.coll === op.coll && o.id === op.id));
  outbox.push(op); lsSet("olimpo-outbox", outbox);
}
// The change is queued and sent first, then the screens are redrawn: a drawing error can never block sending.
async function put(coll, id, data) { applyLocal(coll, id, data); enqueue({ op: "put", coll, id, data }); flush(); onData(); }
async function del(coll, id) { applyLocal(coll, id, null); enqueue({ op: "del", coll, id }); flush(); onData(); }
// A patch changes some fields of a photo still waiting for the agent, keeping the image already
// on the server. If the agent has analysed it in the meantime, the patch is dropped.
async function sendPatch(o) {
  const q = () => sb.from("docs").select("data").match({ user_id: uid, coll: o.coll, id: o.id }).eq("data->>status", "pending");
  const cur = await q();
  if (!cur.error && !cur.data.length) photoMsg("Una voce era già stata analizzata dal nutrizionista: la modifica al testo non è stata applicata.", "err");
  if (cur.error || !cur.data.length) return { error: cur.error };
  return sb.from("docs").update({ data: { ...cur.data[0].data, ...o.data }, updated_at: new Date().toISOString() })
    .match({ user_id: uid, coll: o.coll, id: o.id }).eq("data->>status", "pending");
}
// Run images (heart-rate chart and zones) are files in the private Storage bucket, under <user id>/<name>.
// They travel in the outbox like any change ("img" upload / "imgdel" removal), so they also work offline.
const BUCKET = "run-images";
const b64ToBlob = b64 => { const bin = atob(b64), a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return new Blob([a], { type: "image/jpeg" }); };
async function sendImg(o) {
  const path = uid + "/" + o.id, st = sb.storage.from(BUCKET);
  const r = o.op === "img" ? await st.upload(path, b64ToBlob(o.data), { upsert: true, contentType: "image/jpeg" }) : await st.remove([path]);
  if (!r.error) return { error: null };
  const code = r.error.statusCode || r.error.status;   // refused by Storage (e.g. bucket not created yet) vs. network problem
  return { error: code ? { code: String(code), message: r.error.message } : r.error };
}
const signedUrls = {};
async function imgUrl(name) {
  const local = outbox.find(o => o.coll === "img" && o.id === name && o.op === "img");
  if (local) return "data:image/jpeg;base64," + local.data;
  const c = signedUrls[name]; if (c && c.exp > Date.now()) return c.url;
  if (!sb || !uid || !navigator.onLine) return null;
  const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(uid + "/" + name, 3600);
  if (error || !data) return null;
  signedUrls[name] = { url: data.signedUrl, exp: Date.now() + 50 * 60e3 };
  return data.signedUrl;
}
async function fillImgs(root) {
  for (const el of root.querySelectorAll("img[data-img]")) { const u = await imgUrl(el.dataset.img); if (u) el.src = u; else el.replaceWith(Object.assign(document.createElement("span"), { textContent: "con internet" })); }
}
let flushAgain = false;   // a change arrived while sending: send again at the end
async function flush() {
  if (syncing) { flushAgain = true; return; }
  if (!sb || !uid || !navigator.onLine) { syncLabel(); return; }
  syncing = true; syncLabel();
  try {
    for (const o of [...outbox]) {
      const { error } = o.op === "put"
        ? await sb.from("docs").upsert({ user_id: uid, coll: o.coll, id: o.id, data: o.data, updated_at: new Date().toISOString() }, { onConflict: "user_id,coll,id" })
        : o.op === "patch" ? await sendPatch(o)
        : o.op === "img" || o.op === "imgdel" ? await sendImg(o)
        : await sb.from("docs").delete().match({ user_id: uid, coll: o.coll, id: o.id });
      const key = o.coll + "/" + o.id;
      if (error) {
        console.warn("sync", key, error);
        if (!error.code) throw error;   // network problem: stop and retry later
        refused.add(key); continue;     // refused by the database: keep it queued, send the rest
      }
      refused.delete(key);
      outbox = outbox.filter(x => x !== o); lsSet("olimpo-outbox", outbox);
    }
  } catch (e) { console.warn("sync", e); flushAgain = false; }   // offline: the next "online"/reopen retries
  finally { syncing = false; syncLabel(); if (flushAgain) { flushAgain = false; setTimeout(flush, 0); } }
}
// Supabase returns at most 1000 rows per request: read page by page.
async function fetchAll(make) {
  const out = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await make().range(from, from + 999);
    if (error) return { error };
    out.push(...data); if (data.length < 1000) return { data: out };
  }
}
// Daily plans and coach reports are big: only the last 60 days are downloaded, older ones stay as saved on the phone.
const RECENT = ["nutrition", "coach"], recentFrom = () => shiftDate(today(), -60);
let lastPull = 0;
async function pull() {
  if (!sb || !uid || !navigator.onLine) return;
  const from = recentFrom();
  // Photo images are not downloaded back: the phone already has its thumbnails.
  const { data, error } = await fetchAll(() => sb.from("docs").select("coll,id,data").neq("coll", "photo").or(`coll.not.in.(${RECENT.join(",")}),id.gte.${from}`).order("coll").order("id"));
  const ph = await fetchAll(() => sb.from("docs").select("coll,id,date:data->>date,time:data->>time,note:data->>note,status:data->>status,text_only:data->text_only,items:data->items,kcal:data->kcal,protein:data->protein,carbs:data->carbs,fat:data->fat,ai_note:data->>ai_note").eq("coll", "photo").order("coll").order("id"));
  if (error) { console.warn("pull", error); return; }
  lastPull = Date.now();
  if (!ph.error) for (const r of ph.data) { const { coll, id, ...rest } = r; data.push({ coll, id, data: rest }); }
  const pending = new Set(outbox.map(o => o.coll + "/" + o.id));
  const next = Object.fromEntries(Object.keys(state).map(k => [k, []]));
  if (ph.error) next.photo = state.photo.filter(p => !pending.has("photo/" + p.id));   // keep the list on screen if photos failed this time
  for (const k of RECENT) next[k] = state[k].filter(x => x.id < from && !pending.has(k + "/" + x.id));
  for (const r of data) {
    if (!next[r.coll]) continue;
    const patch = outbox.find(o => o.op === "patch" && o.coll === r.coll && o.id === r.id);
    if (patch) next[r.coll].push({ id: r.id, ...r.data, ...(r.data.status === "pending" ? patch.data : {}) });
    else if (!pending.has(r.coll + "/" + r.id)) next[r.coll].push({ id: r.id, ...withoutImage(r.coll, r.data) });
  }
  for (const o of outbox) if (o.op === "put" && next[o.coll]) next[o.coll].push({ id: o.id, ...withoutImage(o.coll, o.data) });
  Object.assign(state, next); cacheSave(); onData();
}
const resync = () => flush().then(pull);

function showLogin(text) { $("login").hidden = false; if (text) $("l-msg").textContent = text; $("l-form").hidden = !sb; }
function hideLogin() { $("login").hidden = true; }
$("l-form").addEventListener("submit", async e => {
  e.preventDefault();
  if (!navigator.onLine) { $("l-msg").textContent = "Serve internet per il primo accesso."; return; }
  $("l-go").disabled = true; $("l-msg").textContent = "Accesso in corso…";
  const { data, error } = await sb.auth.signInWithPassword({ email: $("l-email").value.trim(), password: $("l-pass").value });
  $("l-go").disabled = false;
  if (error) { $("l-msg").textContent = "Email o password sbagliate. Riprova."; return; }
  uid = data.user.id; hideLogin(); resync();
});

async function initStore() {
  const c = lsGet("olimpo-cache", null);
  if (c) for (const k of Object.keys(state)) state[k] = c[k] || [];
  onData();
  if (dirty) flushSave();   // a restored draft may hold ticked sets that were never saved
  if (!sb) { syncLabel(); return; }
  // Offline at the gym the session can't be refreshed: fall back to the one saved on the phone,
  // so the login screen only ever appears on the very first launch.
  let session = null;
  try { session = (await sb.auth.getSession()).data.session; } catch (e) {}
  if (!session) { const saved = lsGet("olimpo-auth", null); if (saved && saved.user) session = saved; }
  if (session) { uid = session.user.id; resync(); } else showLogin();
  syncLabel();
  sb.auth.onAuthStateChange((ev, s) => {
    if (s) uid = s.user.id;
    else if (ev === "SIGNED_OUT") { uid = null; showLogin("La sessione è scaduta: rientra con email e password."); }
    syncLabel();
  });
  window.addEventListener("online", resync);
  window.addEventListener("offline", syncLabel);
  // Coming back to the app: changes are always sent, the download repeats at most every 5 minutes.
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { if (Date.now() - lastPull > 5 * 60e3) resync(); else flush(); } });
}
// A new version of the app was installed while it was open: offer to reload (the draft is kept on the phone).
if ("serviceWorker" in navigator) {
  let hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController) $("upd").hidden = false; hadController = true; });
}
$("upd").addEventListener("click", () => { flushPending(); location.reload(); });
$("sync").addEventListener("click", () => { if (sb && !uid) showLogin(); else { refused.clear(); resync(); } });

// Food and notes are not rebuilt while a text field in them is being typed in,
// and right after a text field is saved the rebuild waits a moment so the next tap isn't lost.
const typingIn = sel => { const a = document.activeElement; return !!(a && (a.tagName === "TEXTAREA" || (a.tagName === "INPUT" && a.type !== "date")) && a.closest(sel)); };
let deferDiary = false, diaryTimer = null;
function renderDiary() {
  if (!typingIn("#v-food")) safe(renderFood);
  if (!typingIn("#v-notes")) safe(renderNotes);
}
// Each screen is drawn on its own: data written in an unexpected shape (e.g. by an agent) breaks one card, not the app.
const safe = fn => { try { fn(); } catch (e) { console.warn("render", fn.name || "", e); } };
let workNames = "";
function onData() {
  const names = JSON.stringify(exLib().list);   // the names of your own exercises arrive with the data
  if (!dirty) safe(() => { draft = buildDraft(draft ? draft.date : today(), draft ? draft.plan : defaultPlan(today())); renderWork(); });
  else if ((draft.extra || []).length && names !== workNames && !(document.activeElement && document.activeElement.closest("#w-list"))) safe(renderWork);
  else safe(refreshHints);
  workNames = names;
  for (const f of [renderProg, renderBody, renderRun, fillProfile, renderToday]) safe(f);
  if (!$("v-arch").hidden) safe(renderArch);
  if (!$("v-coach").hidden) safe(renderCoach);
  clearTimeout(diaryTimer);
  if (deferDiary) { deferDiary = false; diaryTimer = setTimeout(renderDiary, 350); } else renderDiary();
}

// A new day while the app sat in the background: move every "today" screen to the new date.
let lastDay = today();
function rollDay() {
  const t = today(); if (t === lastDay) return;
  lastDay = t;
  if (draft && draft.date < t) switchTo(t, defaultPlan(t));
  for (const id of ["b-date", "r-date"]) if (!$(id).value || $(id).value < t) $(id).value = t;
  foodDate = t; notesDate = t; coachDate = t;
  onData();
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") rollDay();
  else flushPending();
});
window.addEventListener("pagehide", flushPending);
function flushPending() { if (saveTimer) flushSave(); if (pendingText) pendingText(); }

/* ---------- your own exercises and how each one is measured (coll "profile", id "exercises") ---------- */
// {list: [{id, n, mode}], modes: {exerciseId: "reps" | "time"}}. Kept for good, so an extra exercise is
// remembered for the next sessions. A set is {kg, reps} or, for timed exercises (plank…), {kg, sec}.
const TIME_LO = 30, TIME_HI = 60;
const exLib = () => { const l = state.profile.find(x => x.id === "exercises") || {}; return { list: l.list || [], modes: l.modes || {}, rests: l.rests || {} }; };
// Rest time chosen by the user for an exercise (seconds), remembered for every session; otherwise the plan's.
const restOf = ex => exLib().rests[ex.id] || ex.rest;
let restEdit = null;   // exercise whose rest editor is open
function saveLib(mutate) { const l = JSON.parse(JSON.stringify(exLib())); mutate(l); put("profile", "exercises", l); }
const customDef = c => ({ id: c.id, n: c.n, s: 3, lo: 8, hi: 12, inc: 2.5, rest: c.mode === "time" ? 60 : 90, start: 0, custom: true, cue: "Esercizio aggiunto da te, fuori scheda." });
const exDef = id => EX[id] || customDef(exLib().list.find(c => c.id === id) || { id, n: id });
// Plan exercises are always kg × reps (their history and progression depend on it); only your own can be timed.
const modeOf = id => EX[id] ? "reps" : exLib().modes[id] || (exLib().list.find(c => c.id === id) || {}).mode || "reps";
const isTime = id => modeOf(id) === "time";
// Seconds typed as "45" or "1:30".
const parseSec = v => { const s = String(v || "").trim().replace(",", "."), m = /^(\d+):(\d{1,2})$/.exec(s); return m ? +m[1] * 60 + +m[2] : Math.round(num(s)); };
const secStr = s => s >= 60 ? mmss(s) : String(s);
const fmtSet = (x, t) => t ? `${+x.kg ? fk(+x.kg) + " kg · " : ""}${secStr(x.sec)}″` : `${fk(+x.kg || 0)}×${x.reps}`;

/* ---------- logic ---------- */
const sorted = () => [...state.sessions].sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
function lastFor(exId, before) {
  const t = isTime(exId);
  for (const s of sorted()) {
    if (s.date >= before) continue;
    const sets = (s.sets && s.sets[exId] || []).filter(x => t ? x.sec > 0 : x.reps > 0);
    if (sets.length) return { date: s.date, sets };
  }
  return null;
}
function suggest(ex, date) {
  const last = lastFor(ex.id, date);
  if (!last) return { kg: ex.start, first: true };
  const kg = Math.max(...last.sets.map(x => +x.kg || 0));
  if (isTime(ex.id)) return { kg, up: last.sets.length >= ex.s && last.sets.every(x => x.sec >= TIME_HI), last, time: true };
  const hit = last.sets.length >= ex.s && last.sets.every(x => x.reps >= ex.hi);
  return { kg: hit ? r1(kg + ex.inc) : kg, up: hit, last };
}
// The exercises of the session on screen: the plan's (minus the ones taken out) plus the extra ones.
const sessionEx = () => [...curPlan().ex.filter(e => !(draft.skip || []).includes(e.id)), ...(draft.extra || []).map(exDef)];
const bodyweight = () => { const b = [...state.body].filter(x => x.weight).sort((a, b) => a.date < b.date ? 1 : -1)[0]; return b ? b.weight : 82; };
const load = (ex, kg) => ex && ex.bw ? bodyweight() + kg : kg;
const e1rm = (ex, kg, reps) => load(ex, kg) * (1 + reps / 30);
function defaultPlan(date) {
  const wd = new Date(date + "T12:00:00").getDay();
  if (wd === 4) return "A"; if (wd === 6) return "B";
  const l = sorted()[0]; return l && l.plan === "A" ? "B" : "A";
}
const newRows = (ex, date, n) => { const sg = suggest(ex, date); return Array.from({ length: n }, () => ({ kg: fk(sg.kg), reps: "", sec: "", done: false })); };
function buildDraft(date, plan) {
  const saved = state.sessions.find(s => s.id === date + "-" + plan);
  const extra = saved && saved.extra ? [...saved.extra] : [], skip = saved && saved.skip ? [...saved.skip] : [];
  const sets = {};
  for (const ex of [...planOf(plan, date).ex, ...extra.map(exDef)]) {
    if (saved && saved.sets && saved.sets[ex.id]) {
      sets[ex.id] = saved.sets[ex.id].map(x => ({ kg: fk(+x.kg || 0), reps: x.reps != null ? String(x.reps) : "", sec: x.sec ? secStr(x.sec) : "", done: true }));
      while (sets[ex.id].length < ex.s) sets[ex.id].push({ kg: sets[ex.id][0].kg, reps: "", sec: "", done: false });
    } else sets[ex.id] = newRows(ex, date, ex.s);
  }
  return { date, plan, sets, extra, skip };
}
const keepDraft = () => lsSet("olimpo-draft", draft);
function draftSets() {
  const out = {}; let n = 0;
  for (const ex of sessionEx()) {
    const t = isTime(ex.id), kg = x => isFinite(num(x.kg)) ? num(x.kg) : 0;
    const ok = draft.sets[ex.id].filter(x => x.done)
      .map(x => t ? { kg: kg(x), sec: parseSec(x.sec) } : { kg: kg(x), reps: Math.round(num(x.reps)) })
      .filter(x => t ? x.sec > 0 : x.reps > 0);
    if (ok.length) { out[ex.id] = ok; n += ok.length; }
  }
  return { out, n };
}

/* ---------- autosave ---------- */
function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(flushSave, 1200); }
// put/del write to the phone's copy synchronously, so this captures the current draft immediately.
function flushSave() {
  clearTimeout(saveTimer); saveTimer = null;
  const { out, n } = draftSets();
  const id = draft.date + "-" + draft.plan;
  if (!n && !state.sessions.some(s => s.id === id)) return;
  if (!n) del("sessions", id);
  else put("sessions", id, { date: draft.date, plan: draft.plan, block: blockOf(draft.date).n, sets: out,
    ...((draft.extra || []).length ? { extra: draft.extra } : {}), ...((draft.skip || []).length ? { skip: draft.skip } : {}), savedAt: new Date().toISOString() });
  msg(n ? `Salvato · ${n} serie` : "Seduta svuotata", "ok");
}
function msg(t, cls) { $("w-msg").textContent = t; $("w-msg").className = "savemsg" + (cls ? " " + cls : ""); }

/* ---------- workout view ---------- */
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
function hintHtml(ex) {
  const sg = suggest(ex, draft.date), t = isTime(ex.id);
  if (sg.first) return `<span class="chip start">${t ? `Obiettivo: ${TIME_LO}–${TIME_HI}″ a serie` : ex.custom && !ex.start ? "Prima volta: scegli tu il carico" : `Partenza consigliata: ${ex.bw && !sg.kg ? "corpo libero" : fk(sg.kg) + " kg"}`}</span>`;
  const last = sg.last.sets.map(x => fmtSet(x, t)).join(" · ");
  if (t) return `<span class="chip">${ddmm(sg.last.date)}: ${last}</span>` + (sg.up ? `<span class="chip up">↑ Oltre ${TIME_HI}″: aggiungi peso o difficoltà</span>` : `<span class="chip">Punta a +5″ a serie</span>`);
  return `<span class="chip">${ddmm(sg.last.date)}: ${last}</span>` + (sg.up ? `<span class="chip up">↑ Sali a ${fk(sg.kg)} kg</span>` : `<span class="chip">Resta a ${fk(sg.kg)} kg, +1 rip.</span>`);
}
function exCard(ex) {
  const rows = draft.sets[ex.id], t = isTime(ex.id), extra = (draft.extra || []).includes(ex.id);
  const done = rows.filter(x => x.done).length, sw = stopwatch && stopwatch.ex === ex.id;
  return `<article class="ex${done >= ex.s ? " complete" : ""}" id="ex-${ex.id}">
    <div class="ex-top"><div><h3>${esc(ex.n)}${extra ? ' <span class="new">extra</span>' : ""}</h3><div class="target">${ex.s} × ${t ? `${TIME_LO}–${TIME_HI}″` : `${ex.lo}–${ex.hi}`} · <button class="rest-btn" data-rest="${ex.id}" aria-expanded="${restEdit === ex.id}">⏱ recupero ${mmss(restOf(ex))}${exLib().rests[ex.id] ? " (tuo)" : ""}</button></div></div><span class="cnt">${done}/${rows.length}</span></div>
    ${restEdit === ex.id ? `<div class="rest-edit"><button data-restd="${ex.id}" data-v="-15" aria-label="15 secondi in meno">− 15″</button><b>${mmss(restOf(ex))}</b><button data-restd="${ex.id}" data-v="15" aria-label="15 secondi in più">+ 15″</button>${exLib().rests[ex.id] ? `<button class="lnk" data-restd="${ex.id}" data-v="reset">Scheda: ${mmss(ex.rest)}</button>` : ""}</div>` : ""}
    <div class="chips" id="h-${ex.id}">${hintHtml(ex)}</div>
    ${ex.cue ? `<details class="how"><summary>Come si fa</summary><p>${esc(ex.cue)}${ex.alt ? "<br>" + esc(ex.alt) : ""}</p></details>` : ""}
    <div class="sets">
      <div class="sethead"><span>#</span><span>kg</span><span>${t ? "secondi" : "rip."}</span><span></span></div>
      ${rows.map((x, i) => `<div class="set${x.done ? " done" : ""}">
        <span class="n">${i + 1}</span>
        <div class="step"><button data-step="-" data-ex="${ex.id}" data-i="${i}" aria-label="meno ${ex.inc} kg">−</button><input id="kg-${ex.id}-${i}" data-ex="${ex.id}" data-i="${i}" data-f="kg" inputmode="decimal" value="${esc(x.kg)}" aria-label="kg serie ${i + 1}"><button data-step="+" data-ex="${ex.id}" data-i="${i}" aria-label="più ${ex.inc} kg">+</button></div>
        <div class="reps">${t
          ? `<input id="sc-${ex.id}-${i}" data-ex="${ex.id}" data-i="${i}" data-f="sec" inputmode="numeric" value="${esc(x.sec || "")}" placeholder="${TIME_LO}–${TIME_HI}" aria-label="secondi serie ${i + 1}">`
          : `<input id="rp-${ex.id}-${i}" data-ex="${ex.id}" data-i="${i}" data-f="reps" inputmode="numeric" value="${esc(x.reps)}" placeholder="${ex.lo}–${ex.hi}" aria-label="ripetizioni serie ${i + 1}">`}</div>
        <button class="chk" data-chk="${ex.id}" data-i="${i}" aria-label="Serie ${i + 1} fatta" aria-pressed="${x.done}">${CHECK}</button>
      </div>`).join("")}
    </div>
    ${t ? `<button class="btn ghost sw${sw ? " on" : ""}" data-sw="${ex.id}">${sw ? `■ Ferma · <span id="sw-t">${mmss(Math.floor((Date.now() - stopwatch.start) / 1000))}</span>` : `⏱ Cronometra la serie ${Math.min(rows.length, rows.filter(x => x.done).length + 1)}`}</button>` : ""}
    <div class="ex-actions"><button class="lnk" data-add="${ex.id}">+ Serie</button>${rows.length > 1 ? `<button class="lnk danger" data-rm="${ex.id}">− Serie</button>` : ""}${ex.custom ? `<button class="lnk" data-mode="${ex.id}">${t ? "Passa a kg × rip." : "Passa a tempo"}</button>` : ""}<button class="lnk danger" data-drop="${ex.id}">Togli</button></div>
  </article>`;
}
// Stopwatch for timed sets: it fills the seconds of the first set not done yet and ticks it.
let stopwatch = null, swInt = null;
function stopStopwatch(save) {
  clearInterval(swInt);
  const s = stopwatch; stopwatch = null; if (!s) return;
  const ex = curEx(s.ex), rows = draft.sets[s.ex];
  const sec = Math.round((Date.now() - s.start) / 1000);
  // all sets already ticked: the timed one becomes an extra set instead of being thrown away
  if (save && sec > 0 && rows.every(x => x.done)) rows.push({ kg: rows.length ? rows[rows.length - 1].kg : "0", reps: "", sec: "", done: false });
  const i = rows.findIndex(x => !x.done);
  if (save && sec > 0 && i >= 0) {
    rows[i].sec = secStr(sec); rows[i].done = true;
    dirty = true; keepDraft(); scheduleSave();
    startTimer(restOf(ex), rows.every(x => x.done) ? "Prossimo esercizio" : "Recupero · " + ex.n.split(" ")[0]);
  }
  rerenderCard(s.ex);
}
function renderHeader() {
  $("h-eyebrow").textContent = draft.date === today() ? "Oggi · " + longDate(draft.date) : longDate(draft.date);
}
function renderProgress() {
  const all = sessionEx().reduce((a, ex) => a + draft.sets[ex.id].length, 0);
  const { out, n } = draftSets();
  let vol = 0; for (const k in out) for (const x of out[k]) vol += load(EX[k], x.kg) * (x.reps || 0);
  const pct = all ? Math.min(1, n / all) : 0;
  $("w-bar").style.strokeDashoffset = String(175.9 * (1 - pct));
  $("w-pct").textContent = Math.round(pct * 100) + "%";
  $("w-done").textContent = `${n} di ${all} serie`;
  $("w-vol").textContent = vol ? Math.round(vol).toLocaleString("it-IT") + " kg di volume" : "";
}
function renderWork() {
  const p = curPlan();
  $("w-a").setAttribute("aria-pressed", draft.plan === "A");
  $("w-b").setAttribute("aria-pressed", draft.plan === "B");
  $("w-date").value = draft.date;
  $("w-datelbl").textContent = draft.date === today() ? "Oggi" : longDate(draft.date);
  const list = sessionEx();
  $("w-dur").textContent = `${list.length} esercizi · ${p.dur}`;
  const bk = blockOf(draft.date);
  $("w-note").textContent = `Blocco ${bk.n} · ${bk.name}. ${p.note}`;
  $("w-list").innerHTML = list.map(exCard).join("");
  renderAddCard(); renderHeader(); renderProgress();
}
function rerenderCard(exId) { const el = $("ex-" + exId), d = el && el.querySelector("details"), open = d && d.open; if (el) { el.outerHTML = exCard(curEx(exId)); const nd = $("ex-" + exId).querySelector("details"); if (open && nd) nd.open = true; } renderProgress(); }
function refreshHints() { if (!draft) return; for (const ex of sessionEx()) { const h = $("h-" + ex.id); if (h) h.innerHTML = hintHtml(ex); } }

$("w-list").addEventListener("input", e => {
  const t = e.target; if (!t.dataset.f) return;
  const row = draft.sets[t.dataset.ex][+t.dataset.i];
  row[t.dataset.f] = t.value; dirty = true; keepDraft();
  if (row.done) { renderProgress(); scheduleSave(); }
});
$("w-list").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.sw) {
    if (stopwatch && stopwatch.ex === b.dataset.sw) return stopStopwatch(true);
    if (stopwatch) stopStopwatch(false);
    stopTimer(); stopwatch = { ex: b.dataset.sw, start: Date.now() };
    swInt = setInterval(() => { const el = $("sw-t"); if (el && stopwatch) el.textContent = mmss(Math.floor((Date.now() - stopwatch.start) / 1000)); }, 250);
    return rerenderCard(b.dataset.sw);
  }
  // Rest time: open/close the editor, then ±15″ (30″ to 6′), or back to the plan's value. Saved for every session.
  if (b.dataset.rest) { restEdit = restEdit === b.dataset.rest ? null : b.dataset.rest; return rerenderCard(b.dataset.rest); }
  if (b.dataset.restd) {
    const id = b.dataset.restd, ex = curEx(id), v = b.dataset.v;
    const next = v === "reset" ? null : Math.min(360, Math.max(30, restOf(ex) + +v));
    saveLib(l => { if (next === null || next === ex.rest) delete l.rests[id]; else l.rests[id] = next; });
    return rerenderCard(id);
  }
  // Changing the measure or taking an exercise out would drop sets already ticked: ask first.
  const ticked = id => (draft.sets[id] || []).some(x => x.done);
  if (b.dataset.mode) {
    const id = b.dataset.mode, next = isTime(id) ? "reps" : "time";
    const go = () => {
      if (stopwatch && stopwatch.ex === id) stopStopwatch(false);
      saveLib(l => { l.modes[id] = next; const c = l.list.find(x => x.id === id); if (c) c.mode = next; });
      dirty = true; keepDraft(); rerenderCard(id); scheduleSave();
    };
    return ticked(id) ? armDelete(b, go) : go();
  }
  if (b.dataset.drop) {
    const id = b.dataset.drop;
    const go = () => {
      if (stopwatch && stopwatch.ex === id) stopStopwatch(false);
      if ((draft.extra || []).includes(id)) { draft.extra = draft.extra.filter(x => x !== id); delete draft.sets[id]; }
      else draft.skip = [...(draft.skip || []), id];
      dirty = true; keepDraft(); renderWork(); scheduleSave();
    };
    return ticked(id) ? armDelete(b, go) : go();
  }
  const exId = b.dataset.ex || b.dataset.chk || b.dataset.add || b.dataset.rm; if (!exId) return;
  const ex = curEx(exId), rows = draft.sets[exId];
  if (b.dataset.step) {
    const row = rows[+b.dataset.i]; let v = num(row.kg); if (!isFinite(v)) v = 0;
    v = r1(v + (b.dataset.step === "+" ? ex.inc : -ex.inc)); if (!ex.bw && v < 0) v = 0;
    row.kg = fk(v);
    for (let j = +b.dataset.i + 1; j < rows.length; j++) if (!rows[j].done) rows[j].kg = row.kg;
    dirty = true; keepDraft(); rerenderCard(exId); if (row.done) scheduleSave(); return;
  }
  if (b.dataset.chk) {
    const i = +b.dataset.i, row = rows[i];
    row.done = !row.done;
    if (row.done && isTime(exId) && !(parseSec(row.sec) > 0)) { const sg = suggest(ex, draft.date); const prev = sg.last && sg.last.sets[i]; row.sec = secStr(prev ? prev.sec : TIME_LO); }
    else if (row.done && !isTime(exId) && !(num(row.reps) > 0)) { const sg = suggest(ex, draft.date); const prev = sg.last && sg.last.sets[i]; row.reps = String(prev ? prev.reps : ex.lo); }
    dirty = true; keepDraft(); rerenderCard(exId); scheduleSave();
    if (row.done) startTimer(restOf(ex), rows.every(x => x.done) ? "Prossimo esercizio" : "Recupero · " + ex.n.split(" ")[0]);
    return;
  }
  if (b.dataset.add) rows.push({ kg: rows.length ? rows[rows.length - 1].kg : fk(ex.start), reps: "", sec: "", done: false });
  if (b.dataset.rm && rows.length > 1) rows.pop();
  dirty = true; keepDraft(); rerenderCard(exId); scheduleSave();
});
// Add an exercise to this session: one you used before (chips) or a new one (name + measure).
const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);
function addToSession(id) {
  if (sessionEx().some(e => e.id === id)) { msg("Questo esercizio è già nella seduta.", "err"); return; }
  if ((draft.skip || []).includes(id)) draft.skip = draft.skip.filter(x => x !== id);
  else { draft.extra = [...(draft.extra || []), id]; if (!draft.sets[id]) draft.sets[id] = newRows(exDef(id), draft.date, 3); }
  dirty = true; keepDraft(); renderWork(); scheduleSave();
  const el = $("ex-" + id); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
}
function renderAddCard() {
  const inSession = new Set(sessionEx().map(e => e.id));
  const mine = exLib().list.filter(c => !inSession.has(c.id));
  const skipped = (draft.skip || []).map(exDef);
  $("w-lib").innerHTML = [...skipped.map(e => `<button class="chip" data-addex="${e.id}">↺ ${esc(e.n)}</button>`),
    ...mine.map(c => `<button class="chip" data-addex="${c.id}">+ ${esc(c.n)}${c.mode === "time" ? " ⏱" : ""}</button>`)].join("");
  $("w-lib").hidden = !(mine.length || skipped.length);
}
$("w-lib").addEventListener("click", e => { const b = e.target.closest("button[data-addex]"); if (b) addToSession(b.dataset.addex); });
$("w-new-add").addEventListener("click", () => {
  const name = $("w-new-n").value.trim(), mode = $("w-new-m").value;
  if (!name) { $("w-new-n").focus(); return; }
  const fromPlan = Object.values(EX).find(e => e.n.toLowerCase() === name.toLowerCase());
  let id = fromPlan ? fromPlan.id : null;
  if (!id) {
    const known = exLib().list.find(c => c.n.toLowerCase() === name.toLowerCase());
    id = known ? known.id : "c_" + (slug(name) || Date.now().toString(36));
    saveLib(l => { if (!l.list.some(c => c.id === id)) l.list.push({ id, n: name, mode }); l.modes[id] = mode; });
  }   // an exercise of the plan keeps kg × reps whatever is chosen here
  $("w-new-n").value = "";
  addToSession(id);
});
function switchTo(date, plan) { restEdit = null; if (stopwatch) stopStopwatch(false); if (saveTimer) flushSave(); draft = buildDraft(date, plan); dirty = false; keepDraft(); renderWork(); msg(state.sessions.some(s => s.id === date + "-" + plan) ? "Seduta già salvata: puoi correggerla." : "Tocca ✓ alla fine di ogni serie: salvo tutto da solo."); }
$("w-a").addEventListener("click", () => switchTo(draft.date, "A"));
$("w-b").addEventListener("click", () => switchTo(draft.date, "B"));
$("w-date").addEventListener("change", e => { if (e.target.value) switchTo(e.target.value, defaultPlan(e.target.value)); });

/* ---------- rest timer ---------- */
let tEnd = 0, tInt = null, wake = null;
function startTimer(sec, what) {
  tEnd = Date.now() + sec * 1000; $("t-what").textContent = what; $("timer").hidden = false; $("timer").classList.remove("go"); $("t-say").textContent = ""; calmCheck();
  clearInterval(tInt); tInt = setInterval(tick, 250); tick();
  try { if (navigator.wakeLock && !wake) navigator.wakeLock.request("screen").then(w => { wake = w; w.addEventListener("release", () => wake = null); }).catch(() => {}); } catch (e) {}
}
function tick() {
  const left = Math.max(0, Math.ceil((tEnd - Date.now()) / 1000));
  $("t-left").textContent = left ? mmss(left) : "Vai!";
  // VoiceOver hears the start and "Vai!", not every second
  const say = left ? `Recupero di ${mmss(left)}` : "Vai!";
  if (!left ? $("t-say").textContent !== "Vai!" : !$("t-say").textContent) $("t-say").textContent = say;
  if (!left) { $("timer").classList.add("go"); if (Date.now() - tEnd > 15000) stopTimer(); }
}
function stopTimer() {
  clearInterval(tInt); $("timer").hidden = true; $("t-say").textContent = ""; calmCheck();
  if (wake) { wake.release().catch(() => {}); wake = null; }
}
$("t-stop").addEventListener("click", stopTimer);
// Battery: the background aurora stops during the rest timer and after 20 s without touching the screen.
let idleT = null;
function calmCheck() {
  clearTimeout(idleT);
  document.body.classList.toggle("calm", !$("timer").hidden);
  idleT = setTimeout(() => document.body.classList.add("calm"), 20000);
}
for (const ev of ["pointerdown", "keydown", "scroll"]) window.addEventListener(ev, calmCheck, { passive: true });
calmCheck();
$("t-add").addEventListener("click", () => { tEnd = Math.max(tEnd, Date.now()) + 30000; $("timer").classList.remove("go"); tick(); });

/* ---------- charts ---------- */
function niceStep(raw) { const p = Math.pow(10, Math.floor(Math.log10(raw))); const f = raw / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; }
function chart(el, pts, opt) {
  el.innerHTML = "";
  if (!pts.length) { el.innerHTML = `<p class="empty">${opt.empty}</p>`; return; }
  const W = Math.max(260, el.clientWidth || 340), H = 200, m = { l: 36, r: 44, t: 14, b: 24 };
  const ys = pts.map(p => p.y).concat(opt.ref ? [opt.ref.y] : []);
  let lo = Math.min(...ys), hi = Math.max(...ys);
  if (opt.bar) lo = 0; if (lo === hi) { lo -= 1; hi += 1; }
  const step = niceStep((hi - lo) / 4);
  lo = opt.bar ? 0 : Math.floor((lo - step * .3) / step) * step; hi = Math.ceil((hi + step * .15) / step) * step;
  const iw = W - m.l - m.r, ih = H - m.t - m.b, Y = v => m.t + ih - (v - lo) / (hi - lo) * ih;
  let X;
  if (opt.bar) { const bw = iw / pts.length; X = i => m.l + bw * (i + .5); }
  else { const x0 = pts[0].x, x1 = pts[pts.length - 1].x; X = i => pts.length === 1 ? m.l + iw / 2 : m.l + (pts[i].x - x0) / (x1 - x0) * iw; }
  let g = "";
  for (let v = lo; v <= hi + 1e-9; v += step) g += `<line class="grid" x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/><text class="axis" x="${m.l - 6}" y="${Y(v) + 4}" text-anchor="end">${opt.fmt(v)}</text>`;
  const idx = [...new Set(pts.length <= 2 ? pts.map((_, i) => i) : [0, Math.floor((pts.length - 1) / 2), pts.length - 1])];
  idx.forEach(i => g += `<text class="axis" x="${X(i)}" y="${H - 5}" text-anchor="middle">${ddmm(pts[i].d)}</text>`);
  if (opt.ref) g += `<line class="ref" x1="${m.l}" x2="${W - m.r}" y1="${Y(opt.ref.y)}" y2="${Y(opt.ref.y)}"/><text class="reft" x="${m.l + 4}" y="${Y(opt.ref.y) - 5}">${esc(opt.ref.label)}</text>`;
  let mk = "";
  if (opt.bar) {
    const bw = Math.min(24, iw / pts.length * .6);
    pts.forEach((p, i) => { const x = X(i) - bw / 2, y = Y(p.y), h = Y(0) - y, r = Math.min(4, h, bw / 2);
      mk += `<path class="bar" d="M${x},${Y(0)}V${y + r}Q${x},${y} ${x + r},${y}H${x + bw - r}Q${x + bw},${y} ${x + bw},${y + r}V${Y(0)}Z"/>`; });
  } else {
    const d = pts.map((p, i) => (i ? "L" : "M") + X(i) + "," + Y(p.y)).join("");
    if (pts.length > 1) mk += `<path class="ar" d="${d}L${X(pts.length - 1)},${Y(lo)}L${X(0)},${Y(lo)}Z"/><path class="ln" d="${d}"/>`;
    pts.forEach((p, i) => mk += `<circle class="pt" cx="${X(i)}" cy="${Y(p.y)}" r="${i === pts.length - 1 ? 5.5 : 4}"/>`);
    const lp = pts[pts.length - 1]; mk += `<text class="end" x="${X(pts.length - 1) + 9}" y="${Y(lp.y) + 4}">${opt.fmt(lp.y)}</text>`;
  }
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opt.label)}">${g}${mk}<line class="guide" y1="${m.t}" y2="${m.t + ih}" visibility="hidden"/><rect x="${m.l}" y="0" width="${iw}" height="${H}" fill="transparent"/></svg><div class="tip" hidden></div>`;
  const svg = el.querySelector("svg"), tip = el.querySelector(".tip"), gd = svg.querySelector(".guide");
  const move = ev => {
    const rc = svg.getBoundingClientRect(), sx = (ev.clientX - rc.left) * (W / rc.width);
    let b = 0; pts.forEach((_, i) => { if (Math.abs(X(i) - sx) < Math.abs(X(b) - sx)) b = i; });
    const p = pts[b]; gd.setAttribute("x1", X(b)); gd.setAttribute("x2", X(b)); gd.setAttribute("visibility", "visible");
    tip.hidden = false; tip.innerHTML = `${ddmm(p.d)} · <b>${opt.fmt(p.y)} ${opt.unit}</b>${p.tip ? "<br>" + esc(p.tip) : ""}`;
    tip.style.left = Math.min(Math.max(X(b) * rc.width / W, 70), rc.width - 70) + "px"; tip.style.top = Y(p.y) * rc.height / H + "px";
  };
  svg.addEventListener("pointermove", move); svg.addEventListener("pointerdown", move);
  svg.addEventListener("pointerleave", () => { tip.hidden = true; gd.setAttribute("visibility", "hidden"); });
}

/* ---------- calendar of gym days (Thu = A, Sat = B, 17 Oct – 6 Mar, no gym on the 17 Dec match) ---------- */
const isGymDay = d => { const wd = new Date(d + "T12:00:00").getDay(); return (wd === 4 || wd === 6) && d >= "2026-10-17" && d <= "2027-03-06" && d !== "2026-12-17"; };
function gymDaysBetween(from, to) { let n = 0; for (let d = from; d <= to; d = shiftDate(d, 1)) if (isGymDay(d)) n++; return n; }

/* ---------- progress view ---------- */
const volumeOf = s => { let v = 0; for (const k in s.sets) for (const x of s.sets[k]) v += load(EX[k], +x.kg || 0) * (x.reps || 0); return v; };
function bestOf(ex, sets) { let b = sets[0]; for (const x of sets) if (e1rm(ex, +x.kg || 0, x.reps) > e1rm(ex, +b.kg || 0, b.reps)) b = x; return b; }
function renderProg() {
  const ss = sorted(), asc = [...ss].reverse();
  const cutoff = new Date(Date.now() - 28 * 864e5).toISOString().slice(0, 10);
  const expected = gymDaysBetween(shiftDate(today(), -27), today());
  const pancaSets = s => (s.sets.panca || []).filter(x => x.reps > 0);
  const pb = asc.filter(s => pancaSets(s).length).map(s => { const b = bestOf(EX.panca, pancaSets(s)); return r1(e1rm(EX.panca, +b.kg || 0, b.reps)); });
  const benchNow = pb.length ? pb[pb.length - 1] : BENCH_1RM;
  $("g-tiles").innerHTML = [
    ["Sedute", ss.length, "in totale"],
    ["4 settimane", ss.filter(s => s.date >= cutoff).length + (expected ? "/" + expected : ""), expected ? `su ${expected} previste` : "nessuna prevista"],
    ["Panca 1RM", fk(benchNow), pb.length ? (benchNow - BENCH_1RM >= 0 ? "+" : "") + fk(r1(benchNow - BENCH_1RM)) + " da 80" : "kg, di partenza"]
  ].map(([k, v, d]) => `<div class="tile"><div class="k">${k}</div><div class="v">${v}</div><div class="d">${d}</div></div>`).join("");

  const sel = $("g-ex"), lib = exLib().list;
  if (sel.options.length !== Object.keys(EX).length + lib.length) {
    const seen = new Set(), keep = sel.value || lsGet("olimpo-ex", "panca");
    sel.innerHTML = BLOCKS.slice(0, 2).map(b => `<optgroup label="Blocco ${b.n} · ${b.name}">${[...b.A.ex, ...b.B.ex].filter(e => !seen.has(e.id) && seen.add(e.id)).map(e => `<option value="${e.id}">${esc(e.n)}</option>`).join("")}</optgroup>`).join("")
      + (lib.length ? `<optgroup label="I tuoi esercizi">${lib.map(c => `<option value="${c.id}">${esc(c.n)}</option>`).join("")}</optgroup>` : "");
    sel.value = keep; if (!sel.value) sel.value = "panca";
  }
  const ex = exDef(sel.value), t = isTime(ex.id), pts = [];
  for (const s of asc) {
    const sets = (s.sets[ex.id] || []).filter(x => t ? x.sec > 0 : x.reps > 0); if (!sets.length) continue;
    if (t) { const b = Math.max(...sets.map(x => x.sec)); pts.push({ d: s.date, x: ts(s.date), y: b, tip: `serie migliore ${secStr(b)}″`, sets }); continue; }
    const b = bestOf(ex, sets);
    pts.push({ d: s.date, x: ts(s.date), y: r1(e1rm(ex, +b.kg || 0, b.reps)), tip: `migliore ${fk(+b.kg || 0)} kg × ${b.reps}`, sets });
  }
  $("g-ex-note").textContent = t ? "Esercizio a tempo: la serie più lunga di ogni seduta, in secondi." : ex.bw ? "Massimale stimato con il tuo peso corporeo incluso (l'ultimo segnato in Corpo)." : "Massimale stimato dalla serie migliore di ogni seduta. Se la linea sale, sei più forte.";
  chart($("g-chart"), pts, { unit: t ? "s" : "kg", fmt: v => t ? secStr(Math.round(v)) : fk(r1(v)), label: (t ? "Serie più lunga " : "Massimale stimato ") + ex.n, ref: ex.id === "panca" && !t ? { y: BENCH_1RM, label: "massimale di partenza 80" } : null,
    empty: `Ancora nessuna serie di ${esc(ex.n.toLowerCase())}. Dopo la prima seduta qui compare la tua curva.` });
  $("g-table").innerHTML = [...pts].reverse().slice(0, 6).map(p => `<div class="li"><div class="t"><b>${ddmm(p.d)}</b><span>${p.sets.map(x => fmtSet(x, t)).join(" · ")}</span></div><b>${t ? secStr(p.y) + "″" : fk(p.y)}</b></div>`).join("");

  chart($("g-vol"), asc.slice(-14).map(s => ({ d: s.date, x: ts(s.date), y: Math.round(volumeOf(s)), tip: "Scheda " + s.plan })),
    { bar: true, unit: "kg", fmt: v => v >= 1000 ? fk(r1(v / 1000)) + "k" : String(Math.round(v)), label: "Volume per seduta", empty: "Compare dopo la prima seduta." });

  $("g-hist").innerHTML = ss.length ? ss.map(s => {
    const n = Object.values(s.sets).reduce((a, b) => a + b.length, 0);
    return `<div class="li"><div class="t"><b>${longDate(s.date)}</b><span>Scheda ${s.plan} · ${n} serie · ${Math.round(volumeOf(s)).toLocaleString("it-IT")} kg</span></div><div class="acts"><button class="lnk" data-open="${s.id}">Apri</button><button class="lnk danger" data-del="${s.id}">Elimina</button></div></div>`;
  }).join("") : `<p class="empty">Nessuna seduta ancora. La prima è sabato alle 17:30, Scheda B.</p>`;
  renderSport();
}
$("g-ex").addEventListener("change", e => { lsSet("olimpo-ex", e.target.value); renderProg(); });

/* ---------- basket and calcetto statistics (from the checklist entries in Note) ---------- */
let sport = lsGet("olimpo-sport", "partita");
function sportEntries(kind) {
  const out = [];
  for (const d of state.intake) for (const a of Object.values(d.activities || {}))
    if (a && a.name && (a.kind || actKind(a.name)) === kind && a.status && a.status !== "no") out.push({ date: d.id, ...a });
  return out.sort((a, b) => a.date < b.date ? -1 : 1);
}
const avg = (xs, k) => { const v = xs.filter(x => x[k] != null); return v.length ? v.reduce((s, x) => s + x[k], 0) / v.length : null; };
function renderSport() {
  for (const b of $("s-sport").querySelectorAll("button")) b.setAttribute("aria-pressed", b.dataset.sport === sport);
  const g = sportEntries(sport), bk = sport === "partita", f1 = v => v == null ? "—" : fk(r1(v));
  const tot = k => g.reduce((s, x) => s + (x[k] || 0), 0);
  $("s-tiles").innerHTML = (bk
    ? [["Partite", g.length, "segnate"], ["Punti", f1(avg(g, "pts")), "media"], ["Minuti", f1(avg(g, "min")), "media"], ["Record", g.length ? Math.max(0, ...g.map(x => x.pts || 0)) : "—", "punti"]]
    : [["Partite", g.length, "segnate"], ["Gol", tot("gol"), "in totale"], ["Assist", tot("ast"), "in totale"], ["G + A", g.length ? f1((tot("gol") + tot("ast")) / g.length) : "—", "a partita"]]
  ).map(([k, v, d]) => `<div class="tile"><div class="k">${k}</div><div class="v">${v}</div><div class="d">${d}</div></div>`).join("");
  const desc = x => bk ? `${x.pts ?? "—"} punti · ${x.min ?? "—"}'` : `${x.gol ?? 0} gol · ${x.ast ?? 0} assist${x.min != null ? ` · ${x.min}'` : ""}`;
  chart($("s-chart"), g.slice(-15).map(x => ({ d: x.date, x: ts(x.date), y: bk ? (x.pts || 0) : (x.gol || 0) + (x.ast || 0), tip: desc(x) })),
    { bar: true, unit: bk ? "punti" : "G+A", fmt: v => String(Math.round(v)), label: bk ? "Punti per partita" : "Gol + assist per partita",
      empty: bk ? "Dopo una partita, segna minuti e punti in Note: qui compare il grafico." : "Dopo una partita di calcetto, segna gol, assist e minuti in Note: qui compare il grafico." });
  $("s-list").innerHTML = [...g].reverse().slice(0, 6).map(x => `<div class="li"><div class="t"><b>${longDate(x.date)}</b><span>${esc(desc(x))}${x.note ? ` · ${esc(cut(x.note, 70))}` : ""}</span></div><div class="acts"><button class="lnk" data-sday="${x.date}">Modifica</button></div></div>`).join("");
  const tr = sportEntries("basket").filter(x => x.date >= shiftDate(today(), -27)), n = k => tr.filter(x => x.intensita === k).length;
  const pl = (v, one, many) => `${v} ${v === 1 ? one : many}`, none = tr.length - n("semplice") - n("normale") - n("duro");
  $("s-train").textContent = bk && tr.length ? `Allenamenti di basket nelle ultime 4 settimane: ${tr.length} (${[pl(n("semplice"), "semplice", "semplici"), pl(n("normale"), "normale", "normali"), pl(n("duro"), "duro", "duri"), none ? pl(none, "senza valutazione", "senza valutazione") : ""].filter(Boolean).join(", ")}).` : "";
}
$("s-sport").addEventListener("click", e => { const b = e.target.closest("button[data-sport]"); if (b) { sport = b.dataset.sport; lsSet("olimpo-sport", sport); renderSport(); } });
$("s-list").addEventListener("click", e => { const b = e.target.closest("button[data-sday]"); if (b) { showTab("notes"); notesDate = b.dataset.sday; renderNotes(); } });
// First tap arms the button ("Sicuro?"), a second tap within 4 s runs the action.
function armDelete(btn, run) {
  if (btn.dataset.armed) { btn.disabled = true; Promise.resolve().then(run).catch(() => { btn.disabled = false; btn.textContent = "Riprova"; }); return; }
  const label = btn.textContent;
  btn.dataset.armed = "1"; btn.textContent = "Sicuro?";
  setTimeout(() => { if (btn.isConnected) { delete btn.dataset.armed; btn.textContent = label; } }, 4000);
}
// Deleting the session open in Palestra also resets its draft, or the draft would save it again.
function delSession(id) {
  del("sessions", id);
  if (draft && draft.date + "-" + draft.plan === id) { draft = buildDraft(draft.date, draft.plan); dirty = false; keepDraft(); renderWork(); }
}
$("g-hist").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.open) { const s = state.sessions.find(x => x.id === b.dataset.open); if (s) { switchTo(s.date, s.plan); showTab("work"); } }
  if (b.dataset.del) armDelete(b, () => delSession(b.dataset.del));
});

/* ---------- body view ---------- */
// Official U.S. Navy / DoD circumference equation for men (Hodgdon & Beckett 1984, Naval Health Research Center
// report 84-11), in the inch form used by the military regulations: cm are converted to inches.
const navy = x => x.waist && x.neck && x.waist > x.neck ? r1(86.010 * Math.log10((x.waist - x.neck) / 2.54) - 70.041 * Math.log10(HEIGHT / 2.54) + 36.76) : null;
// Body fat: the bioimpedance (InBody) value when there is one, otherwise the Navy tape formula.
const bfOf = x => x.bia && x.bia.pbf ? x.bia.pbf : navy(x);
const BIA_F = { pbf: "b-pbf", smm: "b-smm", leg_l: "b-legl", leg_r: "b-legr", arm_l: "b-arml", arm_r: "b-armr", trunk: "b-trunk", visceral: "b-visc" };
function renderBia(asc) {
  const list = asc.filter(x => x.bia), last = list[list.length - 1], first = list[0];
  $("b-bia").hidden = !last; if (!last) return;
  const b = last.bia, f = first.bia, legs = (b.leg_l || 0) + (b.leg_r || 0), arms = (b.arm_l || 0) + (b.arm_r || 0);
  const row = (l, k, u) => b[k] == null ? "" : `<div class="li"><div class="t"><b>${l}</b><span>${first !== last && f[k] != null ? `${b[k] - f[k] > 0 ? "+" : ""}${fk(r1(b[k] - f[k]))} ${u} dal ${ddmm(first.date)}` : `misura del ${ddmm(last.date)}`}</span></div><b>${fk(b[k])} ${u}</b></div>`;
  $("b-bia").innerHTML = `<h3>Bioimpedenza · ${longDate(last.date)}</h3>
    <div class="small muted">Le gambe sono la parte da far crescere (al 19/10: 104–105% del riferimento InBody, contro il 120% delle braccia). Obiettivo: che i kg delle gambe salgano da una bioimpedenza all'altra${legs ? `; oggi ${fk(r1(legs / 2))} kg in media per gamba` : ""}.</div>
    <div class="list">${row("Grasso corporeo", "pbf", "%")}${row("Muscolo scheletrico", "smm", "kg")}${row("Gamba sinistra", "leg_l", "kg")}${row("Gamba destra", "leg_r", "kg")}${row("Braccio sinistro", "arm_l", "kg")}${row("Braccio destro", "arm_r", "kg")}${row("Tronco", "trunk", "kg")}${row("Grasso viscerale", "visceral", "")}</div>`;
}
function renderBody() {
  const asc = [...state.body].sort((a, b) => a.date < b.date ? -1 : 1);
  const w = asc.filter(x => x.weight), v = asc.filter(x => x.waist);
  const lw = w[w.length - 1], fw = w[0], lv = v[v.length - 1], fv = v[0];
  const delta = (a, b, u) => ((a - b) > 0 ? "+" : "") + fk(r1(a - b)) + " " + u + " dall'inizio";
  const bfList = asc.filter(x => bfOf(x) !== null);
  const lb = bfList[bfList.length - 1];
  const fat = lb && lw ? r1(lw.weight * bfOf(lb) / 100) : null;
  $("b-tiles").innerHTML = [
    ["Peso", lw ? fk(lw.weight) : "—", lw && fw && lw !== fw ? delta(lw.weight, fw.weight, "kg") : "kg"],
    ["Vita", lv ? fk(lv.waist) : "—", lv && fv && lv !== fv ? delta(lv.waist, fv.waist, "cm") : "cm"],
    ["Grasso", lb ? fk(bfOf(lb)) + "%" : "—", lb ? `${lb.bia && lb.bia.pbf ? "InBody" : "metro"}${fat ? " · " + fk(fat) + " kg" : ""}` : "serve il collo"]
  ].map(([k, val, d]) => `<div class="tile"><div class="k">${k}</div><div class="v">${val}</div><div class="d">${d}</div></div>`).join("");
  renderBia(asc);
  const ad = asc.filter(x => x.shoulders && x.waist);
  chart($("b-chart-ad"), ad.map(x => ({ d: x.date, x: ts(x.date), y: Math.round(x.shoulders / x.waist * 100) / 100, tip: `spalle ${fk(x.shoulders)} · vita ${fk(x.waist)}` })),
    { unit: "", fmt: n => n.toFixed(2).replace(".", ","), label: "Rapporto spalle/vita", ref: { y: 1.62, label: "sezione aurea 1,62" }, empty: "Misura le spalle (insieme alla vita) e qui vedi quanto ti avvicini alla proporzione delle statue." });
  const M = [["shoulders", "Spalle"], ["chestc", "Petto"], ["arm", "Braccio"], ["waist", "Vita"], ["neck", "Collo"], ["thighc", "Coscia"], ["calf", "Polpaccio"]];
  $("b-meas").innerHTML = M.map(([k, l]) => {
    const xs = asc.filter(x => x[k]); if (!xs.length) return "";
    const a = xs[0][k], b = xs[xs.length - 1][k], d = r1(b - a);
    return `<div class="li"><div class="t"><b>${l}</b><span>${xs.length > 1 ? (d > 0 ? "+" : "") + fk(d) + " cm dall'inizio" : "prima misura " + ddmm(xs[0].date)}</span></div><b>${fk(b)} cm</b></div>`;
  }).join("");
  chart($("b-chart-bf"), bfList.map(x => ({ d: x.date, x: ts(x.date), y: bfOf(x), tip: `${x.bia && x.bia.pbf ? "InBody" : "metro"}${x.weight ? " · " + fk(r1(x.weight * bfOf(x) / 100)) + " kg di grasso" : ""}` })),
    { unit: "%", fmt: n => fk(r1(n)), label: "Massa grassa", ref: { y: 10, label: "obiettivo 10%" }, empty: "Aggiungi il giro collo o una bioimpedenza e qui compare la tua massa grassa." });
  chart($("b-chart-w"), w.map(x => ({ d: x.date, x: ts(x.date), y: x.weight })), { unit: "kg", fmt: n => fk(r1(n)), label: "Peso corporeo", empty: "Pesati 2–3 volte a settimana: la tendenza conta più del singolo giorno." });
  chart($("b-chart-v"), v.map(x => ({ d: x.date, x: ts(x.date), y: x.waist })), { unit: "cm", fmt: n => fk(r1(n)), label: "Giro vita", empty: "Misura il giro vita all'ombelico e segnalo qui sopra." });
  $("b-table").innerHTML = asc.length ? [...asc].reverse().map(x => `<div class="li"><div class="t"><b>${longDate(x.date)}</b><span>${x.weight ? fk(x.weight) + " kg" : "—"} · ${x.waist ? "vita " + fk(x.waist) : "vita —"}${x.neck ? " · collo " + fk(x.neck) : ""}${bfOf(x) !== null ? " · " + fk(bfOf(x)) + "% grasso" + (x.bia && x.bia.pbf ? " (InBody)" : "") : ""}${x.shoulders ? " · spalle " + fk(x.shoulders) : ""}</span></div><div class="acts"><button class="lnk" data-bedit="${x.id}">Modifica</button><button class="lnk danger" data-bdel="${x.id}">Elimina</button></div></div>`).join("") : `<p class="empty">Nessuna misurazione ancora.</p>`;
}
$("b-date").value = today();
const BODY_F = { weight: "b-w", waist: "b-waist", neck: "b-neck", shoulders: "b-sh", chestc: "b-chestc", arm: "b-arm", thighc: "b-thighc", calf: "b-calf" };
let bodyEditId = null;   // measurement being edited: its fields are replaced exactly, and a new date moves it
$("b-save").addEventListener("click", async () => {
  const date = $("b-date").value || today(), m = $("b-msg"), F = BODY_F;
  const val = {}; for (const k in F) val[k] = num($(F[k]).value);
  const bia = {}; for (const k in BIA_F) { const n = num($(BIA_F[k]).value); if (isFinite(n)) bia[k] = n; }
  if (!Object.keys(F).some(k => isFinite(val[k])) && !Object.keys(bia).length) { m.textContent = "Scrivi almeno una misura."; m.className = "savemsg err"; return; }
  if (bia.pbf != null && (bia.pbf < 3 || bia.pbf > 50)) { m.textContent = "La percentuale di grasso sembra strana: controlla il referto."; m.className = "savemsg err"; return; }
  if (isFinite(val.waist) && (val.waist < 50 || val.waist > 160)) { m.textContent = "Il giro vita sembra strano: controlla i centimetri."; m.className = "savemsg err"; return; }
  if (isFinite(val.neck) && (val.neck < 25 || val.neck > 60)) { m.textContent = "Il giro collo sembra strano: controlla i centimetri."; m.className = "savemsg err"; return; }
  // New measurement: adds to what was already saved that day. Edit: what you see is what is saved.
  const prev = bodyEditId ? {} : state.body.find(x => x.id === date) || {};
  const doc = { date };
  for (const k in F) doc[k] = isFinite(val[k]) ? val[k] : (prev[k] ?? null);
  const allBia = { ...(prev.bia || {}), ...bia };
  if (Object.keys(allBia).length) doc.bia = allBia;
  try {
    const moved = bodyEditId && bodyEditId !== date ? bodyEditId : null;
    await put("body", date, doc);
    if (moved) await del("body", moved);
    m.textContent = bodyEditId ? "Misurazione aggiornata." : "Misurazione salvata."; m.className = "savemsg ok";
    for (const k in F) $(F[k]).value = "";
    for (const k in BIA_F) $(BIA_F[k]).value = "";
    bodyEditId = null;
  } catch (e) { m.textContent = "Non sono riuscito a salvare. Riprova tra poco."; m.className = "savemsg err"; }
});
function editBody(id) {
  const x = state.body.find(b => b.id === id); if (!x) return;
  bodyEditId = x.id;
  $("b-date").value = x.date;
  for (const k in BODY_F) $(BODY_F[k]).value = x[k] != null ? fk(x[k]) : "";
  for (const k in BIA_F) $(BIA_F[k]).value = x.bia && x.bia[k] != null ? fk(x.bia[k]) : "";
  if (x.bia) $("b-bia-form").open = true;
  if (["shoulders", "chestc", "arm", "thighc", "calf"].some(k => x[k] != null)) $("b-sh").closest("details").open = true;
  $("b-msg").textContent = `Stai modificando la misurazione di ${longDate(x.date)}: cambia i numeri e tocca Salva.`; $("b-msg").className = "savemsg";
  $("b-save").closest(".card").scrollIntoView({ behavior: "smooth", block: "start" });
}
$("b-table").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.bdel) armDelete(b, () => del("body", b.dataset.bdel));
  if (b.dataset.bedit) editBody(b.dataset.bedit);
});

/* ---------- plan view ---------- */
const WEEK = [["Lun", "Basket", 0], ["Mar", "Basket", 0], ["Mer", "Basket", 0], ["Gio", "Palestra A + corsa", 1], ["Ven", "Partita", 0], ["Sab", "Palestra B + corsa", 1], ["Dom", "Lungo", 0]];
$("s-week").innerHTML = WEEK.map(([d, t, g]) => `<div class="day${g ? " gym" : ""}"><b>${d}</b><span>${t}</span></div>`).join("");
const shortDate = iso => { const d = new Date(iso + "T12:00:00"); return `${d.getDate()} ${MM[d.getMonth()]}`; };
let planBlock = blockOf(today()).n;
function renderPlan() {
  const now = blockOf(today()).n;
  $("s-blocks").innerHTML = BLOCKS.map(b => `<button data-blk="${b.n}" aria-pressed="${b.n === planBlock}"><b>${b.n} · ${b.name}</b><span>${shortDate(b.from)} – ${shortDate(b.end)}</span>${b.n === now ? "<i>adesso</i>" : ""}</button>`).join("");
  const b = BLOCKS[planBlock - 1];
  $("s-blocknote").textContent = b.desc;
  $("s-plans").innerHTML = ["A", "B"].map(p => `<div class="card"><div><div class="eyebrow">${b[p].day} · 17:30 · blocco ${b.n}</div><h2>Scheda ${p} · ${b[p].name}</h2></div><div class="small muted">${esc(b[p].note)}</div><div class="extbl">${
    b[p].ex.map(e => `<div class="li"><div class="t"><b>${esc(e.n)}</b><span>${b.n === 3 ? "carichi del blocco 2" : "partenza " + (!e.start ? "corpo libero" : fk(e.start) + " kg")} · rec. ${mmss(e.rest)}</span></div><span class="small">${e.s} × ${e.lo}–${e.hi}</span></div>`).join("")}</div></div>`).join("");
}
$("s-blocks").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { planBlock = +b.dataset.blk; renderPlan(); } });
renderPlan();

/* ---------- food view ---------- */
// Plans are written every morning by the nutrition agent into docs (coll "nutrition", id = date).
let foodDate = today();
const shiftDate = (iso, n) => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() + n); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
// The day's diary (coll "intake", id = date), read by the nutrition agent the next morning:
// {date, meals: {index: {status, text}}, extras, activities: {index: {name, status, note}}, notes}.
function intakeFor(date) {
  const x = state.intake.find(i => i.id === date) || {};
  const copy = v => v ? JSON.parse(JSON.stringify(v)) : {};
  return { date, meals: copy(x.meals), extras: x.extras || "", activities: copy(x.activities), notes: x.notes || "", photos: x.photos ? JSON.parse(JSON.stringify(x.photos)) : [], added: x.added ? [...x.added] : [] };
}
const saveIntake = (mutate, date = foodDate, defer = false) => { const cur = intakeFor(date); mutate(cur); deferDiary = defer; put("intake", date, cur); };
// Entries are keyed by position (that is how the agent reads them) but also carry the name,
// so a status never lands on the wrong meal or activity if the list changes.
function entryFor(obj, i, name) {
  const a = obj[i];
  if (a && (!a.name || a.name === name)) return a;
  return Object.values(obj).find(x => x && x.name === name) || {};
}
// An entry with no status keeps what was typed (text, numbers), so un-ticking never deletes it.
function setEntry(obj, i, name, val) {
  for (const k of Object.keys(obj)) if (k !== String(i) && obj[k] && obj[k].name === name) delete obj[k];
  const has = Object.entries(val).some(([k, v]) => k !== "name" && k !== "kind" && v !== undefined && v !== "");
  obj[i] = has ? { name, ...val } : {};
}
// Free text is saved while typing (short pause) and flushed when the app goes to the background.
let pendingText = null, textTimer = null;
function saveTextSoon(fn) {
  clearTimeout(textTimer);
  pendingText = () => { clearTimeout(textTimer); pendingText = null; fn(); };
  textTimer = setTimeout(pendingText, 700);
}
function saveTextNow(fn) { clearTimeout(textTimer); pendingText = null; fn(); }
const mealName = mi => { const p = state.nutrition.find(x => x.id === foodDate); return p && p.meals && p.meals[mi] ? p.meals[mi].name || "" : ""; };
const ST = [["ok", "✓ Fatto"], ["diff", "Diverso"], ["skip", "Saltato"]];
function renderFood() {
  const plan = state.nutrition.find(x => x.id === foodDate);
  const log = intakeFor(foodDate);
  renderPhotos(foodDate, plan);
  renderHome(plan);
  $("f-date").value = foodDate;
  $("f-datelbl").textContent = foodDate === today() ? "Oggi" : longDate(foodDate);
  if (document.activeElement !== $("f-extra")) $("f-extra").value = log.extras;
  const adj = plan && plan.adjustment;
  $("f-adj").hidden = !(adj && adj.reason);
  if (adj && adj.reason) $("f-adj").innerHTML = `<h3>Aggiustato su ieri</h3><div class="small">${adj.today_change ? `<b>${adj.today_change > 0 ? "+" : ""}${Math.round(adj.today_change)} kcal</b> · ` : ""}${esc(adj.reason)}</div>`;
  const al = arr(plan && plan.avvisi), ch = arr(plan && plan.modifiche);
  $("f-alerts").hidden = !al.length;
  $("f-alerts").innerHTML = `<h3>Attenzione</h3>${al.map(a => `<div class="warn-item ${a.livello === "alto" ? "alta" : "media"}">${esc(a.testo || "")}</div>`).join("")}`;
  $("f-changes").hidden = !ch.length;
  $("f-changes").innerHTML = `<h3>Modifiche consigliate</h3><ul>${ch.map(c => `<li><b>${esc(c.cosa || "")}</b>${c.perche ? ` · ${esc(c.perche)}` : ""}${c.spesa ? ' <span class="new">da comprare</span>' : ""}</li>`).join("")}</ul>`;
  if (!plan || !Array.isArray(plan.meals)) {
    $("f-day").textContent = "";
    $("f-tiles").innerHTML = "";
    $("f-tips").hidden = true;
    $("f-meals").innerHTML = `<div class="card"><p class="empty">${foodDate >= today()
      ? "Il piano di questo giorno arriva la mattina stessa, verso le 5–6."
      : "Nessun piano salvato per questo giorno."}</p></div>`;
    return;
  }
  const t = plan.targets || {}, s = plan.totals || {};
  $("f-day").textContent = [plan.day_type, (plan.training || []).join(" · "), plan.simile_abitudini].filter(Boolean).join(" — ");
  const tile = (label, key, unit) => {
    const val = s[key] ?? t[key] ?? 0, goal = t[key] ?? 0, off = goal && Math.abs(val - goal) / goal > 0.05;
    return `<div class="tile${off ? " off" : ""}"><div class="k">${label}</div><div class="v">${Math.round(val)}</div><div class="d">su ${Math.round(goal)}${unit}</div></div>`;
  };
  $("f-tiles").innerHTML = tile("kcal", "kcal", "") + tile("Prot.", "protein", " g") + tile("Carbo", "carbs", " g") + tile("Grassi", "fat", " g");
  $("f-meals").innerHTML = plan.meals.map((m, mi) => {
    const ml = entryFor(log.meals, mi, m.name || ""), st = ml.status || "";
    return `<article class="ex meal${st === "ok" ? " complete" : ""}">
    <div class="ex-top"><div><div class="eyebrow">${esc(m.time || "")}</div><h3>${esc(m.name || "Pasto")}</h3></div><span class="cnt">${Math.round(m.kcal || 0)} kcal</span></div>
    ${m.note ? `<p class="note">${esc(m.note)}</p>` : ""}
    <div class="list">${(m.items || []).map(i => `<div class="li"><div class="t"><b>${esc(i.food || "")}${i.nuovo ? ' <span class="new">nuovo</span>' : ""}</b>${i.note ? `<span>${esc(i.note)}</span>` : ""}</div><b>${esc(i.qty || (i.g != null ? i.g + " g" : ""))}</b></div>`).join("")}</div>
    <div class="target">P ${Math.round(m.protein || 0)} g · C ${Math.round(m.carbs || 0)} g · G ${Math.round(m.fat || 0)} g</div>
    <div class="seg three" role="group" aria-label="Com'è andato questo pasto">${ST.map(([k, l]) => `<button data-meal="${mi}" data-st="${k}" aria-pressed="${st === k}">${l}</button>`).join("")}</div>
    ${st === "diff" ? `<textarea class="eaten" data-meal="${mi}" rows="2" placeholder="Cosa hai mangiato invece? es. 2 pizze margherita e una birra media">${esc(ml.text || "")}</textarea>` : ""}
  </article>`;
  }).join("");
  const tips = plan.tips || [];
  $("f-tips").hidden = !tips.length;
  $("f-tips").innerHTML = `<h3>Note del nutrizionista</h3><ul>${tips.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
}
$("f-meals").addEventListener("click", e => {
  const b = e.target.closest("button[data-st]"); if (!b) return;
  const mi = b.dataset.meal, st = b.dataset.st, name = mealName(mi);
  saveIntake(cur => {
    const prev = entryFor(cur.meals, mi, name);
    setEntry(cur.meals, mi, name, { ...prev, status: prev.status === st ? undefined : st });
  });
  if (st === "diff") setTimeout(() => { const t = document.querySelector(`textarea[data-meal="${mi}"]`); if (t) t.focus(); }, 50);
});
const saveMealText = (t, date) => saveIntake(cur => setEntry(cur.meals, t.dataset.meal, mealName(t.dataset.meal), { status: "diff", text: t.value.trim() }), date, true);
$("f-meals").addEventListener("input", e => { const t = e.target.closest("textarea[data-meal]"); if (t) { const d = foodDate; saveTextSoon(() => saveMealText(t, d)); } });
$("f-meals").addEventListener("change", e => { const t = e.target.closest("textarea[data-meal]"); if (t) saveTextNow(() => saveMealText(t, foodDate)); });
const saveExtra = date => saveIntake(cur => { cur.extras = $("f-extra").value.trim(); }, date, true);
$("f-extra").addEventListener("input", () => { const d = foodDate; saveTextSoon(() => saveExtra(d)); });
$("f-extra").addEventListener("change", () => saveTextNow(() => saveExtra(foodDate)));
$("f-prev").addEventListener("click", () => { foodDate = shiftDate(foodDate, -1); renderFood(); });
$("f-next").addEventListener("click", () => { foodDate = shiftDate(foodDate, 1); renderFood(); });
$("f-date").addEventListener("change", e => { if (e.target.value) { foodDate = e.target.value; renderFood(); } });

/* ---------- food photos: queued here, analysed by the morning agent (coll "photo") ---------- */
// The photo (≤1024 px JPEG) goes to the database with status "pending"; at 6:00 the agent looks at it,
// writes foods, grams, kcal and macros back (status "done") and drops the image. No API key, no cost.
// Thumbnails stay on this phone only (localStorage), so the image never sits in the app's cache.
const THUMBS_KEY = "olimpo-thumbs";
const getThumbs = () => lsGet(THUMBS_KEY, {});
function keepThumb(id, dataUrl) {
  const t = getThumbs(); t[id] = dataUrl;
  const ids = Object.keys(t); if (ids.length > 80) for (const k of ids.slice(0, ids.length - 80)) delete t[k];
  lsSet(THUMBS_KEY, t);
}
function shrinkImage(file, max, quality) {
  return new Promise((ok, ko) => {
    const url = URL.createObjectURL(file), img = new Image();
    img.onload = () => {
      const s = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement("canvas");
      c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); ok(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); ko(new Error("Foto non leggibile")); };
    img.src = url;
  });
}
function photoMsg(text, cls) { const m = $("f-photo-msg"); m.hidden = !text; m.textContent = text || ""; m.className = "savemsg" + (cls ? " " + cls : ""); }
// The description is kept as a draft while typing, so it survives a reload until it is saved.
const NOTE_KEY = "olimpo-fnote";
$("f-photo-note").value = lsGet(NOTE_KEY, "");
$("f-photo-note").addEventListener("input", e => lsSet(NOTE_KEY, e.target.value));
const clearNote = () => { $("f-photo-note").value = ""; lsSet(NOTE_KEY, ""); };
const nowHM = () => { const d = new Date(); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };
$("f-photo").addEventListener("change", async e => {
  const file = e.target.files && e.target.files[0]; e.target.value = ""; if (!file) return;
  photoMsg("Salvo la foto…");
  try {
    const image = await shrinkImage(file, 1024, 0.75), thumb = await shrinkImage(file, 200, 0.7);
    const id = `${foodDate}-${Date.now().toString(36)}`;
    keepThumb(id, thumb);
    put("photo", id, { date: foodDate, time: nowHM(), note: $("f-photo-note").value.trim(), status: "pending", image: image.split(",")[1] });
    clearNote();
    photoMsg(navigator.onLine ? "Foto salvata. Il nutrizionista la analizza domattina alle 6." : "Foto salvata sul telefono: parte appena torna internet.", "ok");
  } catch (x) { photoMsg("Non sono riuscito a leggere la foto. Riprova.", "err"); }
});
// A text-only entry is a "photo" document without the image: same list, same analysis by the agent.
$("f-text-save").addEventListener("click", () => {
  const note = $("f-photo-note").value.trim();
  if (!note) { photoMsg("Scrivi prima cosa hai mangiato.", "err"); $("f-photo-note").focus(); return; }
  put("photo", `${foodDate}-${Date.now().toString(36)}`, { date: foodDate, time: nowHM(), note, status: "pending", text_only: true });
  clearNote();
  photoMsg("Salvato. Il nutrizionista lo analizza domattina alle 6.", "ok");
});
// Text of an entry the agent has not analysed yet. If the photo is still in the outbox the change
// goes with it; otherwise a patch keeps the image already on the server.
function patchPhoto(id, fields) {
  const cur = state.photo.find(p => p.id === id);
  if (!cur || cur.status === "done") return false;
  applyLocal("photo", id, { ...cur, ...fields });
  // A new queued change, never an edit of one that may already be on its way (that one would drop the edit when done).
  const queued = outbox.find(o => o.coll === "photo" && o.id === id && o.op !== "del");
  enqueue(queued ? { ...queued, data: { ...queued.data, ...fields } } : { op: "patch", coll: "photo", id, data: fields });
  onData(); flush(); return true;
}
let phEdit = null, phDraft = null;   // entry being edited and its unsaved text (kept across re-renders)
$("f-photo-list").addEventListener("input", e => { if (e.target.id === "f-ph-edit") phDraft = e.target.value; });
$("f-photo-list").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.phdel) return armDelete(b, async () => { const id = b.dataset.phdel, t = getThumbs(); if (t[id]) { delete t[id]; lsSet(THUMBS_KEY, t); } del("photo", id); });
  if (b.dataset.phedit) { phEdit = b.dataset.phedit; phDraft = null; renderFood(); const t = $("f-ph-edit"); if (t) { t.focus(); t.setSelectionRange(t.value.length, t.value.length); } return; }
  if (b.dataset.phcancel) { phEdit = phDraft = null; return renderFood(); }
  if (b.dataset.phsave) {
    const t = $("f-ph-edit"), p = state.photo.find(x => x.id === b.dataset.phsave);
    if (p && p.text_only && !t.value.trim()) { photoMsg("Il testo non può essere vuoto: se vuoi toglierlo usa Elimina.", "err"); return; }
    phEdit = phDraft = null;
    const ok = patchPhoto(b.dataset.phsave, { note: t.value.trim() });
    photoMsg(ok ? "Testo aggiornato." : "Il nutrizionista l'ha già analizzato: non si può più modificare.", ok ? "ok" : "err");
    renderFood();
  }
});
function renderPhotos(date, plan) {
  const thumbs = getThumbs(), ph = state.photo.filter(p => p.date === date).sort((a, b) => a.id < b.id ? -1 : 1);
  const done = ph.filter(p => p.status === "done");
  const t = done.reduce((s, p) => ({ kcal: s.kcal + (p.kcal || 0), protein: s.protein + (p.protein || 0), carbs: s.carbs + (p.carbs || 0), fat: s.fat + (p.fat || 0) }), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
  const goal = plan && plan.targets ? plan.targets.kcal : 0, waiting = ph.length - done.length;
  $("f-photo-sum").textContent = !ph.length ? "" :
    (done.length ? `Già analizzato: ${Math.round(t.kcal)} kcal${goal ? ` su ${Math.round(goal)}` : ""} · P ${Math.round(t.protein)} g · C ${Math.round(t.carbs)} g · G ${Math.round(t.fat)} g` : "")
    + (waiting ? `${done.length ? " · " : ""}${waiting} in attesa di analisi (domattina)` : "");
  if (phEdit && !ph.some(p => p.id === phEdit && p.status !== "done")) phEdit = phDraft = null;
  $("f-photo-list").innerHTML = ph.map(p => {
    const isDone = p.status === "done", kind = p.text_only ? "Testo" : "Foto";
    const pic = thumbs[p.id] ? `<img class="thumb" src="${thumbs[p.id]}" alt="">` : p.text_only ? `<span class="thumb txt" aria-hidden="true">✎</span>` : "";
    if (p.id === phEdit) return `<div class="li ph-edit"><textarea class="eaten" id="f-ph-edit" rows="3">${esc(phDraft ?? p.note ?? "")}</textarea>
      <div class="acts"><button class="lnk" data-phsave="${p.id}">Salva</button><button class="lnk" data-phcancel="1">Annulla</button></div></div>`;
    return `<div class="li"><div class="with-thumb">${pic}<div class="t">
      <b>${esc(p.time || "")} · ${kind} · ${isDone ? Math.round(p.kcal || 0) + " kcal" : "in attesa"}</b>
      ${p.note ? `<span>${isDone ? "Tu: " : ""}${esc(p.note)}</span>` : isDone ? "" : `<span>Il nutrizionista la analizza domattina alle 6.</span>`}
      ${isDone ? `<span>${(p.items || []).map(i => `${esc(i.food)} ${Math.round(i.grams)} g`).join(", ")}</span>` : ""}
      ${isDone && p.ai_note ? `<span>${esc(p.ai_note)}</span>` : ""}
    </div></div><div class="acts">${isDone ? "" : `<button class="lnk" data-phedit="${p.id}">Modifica</button>`}<button class="lnk danger" data-phdel="${p.id}">Elimina</button></div></div>`;
  }).join("");
}

const PF = { excluded: "p-excl", likes: "p-pref", breakfast: "p-bk", lunch: "p-lunch", lunch_where: "p-where", notes: "p-notes" };
let profileTouched = false;
function fillProfile() {
  const p = state.profile.find(x => x.id === "nutrition");
  if (!p || profileTouched) return;
  for (const k in PF) if (p[k] != null) $(PF[k]).value = p[k];
}
$("f-prof").addEventListener("input", () => { profileTouched = true; });
// Keeps the fields saved elsewhere in the same document (what's at home this week).
const profileRest = () => { const p = state.profile.find(x => x.id === "nutrition") || {}; const { id, ...rest } = p; return rest; };
$("p-save").addEventListener("click", async () => {
  const data = profileRest(); for (const k in PF) data[k] = $(PF[k]).value.trim();
  await put("profile", "nutrition", data);
  profileTouched = false;
  $("p-msg").textContent = "Profilo salvato. Lo uso dal piano di domani mattina."; $("p-msg").className = "savemsg ok";
});

// What's at home this week (written by the user) and the habits the agent has learned (coll "profile", id "habits").
const saveFridge = () => put("profile", "nutrition", { ...profileRest(), fridge: $("f-fridge").value.trim(), fridge_date: today() });
$("f-fridge").addEventListener("input", () => saveTextSoon(saveFridge));
$("f-fridge").addEventListener("change", () => saveTextNow(saveFridge));
function renderHome() {
  const p = state.profile.find(x => x.id === "nutrition") || {};
  if (document.activeElement !== $("f-fridge")) $("f-fridge").value = p.fridge || "";
  $("f-fridge-date").textContent = p.fridge_date ? `Aggiornato ${p.fridge_date === today() ? "oggi" : "il " + ddmm(p.fridge_date)}` : "";
  const h = state.profile.find(x => x.id === "habits");
  $("f-habits").hidden = !h;
  if (!h) return;
  const fr = arr(h.frequenti), ok = arr(h.bene), md = arr(h.modifiche), sp = arr(h.spesa);
  $("f-habits").innerHTML = `<h3>Le tue abitudini</h3><div class="small muted">Imparate dal nutrizionista da foto, testi e diario${h.giorni_con_dati ? ` (${h.giorni_con_dati} giorni di dati)` : ""}. Le usa per proporti piatti simili ai tuoi.</div>
    ${h.base ? `<p>${esc(h.base)}</p>` : ""}
    ${fr.length ? `<div class="chips">${fr.map(f => `<span class="chip">${esc(f.food || "")}${f.giorni ? ` · ${f.giorni} gg` : ""}</span>`).join("")}</div>` : ""}
    ${ok.length ? `<div class="small muted">Cosa fai già bene</div><ul>${ok.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    ${md.length ? `<div class="small muted">Da cambiare</div><ul>${md.map(x => `<li><b>${esc(x.cosa || "")}</b>${x.perche ? ` · ${esc(x.perche)}` : ""}</li>`).join("")}</ul>` : ""}
    ${sp.length ? `<div class="small muted">Da chiedere per la spesa</div><ul>${sp.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}`;
}

/* ---------- notes view: did the day's activities happen? ---------- */
let notesDate = today();
const AST = [["ok", "✓ Fatto"], ["part", "Parziale"], ["no", "Non fatto"]];
const WEEK_ACTS = { 1: ["Basket"], 2: ["Basket serie D"], 3: ["Basket"], 4: ["Corsa di qualità", "Palestra A"], 5: ["Partita"], 6: ["Corsa facile + core", "Palestra B"], 0: ["Lungo"] };
// Basket and calcetto: the entry of the day's checklist also holds the numbers of the activity.
// partita (basket game): min, pts, note · basket (practice): intensita semplice|normale|duro · calcetto (game): gol, ast, min, note.
const actKind = name => /calcetto/i.test(name) ? "calcetto" : /partita/i.test(name) ? "partita" : /basket/i.test(name) ? "basket" : null;
const INT = [["semplice", "Semplice"], ["normale", "Normale"], ["duro", "Duro"]];
const GAME_F = { partita: [["min", "Minuti giocati"], ["pts", "Punti"]], calcetto: [["gol", "Gol"], ["ast", "Assist"], ["min", "Minuti"]] };
const ADD_ACTS = ["Partita di basket", "Allenamento basket", "Calcetto"];
function activitiesFor(date) {
  const plan = state.nutrition.find(x => x.id === date), added = intakeFor(date).added;
  if (plan && Array.isArray(plan.training) && plan.training.length)
    return { list: [...plan.training, ...added], src: "Dal tuo calendario, letto dal nutrizionista stamattina." };
  return { list: [...WEEK_ACTS[new Date(date + "T12:00:00").getDay()], ...added], src: "Dalla settimana tipo. Quando arriva il piano del mattino, l'elenco usa i dati esatti del calendario." };
}
function actExtra(name, i, a, st) {
  const kind = actKind(name);
  if (!kind || st === "no") return "";
  if (kind === "basket") return `<div class="small muted">Com'è stato l'allenamento?</div>
    <div class="seg three" role="group" aria-label="Intensità">${INT.map(([k, l]) => `<button data-int="${i}" data-v="${k}" aria-pressed="${a.intensita === k}">${l}</button>`).join("")}</div>`;
  return `<div class="fields ${GAME_F[kind].length === 3 ? "three" : ""}">${GAME_F[kind].map(([k, l]) => `<label class="fld">${l}<input data-act="${i}" data-k="${k}" inputmode="numeric" value="${a[k] != null ? esc(a[k]) : ""}" placeholder="0"></label>`).join("")}</div>`;
}
function renderNotes() {
  const log = intakeFor(notesDate), { list, src } = activitiesFor(notesDate);
  $("n-date").value = notesDate;
  $("n-datelbl").textContent = notesDate === today() ? "Oggi" : longDate(notesDate);
  $("n-src").textContent = src;
  if (document.activeElement !== $("n-notes")) $("n-notes").value = log.notes;
  const sets = state.sessions.filter(s => s.date === notesDate).reduce((a, s) => a + Object.values(s.sets).reduce((x, y) => x + y.length, 0), 0);
  const nPlanned = list.length - log.added.length;
  $("n-list").innerHTML = list.map((name, i) => {
    const a = entryFor(log.activities, i, name), st = a.status || "", kind = actKind(name);
    const hint = /palestra/i.test(name) && sets ? `${sets} serie segnate nell'app` : i >= nPlanned ? "aggiunta da te" : "";
    const game = kind === "partita" || kind === "calcetto";
    const ph = st === "part" ? "Cosa hai fatto davvero? es. 9 km invece di 15" : st === "no" ? "Perché? es. dolore al ginocchio, pioggia, lavoro" : kind === "calcetto" ? "Com'è andata? Cosa hai fatto o provato (es. più pressing, tiri da fuori)" : "Com'è andata? Cosa hai fatto o provato (es. più tiri da tre, difesa sul play)";
    return `<div class="act">
      <div class="act-top"><b>${esc(name)}</b>${hint ? `<span class="small muted">${hint}</span>` : ""}${i >= nPlanned ? `<button class="lnk danger" data-unadd="${i - nPlanned}">Togli</button>` : ""}</div>
      <div class="seg three" role="group" aria-label="${esc(name)}">${AST.map(([k, l]) => `<button data-act="${i}" data-st="${k}" aria-pressed="${st === k}">${l}</button>`).join("")}</div>
      ${actExtra(name, i, a, st)}
      ${st === "part" || st === "no" || (game && st) ? `<textarea class="eaten" data-act="${i}" rows="2" placeholder="${ph}">${esc(a.note || "")}</textarea>` : ""}
    </div>`;
  }).join("") + `<div class="act"><div class="small muted">Hai fatto altro? Aggiungi</div><div class="chips">${ADD_ACTS.map(n => `<button class="chip" data-addact="${esc(n)}">+ ${n}</button>`).join("")}</div></div>`;
  const marked = list.filter((n, i) => entryFor(log.activities, i, n).status).length;
  const done = list.filter((n, i) => entryFor(log.activities, i, n).status === "ok").length;
  $("n-sum").textContent = marked
    ? `${done} su ${list.length} ${list.length === 1 ? "attività fatta" : "attività fatte"} per intero${marked < list.length ? ` · ${list.length - marked} da segnare` : ""}`
    : "Segna com'è andata ogni attività: domattina il nutrizionista ne tiene conto.";
}
$("n-list").addEventListener("click", e => {
  const add = e.target.closest("button[data-addact]");
  if (add) { saveIntake(cur => { cur.added = [...cur.added, add.dataset.addact]; }, notesDate); return; }
  const un = e.target.closest("button[data-unadd]");
  if (un) {
    const j = +un.dataset.unadd, { list } = activitiesFor(notesDate), i = list.length - intakeFor(notesDate).added.length + j;
    armDelete(un, async () => saveIntake(cur => {
      const name = cur.added[j];
      for (const k of Object.keys(cur.activities)) if (k === String(i) || (cur.activities[k] && cur.activities[k].name === name)) delete cur.activities[k];
      cur.added.splice(j, 1);
    }, notesDate));
    return;
  }
  const ib = e.target.closest("button[data-int]");
  if (ib) {
    const i = ib.dataset.int, name = activitiesFor(notesDate).list[i];
    saveIntake(cur => { const prev = entryFor(cur.activities, i, name); setEntry(cur.activities, i, name, { ...prev, kind: actKind(name), status: prev.status || "ok", intensita: prev.intensita === ib.dataset.v ? undefined : ib.dataset.v }); }, notesDate);
    return;
  }
  const b = e.target.closest("button[data-act]"); if (!b) return;
  const i = b.dataset.act, st = b.dataset.st, name = activitiesFor(notesDate).list[i], game = /partita|calcetto/.test(actKind(name) || "");
  saveIntake(cur => {
    const prev = entryFor(cur.activities, i, name);
    setEntry(cur.activities, i, name, prev.status === st ? { ...prev, status: undefined }
      : { ...prev, kind: actKind(name) || undefined, status: st, note: st === "ok" && !game ? "" : (prev.note || "") });
  }, notesDate);
  if (st !== "ok") setTimeout(() => { const t = document.querySelector(`textarea[data-act="${i}"]`); if (t) t.focus(); }, 50);
});
// Text and numbers of an activity: saved while typing. Writing a number marks the activity as done.
const saveActField = (t, date) => {
  const i = t.dataset.act, name = activitiesFor(date).list[i];
  saveIntake(cur => {
    const prev = entryFor(cur.activities, i, name), k = t.dataset.k;
    const val = k ? (t.value.trim() === "" ? undefined : Math.max(0, Math.round(num(t.value)))) : t.value.trim();
    setEntry(cur.activities, i, name, { ...prev, kind: actKind(name) || undefined, status: prev.status || (k ? "ok" : "part"), [k || "note"]: Number.isNaN(val) ? undefined : val });
  }, date, true);
};
const actInput = e => e.target.closest("textarea[data-act], input[data-act]");
$("n-list").addEventListener("input", e => { const t = actInput(e); if (t) { const d = notesDate; saveTextSoon(() => saveActField(t, d)); } });
$("n-list").addEventListener("change", e => { const t = actInput(e); if (t) saveTextNow(() => saveActField(t, notesDate)); });
const saveNotes = date => saveIntake(cur => { cur.notes = $("n-notes").value.trim(); }, date, true);
$("n-notes").addEventListener("input", () => { const d = notesDate; saveTextSoon(() => saveNotes(d)); });
$("n-notes").addEventListener("change", () => saveTextNow(() => saveNotes(notesDate)));
$("n-prev").addEventListener("click", () => { notesDate = shiftDate(notesDate, -1); renderNotes(); });
$("n-next").addEventListener("click", () => { notesDate = shiftDate(notesDate, 1); renderNotes(); });
$("n-date").addEventListener("change", e => { if (e.target.value) { notesDate = e.target.value; renderNotes(); } });

/* ---------- run view: one document per run in coll "runs" ---------- */
// {date, type, km, sec (total duration), pace (sec/km), elev (m+), hr, rpe, note}
const RUN_TYPES = { facile: "Facile", lungo: "Lungo", qualita: "Qualità", gara: "Gara" };
let runType = "facile", runTouched = false;
const paceStr = s => { const t = Math.round(s); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); };
const hms = s => { const t = Math.round(s), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), x = t % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); };
const nv = id => { const n = num($(id).value); return isFinite(n) && n > 0 ? n : 0; };
const mondayOf = iso => { const d = new Date(iso + "T12:00:00"); d.setDate(d.getDate() - (d.getDay() + 6) % 7); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
function readRun() { return { km: nv("r-km"), dur: nv("r-h") * 3600 + nv("r-m") * 60 + nv("r-s"), pace: nv("r-pm") * 60 + nv("r-ps") }; }
function setDur(sec) {
  const t = Math.round(sec), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60);
  $("r-h").value = h || ""; $("r-m").value = h ? String(m).padStart(2, "0") : m; $("r-s").value = String(t % 60).padStart(2, "0");
}
function setPace(sec) { const t = Math.round(sec); $("r-pm").value = Math.floor(t / 60); $("r-ps").value = String(t % 60).padStart(2, "0"); }
function setType(t) { runType = t; for (const b of $("r-type").querySelectorAll("button")) b.setAttribute("aria-pressed", b.dataset.type === t); }
function runHint() {
  // Suggest type and distance from the day's calendar activities (via the nutrition plan).
  const date = $("r-date").value || today();
  const act = activitiesFor(date).list.find(a => /lungo|corsa|fartlek|test|soglia|mezza/i.test(a));
  $("r-hint").textContent = act ? `In calendario: ${act}` : "Oggi non c'è una corsa in calendario.";
  if (!act || runTouched) return;
  setType(/lungo/i.test(act) ? "lungo" : /mezza/i.test(act) ? "gara" : /fartlek|test|soglia/i.test(act) ? "qualita" : "facile");
  const km = act.match(/(\d+(?:[.,]\d+)?)\s*km/i);
  $("r-km").placeholder = km ? km[1].replace(".", ",") : "12,0";
}
function renderRun() {
  const runs = [...state.runs].sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : (a.id < b.id ? 1 : -1));
  const wk = mondayOf(today()), thisWeek = runs.filter(r => mondayOf(r.date) === wk);
  const kmWeek = thisWeek.reduce((a, r) => a + (r.km || 0), 0), longest = runs.reduce((a, r) => Math.max(a, r.km || 0), 0), last = runs[0];
  $("r-tiles").innerHTML = [
    ["Settimana", fk(r1(kmWeek)) + " km", thisWeek.length === 1 ? "1 corsa" : thisWeek.length + " corse"],
    ["Più lunga", longest ? fk(r1(longest)) + " km" : "—", "obiettivo 42,2"],
    ["Ultima", last ? paceStr(last.pace) + "/km" : "—", last ? `${ddmm(last.date)} · ${fk(r1(last.km))} km` : "nessuna corsa"]
  ].map(([k, v, d]) => `<div class="tile"><div class="k">${k}</div><div class="v">${v}</div><div class="d">${d}</div></div>`).join("");

  const weeks = [];
  for (let i = 11; i >= 0; i--) {
    const start = shiftDate(wk, -7 * i), rs = runs.filter(r => mondayOf(r.date) === start);
    weeks.push({ d: start, x: ts(start), y: r1(rs.reduce((a, r) => a + (r.km || 0), 0)), tip: rs.length ? `settimana dal ${ddmm(start)} · ${rs.length} ${rs.length === 1 ? "corsa" : "corse"}` : `settimana dal ${ddmm(start)}` });
  }
  chart($("r-week"), runs.length ? weeks : [], { bar: true, unit: "km", fmt: v => fk(r1(v)), label: "Km a settimana", empty: "Salva la tua prima corsa e qui vedi i km di ogni settimana." });
  const easy = runs.filter(r => r.type === "facile" || r.type === "lungo").reverse();
  chart($("r-pace"), easy.map(r => ({ d: r.date, x: ts(r.date), y: r.pace, tip: `${RUN_TYPES[r.type]} ${fk(r1(r.km))} km${r.hr ? " · " + r.hr + " bpm" : ""}` })),
    { unit: "/km", fmt: paceStr, label: "Ritmo di facili e lunghi", empty: "Il grafico del ritmo compare dopo la prima corsa facile o il primo lungo." });
  const thumbs = r => { const im = r.imgs || {}; const ks = RIMG.filter(([k]) => im[k]);
    return ks.length ? `<div class="rthumbs">${ks.map(([k, l]) => `<button data-view="${esc(im[k])}" aria-label="${l}"><img data-img="${esc(im[k])}" alt="${l}"></button>`).join("")}</div>` : ""; };
  $("r-list").innerHTML = runs.length ? runs.map(r => `<div class="li"><div class="t"><b>${RUN_TYPES[r.type] || "Corsa"} · ${fk(r1(r.km))} km</b><span>${longDate(r.date)} · ${hms(r.sec)} · ${paceStr(r.pace)}/km${r.elev ? " · " + r.elev + " m+" : ""}${r.hr ? " · " + r.hr + " bpm" : ""}${r.rpe ? " · fatica " + r.rpe : ""}</span>${r.note ? `<span>${esc(r.note)}</span>` : ""}${thumbs(r)}</div><div class="acts"><button class="lnk" data-redit="${r.id}">Modifica</button><button class="lnk danger" data-rdel="${r.id}">Elimina</button></div></div>`).join("")
    : `<p class="empty">Nessuna corsa ancora. Domani mattina c'è la corsa facile: quando torni, segnala qui.</p>`;
  fillImgs($("r-list"));
  runHint();
}
// Images of the run being entered or edited: kind -> {name} (already saved) | {data} (new, base64) | null (removed).
const RIMG = [["hr", "Grafico del battito"], ["zones", "Zone di battito"]];
let runImgs = {}, runImgKind = null;
function renderRunImgs() {
  $("r-imgs").innerHTML = RIMG.map(([k, l]) => { const v = runImgs[k];
    const pic = v && v.data ? `<img src="data:image/jpeg;base64,${v.data}" alt="${l}">` : v && v.name ? `<img data-img="${esc(v.name)}" alt="${l}">` : `+ ${l}`;
    return `<div class="run-img"><button class="slot" data-rimg="${k}" aria-label="${v ? "Cambia" : "Aggiungi"}: ${l}">${pic}</button>${v ? `<button class="lnk danger" data-rimgdel="${k}">Togli</button>` : ""}</div>`; }).join("");
  fillImgs($("r-imgs"));
}
$("r-imgs").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.rimgdel) { runImgs[b.dataset.rimgdel] = null; renderRunImgs(); return; }
  if (b.dataset.rimg) { runImgKind = b.dataset.rimg; $("r-img-file").click(); }
});
$("r-img-file").addEventListener("change", async e => {
  const file = e.target.files && e.target.files[0]; e.target.value = ""; if (!file || !runImgKind) return;
  try { runImgs[runImgKind] = { data: (await shrinkImage(file, 1400, 0.82)).split(",")[1] }; runTouched = true; renderRunImgs(); }
  catch (x) { $("r-msg").textContent = "Non sono riuscito a leggere l'immagine. Riprova."; $("r-msg").className = "savemsg err"; }
});
// Full-screen view of an image (tap anywhere or "Chiudi" to close).
async function openViewer(name) {
  const u = await imgUrl(name);
  if (!u) { $("r-msg").textContent = "L'immagine si apre quando c'è internet."; $("r-msg").className = "savemsg"; return; }
  $("viewer-img").src = u; $("viewer").hidden = false;
}
$("viewer").addEventListener("click", () => { $("viewer").hidden = true; $("viewer-img").removeAttribute("src"); });
$("r-type").addEventListener("click", e => { const b = e.target.closest("button[data-type]"); if (b) { runTouched = true; setType(b.dataset.type); } });
// Whichever two of distance, duration and pace the user typed decide the third.
// Values the app filled in itself (auto*) keep following later edits.
let autoDur = false, autoKm = false;
for (const id of ["r-km", "r-h", "r-m", "r-s"]) $(id).addEventListener("change", () => {
  runTouched = true;
  if (id === "r-km") autoKm = false; else autoDur = false;
  const { km, dur, pace } = readRun();
  if (id === "r-km" && autoDur && pace && km) setDur(km * pace);
  else if (id !== "r-km" && autoKm && pace && dur) $("r-km").value = (dur / pace).toFixed(2).replace(".", ",");
  else if (km && dur) setPace(dur / km);
});
for (const id of ["r-pm", "r-ps"]) $(id).addEventListener("change", () => {
  runTouched = true; const { km, dur, pace } = readRun(); if (!pace) return;
  if (km && (!dur || autoDur)) { setDur(km * pace); autoDur = true; }
  else if (dur && (!km || autoKm)) { $("r-km").value = (dur / pace).toFixed(2).replace(".", ","); autoKm = true; }
});
$("r-date").addEventListener("change", runHint);
$("r-save").addEventListener("click", async () => {
  let { km, dur, pace } = readRun();
  if (!dur && km && pace) dur = km * pace;
  if (!km && dur && pace) km = dur / pace;
  if (km && dur) pace = dur / km;
  const m = $("r-msg");
  if (!(km > 0 && dur > 0)) { m.textContent = "Servono almeno due tra distanza, durata e ritmo."; m.className = "savemsg err"; return; }
  if (pace < 150 || pace > 900) { m.textContent = "Il ritmo viene strano: controlla distanza e durata."; m.className = "savemsg err"; return; }
  const date = $("r-date").value || today();
  const id = runEditId || `${date}-${Date.now().toString(36)}`;
  const data = { date, type: runType, km: Math.round(km * 100) / 100, sec: Math.round(dur), pace: Math.round(pace), elev: Math.round(nv("r-elev")), hr: Math.round(nv("r-hr")) || null, rpe: Math.min(10, Math.round(nv("r-rpe"))) || null, note: $("r-note").value.trim() };
  const edited = !!runEditId;
  // images: new ones are queued for upload (a new name each time, so no stale copy is shown); replaced or removed ones are deleted
  const old = (state.runs.find(x => x.id === id) || {}).imgs || {}, imgs = {};
  for (const [k] of RIMG) {
    const v = runImgs[k];
    if (v && v.data) { const name = `${id}-${k}-${Date.now().toString(36)}.jpg`; enqueue({ op: "img", coll: "img", id: name, data: v.data }); imgs[k] = name; }
    else if (v && v.name) imgs[k] = v.name;
    if (old[k] && old[k] !== imgs[k]) enqueue({ op: "imgdel", coll: "img", id: old[k] });
  }
  if (Object.keys(imgs).length) data.imgs = imgs;
  put("runs", id, data);
  resetRunForm();
  m.textContent = `${edited ? "Corsa aggiornata" : "Corsa salvata"}: ${fk(r1(data.km))} km in ${hms(data.sec)}, ${paceStr(data.pace)}/km.`; m.className = "savemsg ok";
});
let runEditId = null;
function resetRunForm() {
  for (const id of ["r-km", "r-h", "r-m", "r-s", "r-pm", "r-ps", "r-elev", "r-hr", "r-rpe", "r-note"]) $(id).value = "";
  runTouched = false; autoDur = false; autoKm = false; runEditId = null;
  runImgs = {}; renderRunImgs();
  $("r-save").textContent = "Salva corsa"; $("r-cancel").hidden = true;
}
function editRun(id) {
  const r = state.runs.find(x => x.id === id); if (!r) return;
  runEditId = r.id; runTouched = true;
  $("r-date").value = r.date; setType(r.type || "facile");
  $("r-km").value = String(r.km).replace(".", ","); setDur(r.sec); setPace(r.pace);
  $("r-elev").value = r.elev || ""; $("r-hr").value = r.hr || ""; $("r-rpe").value = r.rpe || ""; $("r-note").value = r.note || "";
  runImgs = Object.fromEntries(Object.entries(r.imgs || {}).map(([k, n]) => [k, { name: n }])); renderRunImgs();
  $("r-save").textContent = "Salva modifiche"; $("r-cancel").hidden = false;
  $("r-msg").textContent = `Stai modificando la corsa di ${longDate(r.date)}.`; $("r-msg").className = "savemsg";
  $("r-km").closest(".card").scrollIntoView({ behavior: "smooth", block: "start" });
}
$("r-list").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.view) return openViewer(b.dataset.view);
  if (b.dataset.rdel) armDelete(b, () => delRun(b.dataset.rdel));
  if (b.dataset.redit) editRun(b.dataset.redit);
});
// Deleting a run also deletes its images.
function delRun(id) {
  for (const n of Object.values((state.runs.find(x => x.id === id) || {}).imgs || {})) enqueue({ op: "imgdel", coll: "img", id: n });
  return del("runs", id);
}
$("r-cancel").addEventListener("click", () => { resetRunForm(); $("r-msg").textContent = "Modifica annullata."; $("r-msg").className = "savemsg"; runHint(); });
$("r-date").value = today();
renderRunImgs();
$("w-plan").addEventListener("click", () => showTab("plan"));

/* ---------- "today" strip at the top of Palestra ---------- */
function renderToday() {
  const t = today(), plan = state.nutrition.find(x => x.id === t), acts = activitiesFor(t).list;
  $("w-today-t").textContent = acts.length ? acts.join(" · ") : "Giorno di riposo";
  $("w-today-s").textContent = plan && plan.targets ? `Piano alimentare: ${Math.round(plan.targets.kcal)} kcal · tocca per vederlo` : "Il piano alimentare arriva verso le 5–6 del mattino";
}
$("w-today").addEventListener("click", () => showTab("food"));

/* ---------- archive: everything the user has entered, by day, each item editable ---------- */
const AF = [["all", "Tutto"], ["gym", "Palestra"], ["run", "Corsa"], ["body", "Corpo"], ["food", "Cibo"], ["notes", "Note"]];
let archFilter = lsGet("olimpo-arch", "all"), archDays = 30;
if (!AF.some(([k]) => k === archFilter)) archFilter = "all";
const cut = (s, n) => s.length > n ? s.slice(0, n - 1) + "…" : s;
const archItem = (kind, title, sub, edit, delAttr) => `<div class="li"><div class="t"><span class="eyebrow">${kind}</span><b>${title}</b>${sub ? `<span>${sub}</span>` : ""}</div><div class="acts"><button class="lnk" data-aedit="${edit}">Modifica</button>${delAttr ? `<button class="lnk danger" ${delAttr}>Elimina</button>` : ""}</div></div>`;
function archEntries() {
  const days = {}, add = (date, f, html) => { if (archFilter === "all" || archFilter === f) (days[date] = days[date] || []).push(html); };
  for (const s of state.sessions) {
    const n = Object.values(s.sets).reduce((a, b) => a + b.length, 0);
    add(s.date, "gym", archItem("Palestra", `Scheda ${s.plan}`, `${n} serie · ${Math.round(volumeOf(s)).toLocaleString("it-IT")} kg di volume`, `gym:${s.id}`, `data-adel="sessions:${s.id}"`));
  }
  for (const r of state.runs)
    add(r.date, "run", archItem("Corsa", `${RUN_TYPES[r.type] || "Corsa"} · ${fk(r1(r.km))} km`, `${hms(r.sec)} · ${paceStr(r.pace)}/km${r.elev ? " · " + r.elev + " m+" : ""}${r.hr ? " · " + r.hr + " bpm" : ""}${r.note ? " · " + esc(cut(r.note, 60)) : ""}`, `run:${r.id}`, `data-adel="runs:${r.id}"`));
  const BL = [["weight", "kg"], ["waist", "vita"], ["neck", "collo"], ["shoulders", "spalle"], ["chestc", "petto"], ["arm", "braccio"], ["thighc", "coscia"], ["calf", "polpaccio"]];
  for (const x of state.body)
    add(x.date, "body", archItem("Corpo", "Misurazione", BL.filter(([k]) => x[k] != null).map(([k, l]) => k === "weight" ? fk(x[k]) + " kg" : l + " " + fk(x[k])).join(" · "), `body:${x.id}`, `data-adel="body:${x.id}"`));
  for (const i of state.intake) {
    const log = intakeFor(i.id), meals = Object.values(log.meals).filter(m => m && m.status), acts = Object.values(log.activities).filter(a => a && a.status);
    if (meals.length || log.extras) {
      const c = k => meals.filter(m => m.status === k).length;
      const pl = (n, one, many) => `${n} ${n === 1 ? one : many}`;
      const parts = [c("ok") && pl(c("ok"), "pasto come da piano", "pasti come da piano"), c("diff") && pl(c("diff"), "diverso", "diversi"), c("skip") && pl(c("skip"), "saltato", "saltati")].filter(Boolean);
      add(i.id, "food", archItem("Cibo", "Diario dei pasti", [parts.join(" · "), log.extras && "extra: " + esc(cut(log.extras, 70))].filter(Boolean).join(" · "), `food:${i.id}`));
    }
    if (acts.length || log.notes) {
      const A = { ok: "fatto", part: "in parte", no: "non fatto" };
      add(i.id, "notes", archItem("Note", "Attività e note", [acts.map(a => `${esc(a.name || "Attività")} ${A[a.status] || ""}`).join(" · "), log.notes && esc(cut(log.notes, 70))].filter(Boolean).join(" · "), `notes:${i.id}`));
    }
  }
  for (const p of state.photo)
    add(p.date, "food", archItem(p.text_only ? "Cibo (testo)" : "Foto del cibo", `${esc(p.time || "")} · ${p.status === "done" ? Math.round(p.kcal || 0) + " kcal" : "in attesa di analisi"}`, p.status === "done" ? esc(cut((p.items || []).map(i => `${i.food} ${Math.round(i.grams)} g`).join(", "), 80)) : esc(cut(p.note || "", 80)), `food:${p.date}`, `data-adel="photo:${p.id}"`));
  return days;
}
function renderArch() {
  $("a-filter").innerHTML = AF.map(([k, l]) => `<button data-f="${k}" aria-pressed="${k === archFilter}">${l}</button>`).join("");
  const diaryDays = state.intake.filter(i => { const l = intakeFor(i.id); return l.extras || l.notes || Object.values(l.meals).some(m => m && m.status) || Object.values(l.activities).some(a => a && a.status); }).length;
  $("a-tiles").innerHTML = [["Sedute", state.sessions.length], ["Corse", state.runs.length], ["Misure", state.body.length], ["Diario", diaryDays + " gg"]]
    .map(([k, v]) => `<div class="tile"><div class="k">${k}</div><div class="v">${v}</div></div>`).join("");
  const days = archEntries(), dates = Object.keys(days).sort().reverse();
  $("a-list").innerHTML = dates.length ? dates.slice(0, archDays).map(d => `<div class="card"><h3>${d === today() ? "Oggi" : longDate(d)}</h3><div class="list">${days[d].join("")}</div></div>`).join("")
    : `<div class="card"><p class="empty">${archFilter === "all" ? "Ancora niente da mostrare: quello che inserisci nell'app compare qui, giorno per giorno." : "Nessun dato di questo tipo."}</p></div>`;
  $("a-more").hidden = dates.length <= archDays;
}
$("a-filter").addEventListener("click", e => { const b = e.target.closest("button[data-f]"); if (!b) return; archFilter = b.dataset.f; archDays = 30; lsSet("olimpo-arch", archFilter); renderArch(); });
$("a-more").addEventListener("click", () => { archDays += 30; renderArch(); });
$("a-list").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.adel) { const [coll, id] = b.dataset.adel.split(/:(.+)/); armDelete(b, () => coll === "sessions" ? delSession(id) : coll === "runs" ? delRun(id) : del(coll, id)); return; }
  if (!b.dataset.aedit) return;
  const [kind, id] = b.dataset.aedit.split(/:(.+)/);
  if (kind === "gym") { const s = state.sessions.find(x => x.id === id); if (s) { switchTo(s.date, s.plan); showTab("work"); } }
  if (kind === "run") { showTab("run"); editRun(id); }
  if (kind === "body") { showTab("body"); editBody(id); }
  if (kind === "food") { showTab("food"); foodDate = id; renderFood(); }
  if (kind === "notes") { showTab("notes"); notesDate = id; renderNotes(); }
});
for (const id of ["w-arch", "n-arch"]) $(id).addEventListener("click", () => showTab("arch"));

/* ---------- coach: morning report of the coach agent (coll "coach", id = date) ---------- */
// The closed list of sources the coach may cite (the database refuses any other fonte_id).
const FONTI = {
  "ACSM-RT-2009": ["ACSM Position Stand · Progression Models in Resistance Training for Healthy Adults (2009)", "https://pubmed.ncbi.nlm.nih.gov/19204579/"],
  "ACSM-EX-2011": ["ACSM Position Stand · Quantity and Quality of Exercise (2011)", "https://pubmed.ncbi.nlm.nih.gov/21694556/"],
  "IOC-LOAD-2016": ["IOC consensus statement · Load in sport and risk of injury (2016)", "https://pubmed.ncbi.nlm.nih.gov/27535989/"],
  "WHO-PA-2020": ["OMS · Linee guida su attività fisica e sedentarietà (2020)", "https://www.who.int/publications/i/item/9789240015128"],
  "ISSN-PROT-2017": ["ISSN Position Stand · Protein and exercise (2017)", "https://pubmed.ncbi.nlm.nih.gov/28642676/"],
  "ISSN-TIMING-2017": ["ISSN Position Stand · Nutrient timing (2017)", "https://pubmed.ncbi.nlm.nih.gov/28919842/"],
  "ACSM-NUTR-2016": ["ACSM / AND / DC · Nutrition and Athletic Performance (2016)", "https://pubmed.ncbi.nlm.nih.gov/26891166/"],
  "DOD-BF-1984": ["Hodgdon & Beckett · U.S. Navy, NHRC report 84-11 (1984)", "https://apps.dtic.mil/sti/pdfs/ADA143890.pdf"],
  "nessuna": ["Nessuna fonte certificata: scelta prudente", ""]
};
const srcTag = id => { if (!id) return ""; const f = FONTI[id]; return `<span class="src">${f && f[1] ? `<a href="${f[1]}" target="_blank" rel="noopener">${esc(id)}</a>` : esc(id)}</span>`; };
const LVL = { riposo: "Riposo", leggero: "Leggero", moderato: "Moderato", intenso: "Intenso" };
const BODY_L = { weight: ["Peso", "kg"], waist: ["Vita", "cm"], neck: ["Collo", "cm"], shoulders: ["Spalle", "cm"], chestc: ["Petto", "cm"], arm: ["Braccio", "cm"], thighc: ["Coscia", "cm"], calf: ["Polpaccio", "cm"], massa_grassa_pct: ["Massa grassa", "%"] };
let coachDate = today();
function renderCoach() {
  const r = state.coach.find(x => x.id === coachDate);
  $("c-date").value = coachDate;
  $("c-datelbl").textContent = coachDate === today() ? "Oggi" : longDate(coachDate);
  if (!r) {
    $("c-headline").textContent = ""; $("c-today").textContent = "";
    $("c-body").innerHTML = `<div class="card"><p class="empty">${!state.coach.length ? "L'allenatore non è ancora attivo: parte dopo la configurazione del database (coach.sql). Da lì scrive il report ogni mattina verso le 5."
      : coachDate >= today() ? "Il report dell'allenatore arriva ogni mattina verso le 5 (alle 4 con l'ora solare)." : "Nessun report salvato per questo giorno."}</p></div>`;
    return;
  }
  $("c-headline").textContent = r.headline || "";
  $("c-today").innerHTML = `${r.livello_giorno ? `<span class="lvl ${esc(r.livello_giorno)}">${esc(LVL[r.livello_giorno] || r.livello_giorno)}</span> ` : ""}${esc(arr(r.oggi).join(" · ") || "Nessun allenamento oggi")}`;
  const obj = v => v && typeof v === "object" && !Array.isArray(v) ? v : {};
  const c = obj(r.carico), run = obj(r.corsa), body = obj(r.corpo), out = [];
  const av = arr(r.avvisi), mg = arr(r.miglioramenti), pg = arr(r.progressione), cs = arr(r.consigli), rq = arr(r.richieste_al_nutrizionista);
  if (av.length) out.push(`<div class="card prose adj"><h3>Avvisi</h3>${av.map(a => `<div class="warn-item ${esc(a.gravita || "")}">${esc(a.messaggio || "")} ${srcTag(a.fonte_id)}</div>`).join("")}</div>`);
  if (mg.length) out.push(`<div class="card prose"><h3>Come stai migliorando</h3><ul>${mg.map(m => `<li>${m.area ? `<b>${esc(m.area[0].toUpperCase() + m.area.slice(1))}</b> · ` : ""}${esc(m.testo || "")}</li>`).join("")}</ul></div>`);
  if (cs.length || rq.length) out.push(`<div class="card prose"><h3>Per oggi</h3><ul>${cs.map(x => `<li>${esc(x.testo || "")} ${srcTag(x.fonte_id)}</li>`).join("")}</ul>
    ${rq.length ? `<div class="small muted">Chiesto al nutrizionista</div><ul>${rq.map(x => `<li><b>${esc(x.esigenza || "")}</b>${x.motivo ? ` · ${esc(x.motivo)}` : ""} ${srcTag(x.fonte_id)}</li>`).join("")}</ul>` : ""}</div>`);
  if (pg.length) out.push(`<div class="card"><h3>Progressione in palestra</h3><div class="small muted">↑ = hai chiuso tutte le serie al massimo delle ripetizioni: si sale di carico.</div><div class="list coach-prog">${pg.map(p => `<div class="li"><div class="t"><b>${esc(p.esercizio || "")}</b><span>${esc(p.ultimo || "")}${p.obiettivo ? ` · obiettivo ${esc(p.obiettivo)}` : ""}</span></div><b${p.pronto ? ' class="ok"' : ""}>${p.pronto ? "↑ " : ""}${esc(p.proposta || "")}</b></div>`).join("")}</div></div>`);
  const sp = obj(r.sport), bp = sp.basket_partite, cc = sp.calcetto, ab = sp.allenamenti_basket_4sett;
  if (bp || cc || (ab && ab.totale)) out.push(`<div class="card"><h3>Basket e calcetto</h3><div class="list">
    ${bp ? `<div class="li"><div class="t"><b>Partite di basket · ${bp.partite}</b><span>Ultima ${ddmm(bp.ultima.date)}: ${bp.ultima.pts ?? "—"} punti in ${bp.ultima.min ?? "—"}'</span></div><b>${bp.media_pts != null ? fk(bp.media_pts) + " pt" : "—"}</b></div>` : ""}
    ${cc ? `<div class="li"><div class="t"><b>Calcetto · ${cc.partite}</b><span>Ultima ${ddmm(cc.ultima.date)}: ${cc.ultima.gol ?? 0} gol, ${cc.ultima.ast ?? 0} assist</span></div><b>${cc.media_gol != null ? fk(r1((cc.media_gol || 0) + (cc.media_ast || 0))) + " G+A" : "—"}</b></div>` : ""}
    ${ab && ab.totale ? `<div class="li"><div class="t"><b>Allenamenti basket · 4 settimane</b><span>${ab.semplice} semplici · ${ab.normale} normali · ${ab.duro} duri</span></div><b>${ab.totale}</b></div>` : ""}
  </div></div>`);
  const ratioOff = c.rapporto != null && c.rapporto > 1.3;
  out.push(`<div class="tiles four">${[
    ["Carico 7 gg", c.settimana ?? "—", "RPE × minuti", false],
    ["Media 4 sett.", c.media_4_sett ?? "—", "a settimana", false],
    ["Rapporto", c.rapporto != null ? fk(c.rapporto) : "—", c.dati_sufficienti ? "sicuro 0,8–1,3" : "servono 3 sett.", ratioOff],
    ["Giorni intensi", c.giorni_intensi_consecutivi ?? 0, "di fila", false]
  ].map(([k, v, d, off]) => `<div class="tile${off ? " off" : ""}"><div class="k">${k}</div><div class="v">${v}</div><div class="d">${d}</div></div>`).join("")}</div>`);
  if (arr(c.settimane).length) out.push(`<div class="card"><h3>Carico delle ultime 4 settimane</h3><div class="small muted">Fatica (1–10) × minuti di ogni seduta.${c.sedute_con_rpe_stimato ? ` ${c.sedute_con_rpe_stimato} ${c.sedute_con_rpe_stimato === 1 ? "seduta degli ultimi 7 giorni ha" : "sedute degli ultimi 7 giorni hanno"} la fatica stimata.` : ""}</div><div class="chart" id="c-weeks"></div></div>`);
  if (arr(run.km_settimane).some(w => w && w.km)) {
    const p = run.ritmo_ultimi_14, q = run.ritmo_14_prima;
    out.push(`<div class="card"><h3>Corsa · km a settimana</h3>${p ? `<div class="small muted">Facili e lunghi, ultimi 14 giorni: ${esc(p.ritmo)}/km${p.fc_media ? ` a ${p.fc_media} bpm` : ""}${q ? ` · 14 giorni prima: ${esc(q.ritmo)}/km${q.fc_media ? ` a ${q.fc_media} bpm` : ""}` : ""}</div>` : ""}<div class="chart" id="c-km"></div></div>`);
  }
  const bk = Object.keys(BODY_L).filter(k => body[k]);
  if (bk.length || body.spalle_su_vita || body.bia) out.push(`<div class="card"><h3>Corpo</h3><div class="list">${bk.map(k => { const b = body[k], d = r1(b.ora - b.prima);
      return `<div class="li"><div class="t"><b>${BODY_L[k][0]}</b><span>${b.dal && b.dal !== b.al ? `dal ${ddmm(b.dal)} al ${ddmm(b.al)}` : b.al ? `misura del ${ddmm(b.al)}` : ""}</span></div><b>${fk(b.ora)} ${BODY_L[k][1]}${b.dal !== b.al && d ? ` <span class="small muted">(${d > 0 ? "+" : ""}${fk(d)})</span>` : ""}</b></div>`; }).join("")}
    ${obj(body.bia).gamba_media_kg ? `<div class="li"><div class="t"><b>Gamba (InBody, massa magra)</b><span>${body.bia.dal !== body.bia.al ? `dal ${ddmm(body.bia.dal)} al ${ddmm(body.bia.al)}` : `misura del ${ddmm(body.bia.al)}`} · braccio ${fk(body.bia.braccio_medio_kg || 0)} kg</span></div><b>${fk(body.bia.gamba_media_kg.ora)} kg</b></div>` : ""}
    ${body.spalle_su_vita ? `<div class="li"><div class="t"><b>Spalle ÷ vita</b><span>obiettivo ${fk(body.spalle_su_vita.obiettivo)}</span></div><b>${fk(body.spalle_su_vita.ora)}</b></div>` : ""}</div></div>`);
  if (arr(r.prossimi_7).length) out.push(`<div class="card"><h3>Prossimi 7 giorni</h3><div class="list">${arr(r.prossimi_7).map(d => `<div class="li"><div class="t"><b>${d.date === today() ? "Oggi" : longDate(d.date)}</b><span>${esc(arr(d.eventi).join(" · ") || "—")}</span></div><span class="lvl ${esc(d.livello || "")}">${esc(LVL[d.livello] || d.livello || "")}</span></div>`).join("")}</div></div>`);
  if (r.motivazione) out.push(`<div class="card prose"><h3>Il punto dell'allenatore</h3><p>${esc(r.motivazione)}</p></div>`);
  const used = [...new Set([...arr(r.fonti), ...av, ...cs, ...rq].map(x => typeof x === "string" ? x : x.fonte_id).filter(Boolean))];
  if (used.length) out.push(`<details class="card how"><summary>Fonti usate oggi</summary><ul class="prose" style="margin-top:8px">${used.map(id => { const f = FONTI[id];
      return `<li>${f && f[1] ? `<a href="${f[1]}" target="_blank" rel="noopener">${esc(f[0])}</a>` : esc(f ? f[0] : id)}</li>`; }).join("")}</ul></details>`);
  $("c-body").innerHTML = out.join("");
  if ($("c-weeks")) chart($("c-weeks"), c.settimane.map(w => ({ d: w.dal, x: ts(w.dal), y: w.carico || 0, tip: `dal ${ddmm(w.dal)} al ${ddmm(w.al)}` })), { bar: true, unit: "", fmt: v => String(Math.round(v)), label: "Carico", empty: "" });
  if ($("c-km")) chart($("c-km"), run.km_settimane.map(w => ({ d: w.dal, x: ts(w.dal), y: w.km || 0, tip: `settimana dal ${ddmm(w.dal)}` })), { bar: true, unit: "km", fmt: v => fk(r1(v)), label: "Km a settimana", empty: "" });
}
$("c-prev").addEventListener("click", () => { coachDate = shiftDate(coachDate, -1); renderCoach(); });
$("c-next").addEventListener("click", () => { coachDate = shiftDate(coachDate, 1); renderCoach(); });
$("c-date").addEventListener("change", e => { if (e.target.value) { coachDate = e.target.value; renderCoach(); } });

/* ---------- tabs ---------- */
const TITLES = { work: "Diario Olimpo", run: "Corsa", food: "Cibo", coach: "Coach", prog: "Progressi", body: "Corpo", plan: "Scheda", notes: "Note", arch: "Archivio" };
function showTab(t) {
  const tabs = [...document.querySelectorAll(".tabbar button")];
  const key = t === "plan" ? "work" : t === "arch" ? "notes" : t;   // the full plan lives under Palestra, the archive under Note
  for (const b of tabs) b.setAttribute("aria-selected", b.dataset.tab === key);
  document.querySelector(".tabbar .in").style.setProperty("--i", Math.max(0, tabs.findIndex(b => b.dataset.tab === key)));
  for (const id of Object.keys(TITLES)) $("v-" + id).hidden = id !== t;
  $("h-title").textContent = TITLES[t];
  if (t === "work") renderHeader(); else $("h-eyebrow").textContent = { plan: "Giovedì e sabato", food: "Piano del giorno", notes: "Com'è andata", run: "Verso Roma · 14 marzo", body: "Misure e massa grassa", prog: "Scheda A + B", arch: "Tutto quello che hai inserito", coach: "Il tuo allenatore" }[t] || "";
  document.querySelector(".hdr").classList.toggle("compact", t !== "work");
  if (t === "prog") renderProg(); if (t === "body") renderBody();
  if (t === "food") { foodDate = today(); renderFood(); }
  if (t === "notes") { notesDate = today(); renderNotes(); }
  if (t === "run") renderRun();
  // An edit left half-way (run or measurement) is cancelled when leaving its section, so it can't overwrite another one later.
  if (t !== "run" && runEditId) { resetRunForm(); $("r-msg").textContent = "Modifica annullata."; $("r-msg").className = "savemsg"; }
  if (t !== "body" && bodyEditId) { bodyEditId = null; for (const k in BODY_F) $(BODY_F[k]).value = ""; for (const k in BIA_F) $(BIA_F[k]).value = ""; $("b-date").value = today(); $("b-msg").textContent = ""; }
  if (t === "arch") { archDays = 30; renderArch(); }
  if (t === "coach") { coachDate = today(); renderCoach(); }
  window.scrollTo(0, 0);
}
document.querySelector(".tabbar").addEventListener("click", e => { const b = e.target.closest("button"); if (b) showTab(b.dataset.tab); });
// Pause the background aurora while scrolling (see body.scrolling in style.css).
let scrollT; window.addEventListener("scroll", () => {
  document.body.classList.add("scrolling"); clearTimeout(scrollT);
  scrollT = setTimeout(() => document.body.classList.remove("scrolling"), 250);
}, { passive: true });
let rz; window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(() => { renderProg(); renderBody(); }, 150); });

/* ---------- boot ---------- */
const sv = lsGet("olimpo-draft", null);
if (sv && sv.date === today() && (sv.plan === "A" || sv.plan === "B") && sv.sets && planOf(sv.plan, sv.date).ex.every(e => sv.sets[e.id])) { draft = sv; dirty = true; }
else draft = buildDraft(today(), defaultPlan(today()));
renderWork(); renderProg(); renderBody();
renderToday();
showTab(isGymDay(today()) ? "work" : "food");   // open on what matters today
initStore();
