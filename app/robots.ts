import type { MetadataRoute } from 'next';

const baseUrl =
  'https://playmoveimprove-regulator-champions.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/portal',
        '/portal/',
        '/member-access',
        '/playbooks',
        '/playbooks/',
        '/month-2-ease',
        '/month-2-ease/',
        '/nqs-mapping',
        '/nqs-mapping/',
        '/learning-journey',
        '/learning-journey/',
        '/educator-confidence',
        '/educator-confidence/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}