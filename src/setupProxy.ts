import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '/api', // URL basis yang akan digunakan untuk meneruskan permintaan
    createProxyMiddleware({
      target: 'https://api.yelp.com/v3', // URL sumber daya API Yelp
      changeOrigin: true, // Izinkan perubahan asal untuk CORS
      headers: {
        'Authorization': 'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx', // Gantilah YOUR_ACCESS_TOKEN dengan token akses Anda
      },
      pathRewrite: {
        '^/api': '/businesses/search', // Atur ulang path sesuai dengan endpoint yang Anda inginkan
      },
    })
  );
};
