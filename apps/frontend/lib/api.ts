export async function apiGet(path: string) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
}

export async function apiPost(path: string, body: any = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
}
