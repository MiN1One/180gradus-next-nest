import slugify from "slugify"

declare global {
  interface String {
    handleize: () => string;
  }
}

String.prototype.handleize = function(locale?: string) {
  return slugify(this, {
    lower: true,
    trim: true,
    replacement: '-',
    locale
  });
}