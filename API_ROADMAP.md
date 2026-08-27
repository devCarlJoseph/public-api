# Public API Roadmap

## 1. Project goal

Build a public, read-first API that lets other developers retrieve useful data with normal HTTP requests. Start with two focused API products:

- **Recipes API** — recipes, ingredients, categories, cuisines, nutrition, preparation steps, and images.
- **Phones for Sale API** — phone brands, models, specifications, prices, images, retailers/listings, and availability.

Design both products behind a consistent API style so a developer can use them easily from JavaScript, mobile apps, websites, or backend services.

> Start small: launch the Recipes API first, validate the API design and hosting, then add the Phones API with the same shared infrastructure.

---

## 2. Confirmed technology stack

This project will use the following stack. The roadmap and folder structure below are based on these choices.

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js | REST API and documentation website |
| Language | TypeScript | Application code |
| API style | REST API | Let external apps consume the data |
| Database | PostgreSQL | Store recipes, phones, products, API keys, and metadata |
| Database hosting | Neon | Hosted serverless PostgreSQL database |
| ORM | Prisma Next (`@prisma/orm-postgres`) | Type-safe database queries and database setup |
| Schema language | Prisma Schema Language (PSL) | Define data models in `prisma/contract.prisma` |
| Validation | Zod | Validate route parameters, query strings, and request bodies |
| Authentication | API keys | Identify and authorize API consumers |
| Rate limiting | Upstash Redis | Limit excessive requests by key and IP address |
| Documentation | Next.js + MDX/Markdown | Publish API guides and reference pages |
| Testing | Vitest | Unit and integration tests |
| Version control | Git + GitHub | Source control, review, and automated checks |
| Deployment | Vercel | Deploy the Next.js API and documentation site |

---

## 3. Milestone roadmap

### Phase 0 — Define the first release

**Goal:** make the first version small enough to finish and useful enough to publish.

1. Choose a public API name and production domain, for example `api.example.com`.
2. Require API keys for public API requests; a small, separately rate-limited demo endpoint is optional.
3. Write down the first supported resources and fields.
4. Pick the license for the data and confirm that every imported dataset and image may be redistributed.
5. Create a public documentation page that includes examples, limits, and contact details.

**Recipes API v1 scope**

- List and search recipes.
- Get one recipe by ID or slug.
- Filter by category, cuisine, ingredient, diet, and cooking time.
- Return recipe instructions, ingredients, servings, image URL, and optional nutrition data.

**Phones API v1 scope**

- List brands and phone models.
- Get one model by ID or slug.
- Filter by brand, price range, RAM, storage, 5G support, and release year.
- Return core technical specifications and a current/last-known price with its currency and source date.

### Phase 1 — Set up the application foundation

**Goal:** establish a maintainable Next.js and TypeScript API service.

1. Keep API handlers under `app/api/v1/`.
2. Use TypeScript throughout the app.
3. Configure Next.js for the API and an MDX/Markdown documentation site.
4. Add environment variables for Neon/PostgreSQL, API-key hashing, Upstash Redis, storage service, and site URL. Never commit real values.
5. Add a health endpoint: `GET /api/health`.
6. Add a consistent JSON error format and request IDs for debugging.
7. Add request logging and error monitoring before accepting outside users.

### Phase 2 — Model and collect the data

**Goal:** create dependable data that the API can serve quickly.

1. Create a Neon PostgreSQL project and set its connection strings in local, preview, and production environment variables.
2. Define PostgreSQL models in Prisma Schema Language (PSL), in `prisma/contract.prisma`.
3. After each contract change, run `npm run contract:emit` to regenerate `prisma/contract.json` and `prisma/contract.d.ts`. Use Prisma Next's documented database workflow rather than assuming standard Prisma migration commands.
4. Add a repeatable seed/import script—not manual production edits.
5. Store images in object storage/CDN; save only their URLs and attribution in PostgreSQL.
6. Track data source, license, import date, and last-updated date for every imported record.
7. Add an editorial/admin process for corrections and removals.

