module.exports = [
  // ...
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'cofitbucket.s3.ap-southeast-1.amazonaws.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'cofitbucket.s3.ap-southeast-1.amazonaws.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // ...
];
