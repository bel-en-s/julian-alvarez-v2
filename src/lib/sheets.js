const API_KEY = process.env.NEXT_PUBLIC_SHEETS_API_KEY;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEETS_ID;

async function fetchSheet(range) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.values || null;
}

export async function fetchNextMatch() {
  const rows = await fetchSheet("Hoja 1!A2:E");
  if (!rows?.length) return null;

  const now = Date.now();
  const upcoming = rows
    .map((r) => ({
      kickoff: r[0] || "",
      home: r[1] || "",
      away: r[2] || "",
      competition: r[3] || "",
      extra: r[4] || "",
    }))
    .filter((m) => new Date(m.kickoff).getTime() > now)
    .sort((a, b) => new Date(a.kickoff) - new Date(b.kickoff));

  return upcoming[0] || null;
}

export async function fetchPartidos() {
  const rows = await fetchSheet("Partidos!A2:I");
  if (!rows?.length) return [];

  return rows.map((r, i) => ({
    n: i + 1,
    fecha: r[0] || "",
    fixture: r[1] || "",
    rival: r[2] || "",
    lugar: r[3] || "",
    fotos: [r[4], r[5], r[6], r[7], r[8]].filter(Boolean),
  }));
}
