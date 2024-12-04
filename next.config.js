require("dotenv").config();

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // This applies to all pages
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com https://www.googleapis.com https://vercel.live;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://vercel.live https://www.googleapis.com https://firestore.googleapis.com https://firebase.googleapis.com https://identitytoolkit.googleapis.com ${process.env.NEXT_PUBLIC_PROXY_URL};
              img-src 'self' data:;
            `.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim(), // Normalize spaces and line breaks
          },
        ],
      },
    ];
  },
  env: {
    NEXT_PUBLIC_PROXY_URL: process.env.NEXT_PUBLIC_PROXY_URL,
    API_URL: process.env.API_URL,
  },
};
