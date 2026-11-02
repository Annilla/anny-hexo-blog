## Purpose

Preserve published Hexo articles and useful blog features in the parallel static Nuxt website. Preserve article URLs while using new routes and current-year dates for the migrated Portfolio and Resume brand pages. Make migration completeness, article URL compatibility and service-independent search verifiable before production changes.

## ADDED Requirements

### Requirement: Traceable one-way content migration
The migration SHALL inventory all source Markdown and referenced assets, classify every item, and record sourcePath, sourceHash, kind, legacyUrls, targetUrl, assets, published and exclusionReason. Every excluded item MUST have a reason. Every published item MUST map to accessible static content. Portfolio.md SHALL map to /projects/ and Resume.md SHALL map to /about/. For these two brand pages, legacyUrls records source-route provenance only and MUST NOT cause a Nuxt alias, redirect or generated legacy page. Hexo SHALL remain the authoritative source until local acceptance; import MUST NOT write back to Hexo.

#### Scenario: Import mixed source content
- **WHEN** import encounters articles, Portfolio, Resume and unpublished material
- **THEN** every source receives a manifest entry and published material receives a verified destination
- **AND** project and about classification follows owner confirmation rather than automatic filename assumptions

### Requirement: Explicit migration failures and synchronization
Import and validation MUST report source changes, unsupported syntax, invalid metadata, missing local assets and duplicate destinations. Unresolved errors MUST produce a nonzero exit code and block acceptance. Repeated import SHALL be deterministic for unchanged sources. Import MUST NOT silently overwrite manual destination edits or silently delete content when a source disappears.

#### Scenario: Source changes after import
- **WHEN** a source file is added, modified or deleted after the last import
- **THEN** content checking identifies each affected path and blocks acceptance until the change is reconciled

#### Scenario: Manual content conflicts with source
- **WHEN** a destination contains manual edits that conflict with a subsequent import
- **THEN** import reports the conflicting path and fails without overwriting those edits

### Requirement: Published article URL and asset compatibility
The site SHALL preserve existing public article URLs and usable article navigation entry points using generated static pages. URL mapping MUST be based on the actual Hexo route baseline and publication settings, including future dates, timezone and slug behavior. Local asset paths MUST preserve exact case and encoding. Article compatibility MUST NOT depend on server-side redirects. This requirement does not preserve the former dated Portfolio or Resume page URLs; those pages use /projects/ and /about/ as specified separately.

#### Scenario: Preserve an unusual article publication date
- **WHEN** the source route baseline includes a published article with a future year
- **THEN** its article URL remains accessible without silently changing its year to the current year

#### Scenario: Validate a referenced local image
- **WHEN** a published page references a local image with a missing file or mismatched filename case
- **THEN** validation reports the page and image path and blocks acceptance

### Requirement: New routes for migrated brand pages
Portfolio.md content SHALL be available at /projects/ and Resume.md content SHALL be available at /about/. The Nuxt static output MUST NOT generate the former Hexo routes /3017/12/01/Portfolio/ or /3017/12/03/Resume/, aliases, or redirects. The legacy source routes SHALL appear only as provenance in the migration manifest and MUST NOT be generated as content routes. The new routes SHALL be the canonical and sitemap routes for these pages. On every Nuxt static generation, the date year in each generated brand-page copy MUST be the current calendar year at generation time, preserving the source month and day. This date transformation MUST NOT modify the source Markdown or Hexo output, and MUST NOT affect article dates or routes.

#### Scenario: Generate migrated brand pages
- **WHEN** the Nuxt site is generated with Portfolio.md and Resume.md as sources
- **THEN** the portfolio content is accessible at /projects/ and the resume content is accessible at /about/
- **AND** neither former dated route is generated or redirected
- **AND** the sitemap and canonical metadata use only the new routes for these pages

#### Scenario: Set brand-page dates to the current year
- **WHEN** Nuxt generates the brand pages with the system date fixed to 2026-11-02
- **THEN** the generated Portfolio and Resume date metadata use 2026 while preserving source month and day
- **AND** the source files retain their original dates and their hashes remain unchanged
- **AND** published article dates and URLs are unchanged

##### Example: Update only the generated brand-page year
- **GIVEN** source dates 3017/12/01 for Portfolio.md and 3017/12/03 for Resume.md
- **WHEN** static generation runs with the system date fixed to 2026-11-02
- **THEN** the generated dates are 2026/12/01 and 2026/12/03
- **AND** both source dates remain unchanged

### Requirement: Static blog discovery and pagination
The site SHALL provide article listings, category and tag listings, archives and pagination as prerendered routes. Listings SHALL order articles by publication date descending, breaking ties by URL ascending, with ten entries per page. Empty views SHALL show an explicit empty state. Navigation SHALL reach all published articles without duplicate or missing pagination entries.

#### Scenario: Paginate a filtered listing
- **WHEN** a category contains eleven published articles
- **THEN** its first page contains ten entries and its second page contains the remaining entry in the specified order
- **AND** both page URLs support direct navigation and refresh

#### Scenario: View an empty selection
- **WHEN** a supported listing has no matching published entries
- **THEN** it shows an explicit empty state without an application error

### Requirement: RSS and sitemap
The static output SHALL include an Atom feed at /atom.xml and a sitemap containing canonical public routes. Feed entries SHALL reference published articles using the configured canonical site URL. Drafts and duplicate compatibility pages MUST NOT appear as canonical sitemap entries.

#### Scenario: Generate feeds and sitemap
- **WHEN** the site is generated from published and unpublished content
- **THEN** /atom.xml and the sitemap are valid static XML documents with public canonical URLs
- **AND** unpublished content is absent from both outputs

### Requirement: Free static content search
Search SHALL query a locally generated index covering public article and project bodies, without a paid service, runtime backend or private API key. Index generation SHALL follow static page generation, and failure to generate the index MUST fail the generation command. The search interface SHALL expose loading, matching results, no results and index-loading failure states.

#### Scenario: Search Chinese content in static preview
- **WHEN** a reader searches a known Chinese phrase from a published article in the generated static preview
- **THEN** results contain that article with a directly accessible link

#### Scenario: Search yields no match
- **WHEN** a query matches no indexed public article or project
- **THEN** search shows an explicit no-results state rather than stale results

#### Scenario: Search index cannot load
- **WHEN** the browser cannot load the generated search index
- **THEN** search displays a visible error rather than reporting an empty successful result