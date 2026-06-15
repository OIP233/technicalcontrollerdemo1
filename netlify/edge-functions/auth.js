// netlify/edge-functions/auth.js
export default async (request, context) => {
  const PASSWORD = "Live20Scenario26!";
  const auth = request.headers.get("authorization") || "";
  if (auth.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6)); // "gebruiker:wachtwoord"
      const pass = decoded.slice(decoded.indexOf(":") + 1);
      if (pass === PASSWORD) return context.next();
    } catch (e) { /* ongeldige header → val door naar 401 */ }
  }
  return new Response("Authenticatie vereist", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Live Scenario Demo"' },
  });
};

export const config = { path: "/*" };
