import { supabase } from './supabase';

interface SitemapUrl {
	loc: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

export async function generateSitemap(baseUrl: string): Promise<string> {
	const urls: SitemapUrl[] = [
		{ loc: baseUrl, changefreq: 'daily', priority: 1.0 },
		{ loc: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.8 },
		{ loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: 0.8 },
	];

	// Fetch all published posts
	const { data: posts } = await supabase
		.from('posts')
		.select('slug, updated_at')
		.eq('published', true);

	if (posts) {
		posts.forEach((post) => {
			urls.push({
				loc: `${baseUrl}/post/${post.slug}`,
				lastmod: post.updated_at,
				changefreq: 'weekly',
				priority: 0.9,
			});
		});
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	${urls.map((url) => `
	<url>
		<loc>${url.loc}</loc>
		${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
		${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
		${url.priority ? `<priority>${url.priority}</priority>` : ''}
	</url>`).join('')}
</urlset>`;

	return sitemap;
}