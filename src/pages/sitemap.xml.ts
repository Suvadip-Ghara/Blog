import { generateSitemap } from '../lib/generateSitemap';

export async function GET() {
	try {
		const baseUrl = import.meta.env.VITE_BASE_URL || 'https://your-domain.com';
		const sitemap = await generateSitemap(baseUrl);

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
}