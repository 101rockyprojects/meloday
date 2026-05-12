import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		alias: {
			'@App': 'src',
			$lib: 'src/lib',
			$components: 'src/lib/components',
			$data: 'src/lib/data',
			$functions: 'src/lib/functions',
			$stores: 'src/lib/stores'
		}
	}
};

export default config;
