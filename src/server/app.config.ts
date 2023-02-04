import { registerAs } from '@nestjs/config';
import { getExirationDate } from '@shared/utils/date.utils';

export default registerAs('appConfig', () => ({
  port: process.env.PORT ?? 5000,
  isDevelopment: process.env.NODE_ENV === 'development',
  staticFilesDir: process.env.STATIC_FILES_DIR,
  staticFilesPathPrefix: process.env.STATIC_FILES_PATH_PREFIX,
  isBuild: (process.env.NODE_ENV as any) === 'build',
  dbConnection: process.env.DB_CONNECTION,
  filesSaveDir: process.env.FILES_SAVE_DIR,
  cookieSecret: process.env.COOKIE_SECRET,
  cookieExpiresIn: getExirationDate({
    minutes: parseInt(process.env.COOKIE_EXPIRES_IN) ?? 10
  }),
  imagesSaveSubpath: process.env.IMAGES_SAVE_SUBPATH,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));