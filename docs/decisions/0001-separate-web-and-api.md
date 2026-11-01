# ADR 0001: Separate web and API applications

- Status: Accepted
- Date: 2026-10-31

## Context

I want to build the full shopping experience while deepening both modern React and Python API skills. A single Next.js application would reduce setup, but it would also combine interface delivery and commerce rules in one runtime.

## Decision

I will use Next.js for the storefront and FastAPI for the REST API. Both applications live in one repository and can be developed or deployed independently.

## Consequences

- API boundaries and environment configuration must be explicit.
- Local development needs CORS configuration and service orchestration.
- Frontend and backend quality checks can run independently.
- The repository carries more setup than a single-framework application.
