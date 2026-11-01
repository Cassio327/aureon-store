# Aureon Store

> A full-stack formalwear e-commerce experience built around a clean shopping journey, dependable inventory rules, and secure payments.

[![CI](https://github.com/Cassio327/aureon-store/actions/workflows/ci.yml/badge.svg)](https://github.com/Cassio327/aureon-store/actions/workflows/ci.yml)

![Aureon storefront homepage](docs/design/aureon-storefront.png)

> Aureon is a fictional product study. It does not sell goods or accept real payments.

## About the project

I started Aureon Store to explore what it takes to build a modern commerce product from end to end. The product direction combines an editorial storefront with a dedicated API, relational data, inventory-aware product variants, order management, and a secure checkout flow.

The store is designed as a fictional formalwear brand. That gives me room to work on both the visual language of the shopping experience and the engineering decisions behind a reliable e-commerce system.

## Current status

The foundation milestone is complete. I now have a tested storefront, a versioned API foundation, a containerized local stack, and automated quality checks to support the commerce features that follow.

### Implemented

- Responsive editorial homepage built with Next.js and semantic HTML
- Honest milestone pages for collection, about, account, and cart navigation
- FastAPI application factory, typed settings, CORS, and a versioned health endpoint
- Component and API contract tests
- Docker Compose stack for the storefront, API, and PostgreSQL 17
- Independent frontend and backend checks with GitHub Actions

### Roadmap

- Formalwear catalog with categories, search, filters, and sorting
- Product variants with size, color, SKU, price, and stock
- Customer accounts and role-based administration
- Persistent guest and customer carts
- Order lifecycle with server-side total validation
- Stripe Checkout Sessions and signed, idempotent webhooks
- Admin workflows for catalog, inventory, and orders
- Public demo deployment

## Architecture

Aureon Store uses a monorepo with two independently deployable applications:

- `frontend/`: Next.js, React, TypeScript, and Tailwind CSS
- `backend/`: FastAPI and Pydantic
- PostgreSQL is provisioned for the upcoming persistence layer
- Stripe Checkout is planned to keep payment details outside the application

See the [system overview](docs/architecture/system-overview.md) for boundaries and planned data flow.

## Technology stack

| Area | Technologies |
| --- | --- |
| Web | Next.js 16, React 19, TypeScript, Tailwind CSS |
| API | Python 3.12, FastAPI, Pydantic |
| Data | PostgreSQL 17; SQLAlchemy and Alembic planned |
| Payments | Stripe Checkout Sessions and webhooks planned |
| Quality | pytest, Vitest, Testing Library, Ruff, ESLint |
| Delivery | Docker Compose, GitHub Actions |

## Local development

### Docker Compose

Docker Engine with the Compose plugin is the only requirement for the complete local stack.

```bash
cp .env.example .env
docker compose up --build
```

Compose waits for PostgreSQL and the API health check before starting dependent services. The database is stored in the named `postgres_data` volume, so its data survives normal container restarts.

| Service | URL |
| --- | --- |
| Storefront | `http://localhost:3000` |
| API | `http://localhost:8000` |
| API documentation | `http://localhost:8000/docs` |
| API health | `http://localhost:8000/api/v1/health` |
| PostgreSQL | `localhost:5432` |

Stop the stack without deleting its database volume:

```bash
docker compose down
```

Configuration starts from `.env.example`. Local secrets belong in `.env`, which is excluded from Git.

## Project structure

```text
.
├── backend/                  # FastAPI application and tests
├── frontend/                 # Next.js application and tests
├── docs/
│   ├── architecture/         # System boundaries and data flow
│   ├── decisions/            # Architecture decisions
│   ├── design/               # Storefront direction and visual system
│   └── product/              # Product scope and constraints
├── .github/workflows/        # Continuous integration
├── compose.yaml              # Local service orchestration
└── README.md
```

## Quality checks

The backend checks require Python 3.12 and [uv](https://docs.astral.sh/uv/):

```bash
cd backend
uv sync --extra dev
uv run pytest -q
uv run ruff check .
```

The frontend checks require Node.js 24 and npm:

```bash
cd frontend
npm ci
npm test -- --run
npm run lint
npm run typecheck
npm run build
```

The same checks run independently in GitHub Actions on every push and pull request.

Container validation runs in CI and can also be reproduced locally:

```bash
docker compose config --quiet
docker compose build
```

## Design principles

- The server owns pricing, stock validation, and order state.
- Payment completion comes from verified Stripe webhook events.
- Secrets stay outside source control.
- Accessibility and responsive behavior are part of the interface from the first screen.
- Documentation evolves with the code.

## License

No open-source license has been selected yet.
