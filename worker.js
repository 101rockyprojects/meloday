/**
 * Minimal Cloudflare Worker to serve static assets uploaded via Wrangler `[assets]`.
 * - Serves files from the `ASSETS` binding.
 * - Falls back to `/index.html` for SPA-style client routing.
 */

export default {
	async fetch(request, env, ctx) {
		// First try: serve the asset as-is (including 404.html if configured).
		let response = await env.ASSETS.fetch(request);

		// SPA fallback: if the asset wasn't found, return the app shell.
		if (response.status === 404) {
			const url = new URL(request.url);
			// Keep original query params (e.g. `?v=...`), but return the app shell.
			url.pathname = '/index.html';
			response = await env.ASSETS.fetch(new Request(url.toString(), request));
		}

		return response;
	}
};
