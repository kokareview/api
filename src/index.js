export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const cors = {
      "Access-Control-Allow-Origin": "https://letmeow.tech",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (path === "/" || path === "") {
      return Response.json({ 
        name: "LetMeow API", 
        status: "online",
        version: "0.1.0" 
      }, { headers: cors });
    }
    if (path === "/version") {
      return Response.json({
        version: "0.1.0",
        download_url: "https://api.letmeow.tech/download/letmeow-win.exe",
        changelog: "Initial release"
      }, { headers: cors });
    }
    if (path.startsWith("/download/")) {
      const file = path.replace("/download/", "");
      return Response.redirect(`https://github.com/letmeowllc/letmeow-browser/releases/latest/download/${file}`, 302);
    }
    if (path === "/health") {
      return Response.json({ status: "ok", time: new Date().toISOString() }, { headers: cors });
    }
    return Response.json({ error: "Not found" }, { status: 404, headers: cors });
  },
};
