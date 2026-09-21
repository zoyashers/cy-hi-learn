export function saveToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("access_token", token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return (
      localStorage.getItem("token") ||
      localStorage.getItem("access_token")
    );
  }

  return null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }
}