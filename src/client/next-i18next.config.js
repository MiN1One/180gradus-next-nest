const { join } = require('path');
const locales = require('../../locales');

const isDevelopment = process.env.NODE_ENV === 'development';

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: locales,
  saveMissing: isDevelopment,
  defaultNS: 'common',
  localePath: isDevelopment 
    ? 'public/locales' 
    : join(__dirname, '../../public/locales'),
}