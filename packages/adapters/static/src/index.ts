import path from "path";
import { fileURLToPath } from "url";
import type { Adapter, Route, AdapterConfig } from "@marko/run/vite";

import { Pool } from "undici";
import createCrawler from "./crawler";
import fs from "fs/promises";
import { getAvailablePort, spawnServer, loadEnv } from "@marko/run/vite";
import baseAdapter from "@marko/run/adapter";
import createStaticServe from "serve-static";
import { createServer } from "http";
import type { AddressInfo } from "net";
import type { Fetch } from "@marko/run/*";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export interface Options {
  urls?: string[] | ((routes: Route[]) => string[] | Promise<string[]>);
}

function noop() {}

export default function staticAdapter(options: Options = {}): Adapter {
  const { startDev } = baseAdapter();
  let adapterConfig: AdapterConfig = {};
  return {
    name: "static-adapter",
    
    configure(config) {
      adapterConfig = config;
    },

    async pluginOptions() {
      return {
        trailingSlashes: "RedirectWith",
      };
    },

    async getEntryFile() {
      return path.join(__dirname, "default-entry");
    },

    startDev,

    async startPreview(dir, _entry, port, envFile) {
      envFile && (await loadEnv(envFile));

      const staticServe = createStaticServe(dir, {
        index: "index.html",
      });
      const server = await createServer((req, res) =>
        staticServe(req, res, noop)
      );

      return new Promise((resolve) => {
        const listener = server.listen(port, () => {
          const address = listener.address() as AddressInfo;
          console.log(
            `Preview server started: http://localhost:${address.port}`
          );
          resolve();
        });
      });
    },

    async buildEnd(_config, routes, builtEntries, sourceEntries) {
      const { envFile } = adapterConfig;

      const pathsToVisit: string[] = [];
      for (const route of routes) {
        if (!route.params?.length) {
          pathsToVisit.push(route.path);
        }
      }
      if (typeof options.urls === "function") {
        pathsToVisit.push(...(await options.urls(routes)));
      } else if (options.urls) {
        pathsToVisit.push(...options.urls);
      }

      const defaultEntry = await this.getEntryFile!();

      if (sourceEntries[0] === defaultEntry) {
        envFile && await loadEnv(envFile);
        const fetch: Fetch = (await import(builtEntries[0])).fetch;
        const crawler = createCrawler(
          async (request) => {
            const response = await fetch(request, {});
            return response || new Response(null, { status: 404 });
          },
          {}
        );
        await crawler.crawl(pathsToVisit);
      } else {
        const port = await getAvailablePort();
        const origin = `http://localhost:${port}`;
        const client = new Pool(origin);

        const server = await spawnServer(`node ${builtEntries[0]}`, port, envFile);
        const crawler = createCrawler(
          async (request) => {
            const url = new URL(request.url, origin);
            const headers: Record<string, string> = {};
            request.headers.forEach((value, key) => {
              headers[key] = value;
            });
            const responseData = await client.request({
              path: url.pathname + url.search,
              method: request.method as any,
              signal: request.signal,
              headers,
            });
            return new Response(responseData.body as any, {
              status: responseData.statusCode,
              headers: responseData.headers as Record<string, string>,
            });
          },
          {
            origin,
          }
        );

        try {
          await crawler.crawl(pathsToVisit);
        } finally {
          await client.close();
          server.close();
        }
      }

      for (const file of builtEntries) {
        await fs.rm(file, { maxRetries: 5 }).catch(() => {});
      }
    },

    typeInfo() {
      return '{}';
    },
  };
}
