import { FastifyRequest } from "fastify";

declare global {
  interface FastifyRequestWithParams extends FastifyRequest {
    params: FastifyRequest['params'] & {
      locale?: string;
    }
  }
}