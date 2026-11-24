# Deployment

## Build

Use the Node major recorded in `.nvmrc` (24). From the repository root, install
the locked dependencies and build the production output:

```sh
npm ci
npm run build
```

Run `npm run typecheck` and `npm run lint` before the build in CI or a manual
release check.

## Environment variables

The repository's [.env.example](../.env.example) lists the expected environment
variable names and placeholders. Copy that file to a local ignored environment
file when a variable is needed, and configure the same variable names in the
deployment platform. Do not place real values in `.env.example` or source
control. The application currently uses typed mock data, so future backend
variables are not required for the current build.

## Pull request previews

Each pull request can run the same install, typecheck, lint and build steps,
then publish the build as a preview. The preview is intended to be read-only:
forms remain local placeholders and no backend service is required. Preview
configuration should use placeholder-safe environment values.

## Hosting shape

The Next.js build can be hosted on either a Node-capable platform or a static
deployment workflow if the deployed routes remain compatible with the static
output. This document does not select or recommend a provider. The release
process must support serving the Next.js build and serving the generated
`robots.txt` and `sitemap.xml` routes.

## Rollback

Redeploy the previous known-good build artifact or revert the merge commit and
run the normal build again. Confirm the same Node major and environment variable
names during rollback.
