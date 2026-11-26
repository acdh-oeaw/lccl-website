# language - culture - cognition lab (LCCL) website

website for the language - culture - cognition lab.

## how to run

prerequisites:

- [node.js 26.x](https://nodejs.org/en/download)
- [pnpm 12.x](https://pnpm.io/installation)

> [!TIP]
>
> you can use `pnpm` to install the required node.js version with `pnpm env use 26 --global`

set required environment variables in `.env.local`:

```bash
cp .env.local.example .env.local
```

adjust environment variables in `.github/workflows/validate.yml` and
`.github/workflows/build-deploy.yml`.

the default template accepts the following variables:

- `PUBLIC_REDMINE_ID` (required): service issue for this application in the acdh-ch
  [redmine](https://redmine.acdh.oeaw.ac.at) issue tracker.
- `PUBLIC_APP_BASE_URL` (required): the base url for this application. the default of
  "http://localhost:3000" should be fine for local development.
- `PUBLIC_APP_BASE_PATH` (optional): set this when deploying to a path other than "/".
- `PUBLIC_BOTS` (required): whether this website can be indexed by web crawlers like the google bot.
  supported values are "disabled" and "enabled", defaults to "disabled".
- `PUBLIC_MATOMO_BASE_URL` and `PUBLIC_MATOMO_ID` (optional): set these to support client-side
  analytics with matomo.
- `PUBLIC_GOOGLE_SITE_VERIFICATION` (optional): set this to verify site ownership for google search
  console.
- `ENV_VALIDATION` (optional): whether environment variables should be validated. supported values
  are "disabled", "enabled" and "public" (only validate public variables, which can be useful in a
  docker build context to avoid having to pass secrets to `docker build`), defaults to "enabled".

when adding new environment variables, don't forget to add them to `.env.local.example` as well.

install dependencies:

```bash
pnpm install
```

run a development server on <http://localhost:3000>:

```bash
pnpm run dev
```

> [!TIP]
>
> this template supports developing in containers. when opening the project in your editor, you
> should be prompted to re-open it in a devcontainer.

## how to edit content

use the admin ui at when developing locally <http://localhost:3000/admin> (this will save changes to
the filesystem), or at `<PUBLIC_URL>/admin` (this will commit changes to the github repository).

## how to deploy

- ask a sysadmin to create a new acdh-ch kubernetes project.
- create a new namespace in that project via [rancher](https://rancher.acdh-dev.oeaw.ac.at), and set
  the `KUBE_NAMESPACE` github variable to that namespace.
- adjust the [`app_name`](./.github/workflows/build-deploy.yml#L36), which will be the name of the
  deployment in the above namespace.
- set the `PUBLIC_URL` github variable to the application's public url (e.g.
  "https://my-app.acdh-ch-dev.oeaw.ac.at"), and set the `KUBE_INGRESS_BASE_DOMAIN` to the public
  url's base domain (e.g. "acdh-ch-dev.oeaw.ac.at"). `PUBLIC_URL` should match
  `PUBLIC_APP_BASE_URL`.
- if you haven't yet, create a service issue in the acdh-ch
  [redmine](https://redmine.acdh.oeaw.ac.at) issue tracker, and set the `SERVICE_ID` github variable
  to the issue number. this should match the `PUBLIC_REDMINE_ID` variable in your `.env.local` file.
- ensure required build args (prefixed with `PUBLIC_`) are referenced in both the
  [`Dockerfile`](./Dockerfile), as well as the [validation](./.github/workflows/validate.yml) and
  [deployment](./.github/workflows/build-deploy.yml) pipelines, and set as github variables.
- ensure required runtime environment variables are referenced in the
  [validation](./.github/workflows/validate.yml) and
  [deployment](./.github/workflows/build-deploy.yml) pipelines, and set as github secrets. github
  secrets need to be prefixed with `K8S_SECRET_` to be automatically copied to the runtime
  environment. in case you need secrets in the docker build context, you can
  [mount a secret in the Dockerfile](https://docs.docker.com/build/building/secrets/).
- ensure both the github repository, as well as the
  [package registry](https://github.com/orgs/acdh-oeaw/packages/container/my-app/settings) is set to
  public.

if everything is set up correctly, every git push to the `main` branch will create a new deployment
if the validation pipeline passes.

you can reference the [template repository](https://github.com/acdh-oeaw/template-website-astro) for
a working setup.

The Docker image runs the Astro Node adapter as an unprivileged user on port 3000. Public pages and
responsive WebP images are generated at build time; Keystatic, its API, and `/api/health` remain
server routes. A static Caddy image cannot serve the CMS.

Set `PUBLIC_KEYSTATIC_MODE=github`, the repository owner/name, and GitHub app slug as deployment
variables. Provide `K8S_SECRET_KEYSTATIC_GITHUB_CLIENT_ID`,
`K8S_SECRET_KEYSTATIC_GITHUB_CLIENT_SECRET`, and `K8S_SECRET_KEYSTATIC_SECRET` as GitHub secrets;
the deployment workflow passes them to the build via secret mounts and to the running application.
Configure the GitHub app callback URL as `<PUBLIC_URL>/api/keystatic/github/oauth/callback`. The
reverse proxy must forward the public host and HTTPS protocol; Astro trusts the host specified by
`PUBLIC_APP_BASE_URL` for Keystatic OAuth redirects.

[Deployment values](./.github/auto-deploy-values.yaml) configure ingress and health probes on
`/api/health`. Dependency layers and Astro image transforms use BuildKit caches.

## checks

```bash
pnpm run format:check
pnpm run lint:check
pnpm run styles:check
pnpm run types:check
pnpm run build
pnpm run test:e2e
```

TypeScript stays on version 6 while `@astrojs/check` requires TypeScript below version 7.
