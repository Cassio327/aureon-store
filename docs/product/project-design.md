# Aureon Store — Project Design

## Intent

Aureon Store is a full-stack e-commerce application I am building for a fictional formalwear brand. I chose this project to explore how a modern commerce product connects a polished frontend, a reliable backend, relational data, inventory rules, and a secure payment workflow. All user-facing and developer-facing project content will be written in English.

## Goals

- Deliver a polished, responsive storefront for formal clothing.
- Support product variants such as size and color, with inventory tracked per variant.
- Demonstrate a complete shopping journey: browse, search/filter, add to cart, checkout, and view order status.
- Provide account registration and login, plus an admin area for managing products and orders.
- Use a real relational database, automated tests, containerized local development, CI, and clear documentation.
- Integrate Stripe Checkout in test mode and process signed webhooks to update payment/order state.
- Keep a transparent, meaningful Git history that reflects actual development work.

## Non-goals

- Taking real payments or operating a production retail business.
- Storing card details in Aureon Store.
- Building multi-vendor, subscription, warehouse, or shipping-carrier integrations.

## Product vision and success

I want Aureon Store to feel like a cohesive product rather than a collection of disconnected features. A successful version should let visitors complete the full shopping journey, give administrators practical control over the catalog and orders, and remain straightforward for other developers to understand and run locally. The architecture, automated checks, and documentation should make the project easy to explore and maintain.

## Selected approach

Use a separate frontend and backend:

- Frontend: Next.js with TypeScript, responsive storefront and admin UI.
- Backend: Python FastAPI REST API, SQLAlchemy, and Alembic migrations.
- Database: PostgreSQL.
- Payments: Stripe Checkout Sessions in test mode; signed webhook handling is the source of truth for payment completion.
- Local environment: Docker Compose, with environment variables documented in `.env.example` and secrets excluded from Git.
- Quality: unit/integration tests and GitHub Actions CI.

I selected this approach because I want to work across the complete application while deepening my experience with Python APIs and modern React development. A Next.js-only implementation would be smaller but would not give me the same opportunity to design a dedicated Python API. Django REST Framework would provide a useful admin foundation but would leave less of the administration workflow for me to design and implement.

## Product scope

### Storefront

- Home page introducing the fictional formalwear brand and featured collections.
- Product listing with search, category filters, sorting, and pagination.
- Product detail pages with product images, descriptions, prices, size/color selection, and available stock.
- Persistent cart with quantity changes, variant validation, and subtotal.
- Checkout that creates an order on the backend before redirecting to Stripe Checkout.
- Order confirmation/status view.

### Accounts and administration

- Customer registration, login, and account order history.
- Role-based authorization for customer and administrator actions.
- Admin product and variant CRUD, inventory updates, and order status management.
- Audit-friendly timestamps and server-side validation for sensitive state changes.

### Initial data

Seed a small, clearly fictional catalog of formalwear products. Product copy and images must be suitable for a public demonstration and must not imply that Aureon is currently operating as a real business.

## Core data model

- User: email, password hash, role, timestamps.
- Product: slug, name, description, category, active flag, timestamps.
- ProductVariant: product, size, color, SKU, price, stock quantity.
- Cart: user or anonymous session identifier, items, timestamps.
- Order: customer/contact snapshot, currency, totals, payment state, fulfillment state, timestamps.
- OrderItem: product/variant snapshot, quantity, unit price.
- Payment: provider, provider session identifier, status, event identifiers for idempotency.

Prices are represented as integer minor units (for example, cents) to avoid floating-point currency errors. The server recalculates all totals and validates stock; client-submitted prices are never trusted.

## Security and payment boundaries

- Hash passwords using a modern password hashing algorithm; never store plaintext passwords.
- Validate permissions on the backend for all protected routes.
- Keep Stripe secret keys and webhook secrets in environment variables.
- Do not collect or store card numbers.
- Verify Stripe webhook signatures and process events idempotently.
- Treat browser redirects as display flow only; confirm payment from verified webhook events.
- Document that payment credentials and sample catalog data are for local/test use.

## Documentation and repository organization

- Root `README.md`: project overview, feature list, screenshots, architecture, quick start, configuration, tests, and roadmap.
- `docs/architecture/`: system overview, API boundaries, and data model.
- `docs/decisions/`: short architecture decision records for choices with meaningful tradeoffs.
- `docs/product/`: product scope and constraints.
- `backend/`: FastAPI application, migrations, and backend tests.
- `frontend/`: Next.js application and frontend tests.
- `.github/workflows/`: CI checks.

## Constraints and assumptions

- Repository name: `aureon-store`.
- The GitHub repository is public so the implementation and architecture can be explored.
- Project language, UI copy, documentation, API naming, and commit messages are English.
- Stripe integration remains in test mode unless a separate production-readiness scope is explicitly agreed.
- Deployment provider is not selected yet; local Docker-based reproducibility is the first milestone.

## Open implementation choices

- Whether cart persistence should support both guest sessions and signed-in users in the first commerce milestone.
- Deployment target after the local application is complete.
