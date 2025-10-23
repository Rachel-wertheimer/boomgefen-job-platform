// utils/auth.ts
export function getUserFromToken(): { name?: string; role?: string } | null {
    const token = sessionStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // פענוח ה-JWT
      return {
        name: payload.name || payload.email || "", // תלוי איך את מייצרת את ה-JWT
        role: payload.role || "",
      };
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  }
  