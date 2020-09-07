export const config = {
  environment: {
    port: process.env.PORT || 3000,
    dev: process.env.NODE_ENV !== 'production',
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || '',
  },
};
