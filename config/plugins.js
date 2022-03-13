module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: 'AKIAQRQUM6HEJY6AUE2Y',
      secretAccessKey: '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',
      region: 'ap-southeast-1',
      params: {
        Bucket: 'cofitbucket',
      },
    },
  },
});