Suggested core entities:

```text
Recipe domain
  recipes
  ingredients
  recipe_ingredients
  categories
  cuisines
  diets
  recipe_images

Phone domain
  phone_brands
  phone_models
  phone_specifications
  phone_images
  phone_prices
  retailers
```

### Phase 3 — Build the public API

**Goal:** ship predictable and discoverable endpoints.

1. Version every public URL from day one: `/api/v1/...`.
2. Validate every query parameter, route parameter, and request body with Zod schemas.
3. Paginate every list endpoint. Use a consistent `page`, `limit`, and `meta` response shape.
4. Support filtering, sorting, and search only where there is an indexed data field.
5. Return stable IDs and human-readable slugs.
6. Add database indexes for common filters, search fields, and foreign keys.

Initial endpoint map:

| Area | Endpoint | Purpose |
| --- | --- | --- |
| Service | `GET /api/health` | Health check for hosts and users |
| Recipes | `GET /api/v1/recipes` | List, search, filter, and paginate recipes |
| Recipes | `GET /api/v1/recipes/:slug` | Retrieve one recipe |
| Recipes | `GET /api/v1/categories` | List recipe categories |
| Recipes | `GET /api/v1/ingredients` | Search ingredients |
| Phones | `GET /api/v1/phones` | List, search, filter, and paginate phone models |
| Phones | `GET /api/v1/phones/:slug` | Retrieve one phone model |
| Phones | `GET /api/v1/brands` | List phone brands |
| Phones | `GET /api/v1/phones/:slug/prices` | Retrieve dated price entries |

Recommended response envelope:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "nextPage": null
  }
}
```

Recommended error envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The 'limit' query parameter must be between 1 and 100.",
    "requestId": "req_..."
  }
}
```

### Phase 4 — Protect and operate the API

**Goal:** make the service safe to expose to other users with API keys and Upstash Redis.

1. Issue API keys and store only their hashes in Neon PostgreSQL.
2. Require the key through `Authorization: Bearer <api-key>` or a documented `X-API-Key` header.
3. Use Upstash Redis to apply rate limits per API key and IP address. Start with a small free limit such as 60 requests/minute and adjust after measurement.
4. Add CORS rules for browser users. Avoid allowing every origin if the API is not intended for it.
5. Prevent abusive search queries: validate lengths, cap result size, and use database parameterization through the ORM/query layer.
6. Cache popular public `GET` responses using Vercel CDN cache headers where suitable.
7. Configure and test Neon backup/recovery options.
8. Monitor Vercel deployment health, latency, error rate, Upstash rate-limit denials, and Neon database usage.

### Phase 5 — Test, document, and launch

**Goal:** make integration easy for outside developers.

1. Use Vitest to test route handlers, Zod validation, API-key authentication, Upstash rate limits, and pagination.
2. Add Vitest integration tests against a separate Neon test database or a local PostgreSQL database.
3. Generate or maintain an OpenAPI specification at `openapi.yaml`.
4. Publish API reference documentation, guides, and copyable request examples with Next.js MDX/Markdown pages.
5. Push work to GitHub and run tests in GitHub Actions before merging to the main branch.
6. Connect the GitHub repository to Vercel; use preview deployments for pull requests and a production deployment for the main branch.
7. Configure Vercel environment variables separately for development, preview, and production.
8. Announce a clear stability policy: for example, v1 will not have breaking changes without a new version.
9. Add a changelog and a status page or health status endpoint.

---

## 4. Recommended Next.js structure

This is the target structure for development through production. It keeps your existing root `app/` App Router and **Prisma Next** setup: `prisma/contract.prisma` is the data contract, and `prisma/db.ts` is the typed database client. Add the Recipes API first, then Phones and Products after the shared API patterns are stable.

