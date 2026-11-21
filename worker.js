const CANONICAL = "pwy.ai";

// Pages that were removed in the reset. Old links land on home instead of a 404.
const GONE_TO_HOME = new Set(["/writing", "/writing/", "/writing/index.html"]);

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const insecure = url.protocol === "http:";
    url.protocol = "https:";
    url.port = "";

    // Every other host (patrickyoung.ai, www.*), and plain http → same path on https://pwy.ai.
    if (url.hostname !== CANONICAL || insecure) {
      url.hostname = CANONICAL;
      return Response.redirect(url.toString(), 301);
    }

    if (GONE_TO_HOME.has(url.pathname)) {
      return Response.redirect(`https://${CANONICAL}/`, 301);
    }

    // /babu.html → /babu, permanently.
    if (url.pathname.endsWith(".html")) {
      url.pathname = url.pathname === "/index.html" ? "/" : url.pathname.slice(0, -5);
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
