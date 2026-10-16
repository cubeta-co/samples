# Cubeta samples

Small apps that Cubeta builds and deploys to check framework support. Each
directory is one app: point an application's `appRoot` at it. The apps are
the frameworks' own starter templates (October 2026), with lockfiles, plus a
few hand-written ones for the failure checks.

## Static sites

Railpack builds them and Caddy serves the files.

| `appRoot` | App | Settings |
| --- | --- | --- |
| `static/vite-react` | Vite + React | — |
| `static/cra` | Create React App (`react-scripts` 5) | — |
| `static/angular` | Angular | — |
| `static/astro` | Astro, static output | — |
| `static/next-export` | Next.js with `output: "export"` | — |
| `static/html` | Plain HTML | — |
| `static/vite-preview` | Vite + React whose `start` script is `vite preview` | `outputDirectory: dist` |
| `static/docusaurus` | Docusaurus (its `start` script is a dev server) | `outputDirectory: build` |

## Server-rendered apps

| `appRoot` | App | Notes |
| --- | --- | --- |
| `ssr/next` | Next.js | |
| `ssr/nuxt` | Nuxt | |
| `ssr/sveltekit-node` | SvelteKit with `@sveltejs/adapter-node` | `start`: `node build` |
| `ssr/react-router` | React Router (framework mode) | The template's Dockerfile is removed so that Railpack builds it |
| `ssr/astro-node` | Astro with `@astrojs/node` in standalone mode | `start`: `node ./dist/server/entry.mjs`; listens on `HOST` |
| `ssr/tanstack-start` | TanStack Start | |

## Expected failures

| `appRoot` | App | Expected error |
| --- | --- | --- |
| `fail/sveltekit-auto` | SvelteKit with the template's `adapter-auto`, no start script | Deployment: `APP_CRASHED`. Railpack 0.40.1 forces adapter-node and starts `node build`, which SvelteKit 3 does not produce this way |
| `fail/no-start` | A Node package with neither a start script nor an entry file | Build: `START_COMMAND_NOT_FOUND` |
| `fail/nginx` | The official `nginx` image (Dockerfile) | Deployment: `APP_CRASHED`, hinting `nginxinc/nginx-unprivileged` |
| `fail/crash` | Exits with code 3 | Deployment: `APP_CRASHED` with the exit code |
| `fail/localhost` | Listens on 127.0.0.1 only | Deployment: `APP_NOT_LISTENING` |
| `fail/memory-hog` | Allocates memory until stopped | Deployment: `APP_OUT_OF_MEMORY` |

## Private network

| `appRoot` | App |
| --- | --- |
| `network/api` | Answers `pong` |
| `network/client` | Calls `API_URL` on each request and answers `reached: pong`, or `unreachable: <error>` |

Deploy both with the same `networkGroup` and `API_URL` set to the API's
`internalUrl`: the client reaches it. With another group, or none, it does
not.