```text
my-public-api/
│
├── app/
│   │
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts                        # GET /api/health
│   │   └── v1/
│   │       │
│   │       ├── recipes/
│   │       │   ├── route.ts
│   │       │   └── [slug]/
│   │       │       └── route.ts
│   │       │
│   │       ├── phones/
│   │       │   ├── route.ts
│   │       │   └── [slug]/
│   │       │       └── route.ts
│   │       │
│   │       ├── products/
│   │       │   ├── route.ts
│   │       │   └── [slug]/
│   │       │       └── route.ts
│   │       │
│   │       ├── categories/
│   │       │   └── route.ts
│   │       │
│   │       └── search/
│   │           └── route.ts
│   │
│   ├── docs/
│   │   ├── page.tsx
│   │   ├── recipes/
│   │   │   └── page.tsx
│   │   ├── phones/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   └── page.tsx
│   │   ├── authentication/
│   │   │   └── page.tsx
│   │   ├── rate-limits/
│   │   │   └── page.tsx
│   │   └── errors/
│   │       └── page.tsx
│   │
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
│
├── prisma/                                     # Existing Prisma Next files
│   ├── contract.prisma                         # Define data models in PSL
│   ├── contract.json                           # Generated contract; commit it
│   ├── contract.d.ts                           # Generated TypeScript types; commit it
│   └── db.ts                                   # Typed Neon/PostgreSQL client
│
│
├── lib/
│   ├── auth.ts
│   ├── env.ts
│   ├── rate-limit.ts
│   ├── response.ts
│   └── utils.ts
│
│
├── services/
│   ├── recipe.service.ts
│   ├── phone.service.ts
│   ├── product.service.ts
│   ├── category.service.ts
│   └── search.service.ts
│
│
├── validators/
│   ├── recipe.ts
│   ├── phone.ts
│   ├── product.ts
│   ├── category.ts
│   └── query.ts                                # Shared pagination and search validation
│
│
├── types/
│   ├── api.ts
│   ├── recipe.ts
│   ├── phone.ts
│   ├── product.ts
│   └── category.ts
│
│
├── tests/
│   ├── health.test.ts
│   ├── auth.test.ts
│   ├── rate-limit.test.ts
│   ├── recipes/
│   │   ├── recipes.test.ts
│   │   └── recipe-slug.test.ts
│   │
│   ├── phones/
│   │   └── phones.test.ts
│   │
│   └── products/
│       └── products.test.ts
│
│
├── docs/
│   ├── getting-started.mdx
│   ├── recipes.mdx
│   ├── phones.mdx
│   ├── products.mdx
│   ├── authentication.mdx
│   ├── rate-limits.mdx
│   ├── errors.mdx
│   ├── openapi.yaml
│   └── data-sources.md
│
│
├── .env
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── test.yml                            # Runs Vitest on pull requests
├── scripts/
│   ├── import-recipes.ts
│   ├── import-phones.ts
│   └── import-products.ts
├── API_ROADMAP.md
├── eslint.config.mjs
├── package.json
├── prisma.config.ts
├── prisma-next.md
├── next.config.ts
├── next-env.d.ts
├── postcss.config.mjs
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

### What belongs where

- `app/api/.../route.ts`: HTTP concerns only—read request data, validate it, query through `prisma/db.ts`, and return the standard response.
- `prisma/contract.prisma`: the Prisma Next data contract. Edit models here, then run `npm run contract:emit` to update the generated contract files.
- `prisma/db.ts`: the existing typed PostgreSQL client. Import it with `@/prisma/db` from route handlers and server-side helpers.
- `services/`: API business logic and database calls for each resource. Route handlers should stay thin by delegating work here.
- `validators/`: Zod schemas for route parameters, query strings, and request bodies.
- `types/`: shared TypeScript response and resource types.
- `lib/`: shared server-only infrastructure for API keys, Upstash, environment variables, response helpers, and common utilities.
- `app/docs/`: Next.js pages that render the documentation website.
- `docs/`: MDX content, OpenAPI contract, and data-source/legal notes for the documentation website.
- `tests/`: Vitest coverage for health checks, authentication, rate limiting, and every public resource.
- `scripts/`: repeatable data imports and maintenance jobs.
- `.github/workflows/`: automated Vitest checks run by GitHub Actions.

---

## 5. Build order checklist

Use this order to avoid building features on an unstable base:

- [ ] Decide the first API product: Recipes.
- [ ] Define the Recipe data fields and legal data sources.
- [ ] Create a Neon PostgreSQL database, configure Prisma Next/PSL, initialize the database schema, and add a small seed dataset.
- [ ] Build `GET /api/health`.
- [ ] Build and test `GET /api/v1/recipes` with Zod validation and pagination.
- [ ] Build and test `GET /api/v1/recipes/:slug` with Vitest.
- [ ] Add filtering/search and database indexes.
- [ ] Add API-key authentication and Upstash Redis rate limiting.
- [ ] Add MDX documentation, OpenAPI reference, and sample requests.
- [ ] Set up GitHub Actions to run Vitest.
- [ ] Deploy Vercel preview, then production, with separate environment variables.
- [ ] Monitor real usage before adding the Phones API.
- [ ] Reuse the same patterns for brands, phone models, specifications, and prices.

---

## 6. Four-week path to a Vercel deployment

This is a realistic first-release plan if you can work around 10–15 focused hours each week. Build the **Recipes API only** during this period; adding the Phones API before launch will slow down the first release.

### Week 1 — Foundation and data design

**Outcome:** a Next.js project is connected to Neon and can serve a small, legal recipe dataset.

1. Create the GitHub repository, connect it to Vercel, and enable a preview deployment. It can still be a simple landing page at this point.
2. Create a Neon PostgreSQL project and add its connection string as `DATABASE_URL` in your local environment. Do not put the real value in `.env.example`.
3. Install and configure Prisma, Zod, Vitest, and the packages needed for MDX documentation. Add a safe `.env.example` with variable names only.
4. Design the first PSL models in `prisma/contract.prisma`: `Recipe`, `Ingredient`, `RecipeIngredient`, `Category`, `Cuisine`, `Diet`, and `ApiKey`.
5. Run `npm run contract:emit`, initialize the database using the Prisma Next workflow, and add a seed/import script with 20–50 recipe records. Use only data and images you may legally redistribute.
6. Create `GET /api/health` and make it verify that the application and database are reachable.
7. Decide the v1 response and error formats, pagination rules, supported filters, rate-limit policy, and API-key header. Record them in the MDX docs.

**Week 1 done when:** `GET /api/health` works locally, Prisma can read seed recipes from Neon, and the project has a Vercel preview deployment.

### Week 2 — Core recipe endpoints

**Outcome:** developers can list and retrieve recipes through a versioned REST API.

1. Create reusable Zod schemas for list query parameters (`page`, `limit`, `search`, `category`, `cuisine`, `diet`, and `maxCookTime`) and route parameters (`slug`).
2. Build `GET /api/v1/recipes` with pagination, a maximum limit of 100, and only the filters backed by database indexes.
3. Build `GET /api/v1/recipes/:slug` with ingredients, instructions, servings, and source/attribution metadata.
4. Add `GET /api/v1/categories`, `GET /api/v1/cuisines`, and `GET /api/v1/ingredients` only after the two recipe endpoints work well.
5. Add consistent success/error response helpers and request IDs.
6. Add Vitest unit tests for Zod schemas and response helpers, then integration tests for the two recipe endpoints.
7. Write MDX documentation pages with real request and response examples for every finished endpoint.

**Week 2 done when:** the endpoint tests pass, invalid requests get clear errors, and an outside user can search and retrieve a seeded recipe from the Vercel preview URL.

### Week 3 — Public access controls and quality

**Outcome:** the API is safe for early public users.

1. Create API-key generation, hashing, storage, verification, revocation, and a simple way for you to create test keys. Never store a raw API key after displaying it once.
2. Require `Authorization: Bearer <api-key>` on the v1 recipe endpoints; leave `/api/health` public.
3. Create an Upstash Redis database and add rate limiting by API key and IP address. Return a clear `429 Too Many Requests` response and relevant rate-limit headers.
4. Start with one free plan such as 60 requests/minute and 10,000 requests/month. Treat these as initial values to adjust after measuring real usage.
5. Add CORS, query-length limits, and caching headers for safe public `GET` requests.
6. Expand Vitest coverage to authentication, no/invalid keys, expired/revoked keys, rate-limit responses, pagination boundaries, and missing slugs.
7. Add GitHub Actions so every pull request runs the Vitest suite.

**Week 3 done when:** a valid key works, an invalid key fails safely, a rate-limited request returns `429`, and the GitHub test workflow is green.

### Week 4 — Documentation, production checks, and Vercel release

**Outcome:** a documented and monitored public v1 API is deployed to Vercel.

1. Finish the Next.js MDX documentation site: introduction, authentication, rate limits, errors, recipes, changelog, data sources, and contact/reporting instructions.
2. Write or update `docs/openapi.yaml` so it matches the live v1 endpoints and examples.
3. Check every data source, image, licence, attribution requirement, and phone-price disclaimer before making the API public.
4. Set Vercel environment variables for **Preview** and **Production**. At minimum: `DATABASE_URL`, `API_KEY_PEPPER`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and the public application URL. Do not expose server-only secrets with a `NEXT_PUBLIC_` prefix.
5. Apply the Prisma Next database initialization/update workflow to the production Neon database, then import only the intended production sample data.
6. Test the production URL from a clean client: health check, valid key, invalid key, pagination, empty results, rate limiting, documentation links, and CORS behavior.
7. Enable Vercel deployment/error monitoring and check Neon and Upstash usage dashboards. Add an uptime monitor for `GET /api/health` if available.
8. Tag the release in GitHub, publish a short v1 changelog, and share the documentation URL with early users.

**Week 4 done when:** the production Vercel URL serves the documented API, tests pass, secrets are configured, monitoring is enabled, and at least one person outside the project can successfully integrate using the docs.

### Production deployment checklist

- [ ] GitHub `main` branch is passing the Vitest workflow.
- [ ] Vercel production project is connected to the intended GitHub repository/branch.
- [ ] Neon production database contains the current initialized Prisma Next schema and approved data.
- [ ] Upstash production credentials are set in Vercel.
- [ ] API keys are hashed, and raw keys are never logged or committed.
- [ ] `GET /api/health` responds successfully on the production URL.
- [ ] Recipe list, recipe detail, validation errors, `401`, and `429` responses have been tested on production.
- [ ] Documentation and OpenAPI specification agree with the deployed endpoints.
- [ ] Data-source attribution, licence notices, and contact details are visible.

---

## 7. Important product decisions before launch

1. **Data rights:** do not scrape or republish recipes, images, product photos, or prices without permission and a valid license. Keep attribution and source metadata.
2. **Price freshness:** phone prices change quickly. Every price needs a currency, retailer/source, date checked, and a clear statement that it may be outdated.
3. **Versioning:** do not rename/remove response fields in v1 once developers use them. Add new optional fields instead, or introduce v2 for breaking changes.
4. **Reliability:** a smaller API with accurate, well-documented data is more valuable than many incomplete endpoints.
5. **Costs:** cache popular GET requests and set rate limits early so a free public tier cannot exhaust the database or image-hosting budget.

## 8. Definition of a successful first launch

The first launch is ready when an outside developer can get an API key, read the docs, make a recipe request, understand every response/error, stay within a clear rate limit, and receive reliable results from a monitored production URL.
