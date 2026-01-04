export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    sitemap: 'https://goods.thuid.net/sitemap.xml',
  };
};