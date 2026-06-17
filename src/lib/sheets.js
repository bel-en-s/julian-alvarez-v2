const API_KEY = process.env.NEXT_PUBLIC_SHEETS_API_KEY;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEETS_ID;
const RANGE = "Hoja 1!A2:E";

export async function fetchNextMatch() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  const rows = data.values;
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
