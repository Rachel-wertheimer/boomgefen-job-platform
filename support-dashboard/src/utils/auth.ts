interface TokenPayload {
  id?: number;
  userId?: number;
  name?: string;
  userName?: string;
  role?: "USER" | "MANAGER";
  email?: string;
}

export function getUserFromToken(): { name?: string; role?: string } | null {
  const token = sessionStorage.getItem("token");
  if (!token) return null;
  try {
    const payload: TokenPayload = JSON.parse(atob(token.split(".")[1]));
    return {
      name: payload.name || payload.userName || "",
      role: payload.role || "",
    };
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

export function isAdmin(token: string): boolean {
  try {
    const payload: TokenPayload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "MANAGER";
  } catch {
    return false;
  }
}
