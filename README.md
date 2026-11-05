# SteelQuota Monitor

A responsive dashboard prototype for tracking steel safeguard tariff-rate quotas (TRQs) in the European Union and United Kingdom.

## Current status

This is a **front-end preview**, not a live quota tracker. The figures and quota periods in `app.js` are illustrative examples and must not be used for customs, purchasing, or import decisions. The dashboard labels them as preview data, and the refresh action updates only a preview timestamp; it does not fetch government data.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required. Google Fonts are loaded remotely; system fallbacks are provided.

## Official sources

- EU: [European Commission TARIC quota consultation](https://ec.europa.eu/taxation_customs/dds2/taric/quota_consultation.jsp?Lang=en)
- UK: [UK Trade Tariff quotas](https://www.trade-tariff.service.gov.uk/quotas)

## To make the tracker live

1. Confirm the authoritative downloadable/API feeds and their update cadence for each jurisdiction.
2. Implement server-side ingestion so the UI does not rely on brittle browser scraping or cross-origin workarounds.
3. Normalize quota order numbers, product categories/CN codes, origins, quota periods, units, and remaining balances; EU and UK quota lines are not necessarily interchangeable.
4. Store source timestamps and retrieval times, validate feed changes, and expose stale/error states.
5. Replace the illustrative dataset with the normalized feed and test it against the official portals.

Until those integrations and checks are complete, do not describe the figures as live or verified.
