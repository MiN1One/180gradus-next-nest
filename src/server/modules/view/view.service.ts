import { Injectable, Logger } from '@nestjs/common';
import { NextServer, RequestHandler } from 'next/dist/server/next';
import { FastifyReply, FastifyRequest } from "fastify";
import { parse, UrlWithParsedQuery } from 'url';
import * as locales from '../../../../locales';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

interface IParsedQueryWithNextQuery extends UrlWithParsedQuery {
  query: UrlWithParsedQuery['query'] & NextParsedUrlQuery;
}

@Injectable()
export class ViewService {
  nextServer: NextServer;
  nextHandler: RequestHandler;

  async setNextServer(server: NextServer, prepare?: boolean) {
    try {
      this.nextServer = server;

      if (prepare) {
        await this.nextServer.prepare();
      }
    } catch (er) {
      Logger.error(er, 'ViewService:setNextServer');
    }
  }

  getNextQuery(req: FastifyRequestWithParams) {
    const { params: { locale }, url } = req;
    const parsedUrl: IParsedQueryWithNextQuery = parse(url, true);
    let pathname = parsedUrl.path.toLowerCase();
    if (locale) {
      pathname = pathname.replace(locale.toLowerCase(), '');
    }
    parsedUrl.pathname = pathname;
    parsedUrl.query = {
      ...parsedUrl.query,
      __nextLocale: locale || locales.defaultLocale,
      __nextDefaultLocale: locales.defaultLocale,
    };
    return parsedUrl;
  }

  async renderPage(req: FastifyRequest, res: FastifyReply) {
    const parsedUrl = this.getNextQuery(req);
    try {
      return this.nextServer.render(
        req.raw, 
        res.raw,
        parsedUrl.pathname,
        parsedUrl.query,
        parsedUrl
      )
    } catch (er) {
      Logger.error(er, 'ViewService:renderPage');
      return this.nextServer.renderError(
        er, 
        req.raw, 
        res.raw,
        parsedUrl.pathname,
        parsedUrl.query
      );
    }
  }

  setNextHandler() {
    this.nextHandler = this.nextServer.getRequestHandler();
  }

  getHandler(req: FastifyRequest, res: FastifyReply) {
    return this.nextHandler(req.raw, res.raw);
  }
}