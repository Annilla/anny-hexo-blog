## Purpose

Provide a locally reviewable Nuxt personal brand website alongside the existing Hexo site. Preserve production behavior until the owner separately authorizes deployment.

## ADDED Requirements

### Requirement: Isolated local application

The Nuxt application SHALL reside in nuxt-site with independent dependencies, lockfile, commands and output. Local development, import, type checking, generation and preview MUST NOT modify Hexo content, themes, root dependency manifests or deployment settings, or publish anything remotely.

#### Scenario: Generate the new site without affecting Hexo

- **WHEN** the operator installs child-project dependencies and generates the Nuxt site
- **THEN** the existing Hexo sources and dependency manifests remain unchanged and no deployment occurs
- **AND** the generated output resides within the child project

### Requirement: Official package preference and dependency approval

Implementation SHALL prefer Nuxt built-in capabilities and packages maintained by the Nuxt team. It MUST NOT preinstall unnecessary Vuetify or Pinia. Before adding, installing, temporarily executing or integrating a non-Nuxt-official direct dependency, module, CLI or development tool, the implementer MUST explain its purpose, necessity and official or built-in alternatives, obtain explicit owner approval and record the decision. Listing in the Nuxt Modules directory MUST NOT count as proof of official maintenance. Normal transitive dependencies of the selected framework SHALL NOT require separate approval unless explicitly selected as direct dependencies or integrations. Existing Hexo dependencies SHALL remain unchanged.

#### Scenario: Propose a third-party search package

- **WHEN** official capabilities do not satisfy the static search requirements and the implementer proposes Pagefind
- **THEN** the implementer explains the need and alternatives and waits for explicit owner approval before installing, executing or integrating it
- **AND** the earlier mention of Pagefind in planning does not count as approval

#### Scenario: Select an unnecessary UI or state package

- **WHEN** implementation has no demonstrated need for Vuetify or Pinia
- **THEN** neither package is added preemptively

#### Scenario: Review a community Nuxt module

- **WHEN** a proposed module is listed in the Nuxt Modules directory but is not maintained by the Nuxt team
- **THEN** it is treated as non-official and requires explicit owner approval before use

### Requirement: Confirmed brand pages

The site SHALL provide a home page, project listing, project case pages, an about page and blog navigation. The English handwritten name in the home-page hero MUST use the Satisfy font family. The owner MUST confirm visual direction, public project material and final copy before these are accepted as complete. Unconfirmed material MUST NOT be presented as genuine completed work.

#### Scenario: Render the English handwritten name
- **WHEN** the home page is displayed in desktop or mobile preview
- **THEN** the English handwritten name uses the Satisfy font family
- **AND** other typography follows the approved design source values
#### Scenario: Review the personal brand site

- **WHEN** the owner reviews the completed local pages
- **THEN** navigation reaches the home, projects, about and blog sections using confirmed content
- **AND** a project listing with no approved projects displays an explicit empty state rather than invented projects

### Requirement: Standalone static output

The generated site SHALL operate from a plain static file server without a Nuxt backend, paid service or SPA fallback. Every published route SHALL support direct navigation and refresh. Unknown routes SHALL produce a not-found response.

#### Scenario: Open a deep link directly

- **WHEN** a reader directly requests or refreshes a generated article or project URL
- **THEN** its complete page and assets load from static files without first visiting the home page

#### Scenario: Request an unknown route

- **WHEN** a reader requests a route absent from the generated route manifest
- **THEN** the static server returns a not-found response rather than a successful home page

### Requirement: Local acceptance gate

Acceptance SHALL require successful type checking, static generation, content and route comparison, functional blog navigation and search, and owner review on desktop and mobile. All essential checks MUST pass. Only non-blocking visual refinements explicitly accepted by the owner SHALL remain deferred. Hexo local generation capability MUST be preserved without invoking its deploying build command.

#### Scenario: Development server works but generated output is incomplete

- **WHEN** the development server works but static output omits a published route or search index
- **THEN** local acceptance fails and the missing artifact is reported

#### Scenario: Owner reviews the generated site

- **WHEN** essential checks pass and the owner reviews keyboard navigation, mobile readability and final content
- **THEN** acceptance records the owner's decision and any accepted non-blocking refinements

### Requirement: Explicit production boundary

This change MUST NOT add a publishing workflow, change GitHub Pages settings, configure deployment credentials, remove Hexo, or publish the new site. A later production switch MUST require separate explicit owner authorization, confirmed account and repository, a free static hosting configuration, and a documented rollback method.

#### Scenario: Local acceptance is complete

- **WHEN** all local checks pass and the owner accepts the local site
- **THEN** the existing production site remains unchanged and no deployment is triggered
- **AND** a later deployment remains subject to separate authorization

