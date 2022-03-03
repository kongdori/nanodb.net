module.exports = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        domains: [
            'cdn.cloudflare.steamstatic.com',
            'cdn.akamai.steamstatic.com'
        ]
    },
    experimental: {
        scrollRestoration: true
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/games/',
                permanent: true
            }
        ];
    }
};
