export function getUserFromToken(): { name?: string; role?: string } | null {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      name: payload.name || payload.email || "",
      role: payload.role || "",
    };
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
