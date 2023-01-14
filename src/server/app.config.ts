import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  port: process.env.PORT ?? 5000,
  isDevelopment: process.env.NODE_ENV === 'development',
  staticFilesDir: process.env.STATIC_FILES_DIR,
  staticFilesPathPrefix: process.env.STATIC_FILES_PATH_PREFIX,
  isBuild: (process.env.NODE_ENV as any) === 'build',
}));