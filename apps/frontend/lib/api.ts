import { getToken } from "./auth";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

async function apiRequest(
  path: string,
  options: RequestInit = {}
) {
  const token = getToken();

  const headers = new Headers(
    options.headers || {}
  );

  headers.set(
    "Content-Type",
    "application/json"
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const res = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      headers,
    }
  );

  if (!res.ok) {
    let detail = `API request failed: ${res.status}`;

    try {
      const data = await res.json();

      if (typeof data?.detail === "string") {
        detail = data.detail;
      }
    } catch {
      // Response was not JSON.
    }

    const error = new Error(detail) as Error & {
      status?: number;
    };

    error.status = res.status;

    throw error;
  }

  return res.json();
}

export async function apiGet(
  path: string
) {
  return apiRequest(path, {
    method: "GET",
  });
}

export async function apiPost(
  path: string,
  body: unknown = {}
) {
  return apiRequest(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function apiPut(
  path: string,
  body: unknown = {}
) {
  return apiRequest(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function apiDelete(
  path: string
) {
  return apiRequest(path, {
    method: "DELETE",
  });
}
