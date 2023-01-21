const dotenv = require('dotenv');
const path = require('path');

if (process.env.NODE_ENV !== 'build') {
  dotenv.config({
    path: path.join(__dirname, '..', '..', '.env')
  });
}

const locales = require('../../locales');

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '../../dist/.next',
  reactStrictMode: true,
  excludeDefaultMomentLocales: true,
  experimental: {
    externalDir: true,
  },
  i18n: locales,
  env: {
    SERVER_HOST: 
      process.env.NODE_ENV !== 'production' 
        ? `http://localhost:${process.env.PORT}` 
        : process.env.HOST,
  },
}