# [3.3.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v3.2.1...v3.3.0) (2025-12-03)


### Features

* add raw response logging with truncation for large API responses ([cb06cb8](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cb06cb8acdf088f288591a6ecb1b2447e3825c59))

## [3.2.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v3.2.0...v3.2.1) (2025-12-01)


### Bug Fixes

* **deps:** regenerate package-lock.json for CI compatibility ([0a826be](https://github.com/aashari/mcp-server-atlassian-confluence/commit/0a826be11880505cf331a5105a8fdf2a28389315))

# [3.2.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v3.1.0...v3.2.0) (2025-12-01)


### Features

* modernize MCP SDK to v1.23.0 with registerTool API ([021c09f](https://github.com/aashari/mcp-server-atlassian-confluence/commit/021c09fc8956379ad12b025bee278a73f23366e1))

# [3.1.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v3.0.0...v3.1.0) (2025-11-30)


### Features

* add TOON output format for token-efficient LLM responses ([#145](https://github.com/aashari/mcp-server-atlassian-confluence/issues/145)) ([33ffa7b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/33ffa7b0477efb05eb185c582d480f09daee6c88))

# [3.0.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v2.1.1...v3.0.0) (2025-11-28)


* refactor!: replace domain-specific tools with generic HTTP method tools ([81fc057](https://github.com/aashari/mcp-server-atlassian-confluence/commit/81fc057213303239377b4136abab54fa980d6b92))


### BREAKING CHANGES

* This replaces 8+ domain-specific tools with 5 generic HTTP method tools.

Before (v2.x):
  conf_ls_spaces, conf_get_space, conf_ls_pages, conf_get_page,
  conf_search, conf_ls_comments, conf_add_comment, ...

After (v3.0):
  conf_get, conf_post, conf_put, conf_patch, conf_delete

Migration examples:
- conf_ls_spaces -> conf_get with path /wiki/api/v2/spaces
- conf_get_page -> conf_get with path /wiki/api/v2/pages/{id}
- conf_search -> conf_get with path /wiki/rest/api/search?cql=...
- conf_add_comment -> conf_post with path /wiki/api/v2/pages/{id}/footer-comments

New features:
- Full Confluence API access via generic HTTP methods
- JMESPath filtering support for response transformation
- Consistent with Bitbucket v2.0 and Jira v3.0 patterns
- PATCH method support for partial updates
- Proper handling of 204 No Content responses

Removed:
- 8 domain-specific tools and their types
- 5 controllers with formatters
- 12 service files with vendor types
- 7 utility files (ADF, markdown, pagination, etc.)
- CLI tests for old commands

Added:
- src/tools/atlassian.api.tool.ts (5 generic tools)
- src/tools/atlassian.api.types.ts (Zod schemas)
- src/controllers/atlassian.api.controller.ts
- src/cli/atlassian.api.cli.ts
- src/utils/jq.util.ts (JMESPath wrapper)

## [2.1.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v2.1.0...v2.1.1) (2025-09-09)


### Bug Fixes

* prevent dotenv from outputting to STDIO in MCP mode ([#82](https://github.com/aashari/mcp-server-atlassian-confluence/issues/82)) ([a286143](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a28614315421ae9ea2cc7bb4074091f7fab0d877))

# [2.1.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v2.0.2...v2.1.0) (2025-09-09)


### Features

* modernize dependencies and ensure Zod v3.25.76 MCP SDK compatibility ([#80](https://github.com/aashari/mcp-server-atlassian-confluence/issues/80)) ([9eb21f0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9eb21f0df2d2870ce888fe8cb3bd87ee0822d666))

## [2.0.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v2.0.1...v2.0.2) (2025-08-07)


### Bug Fixes

* improve .env.example with detailed comments ([aecadb2](https://github.com/aashari/mcp-server-atlassian-confluence/commit/aecadb27d16570ce63dde67cc1059da2b4a8926b))

## [2.0.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v2.0.0...v2.0.1) (2025-08-07)


### Bug Fixes

* add alternative config key documentation ([9d636b5](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9d636b5e2b574b5498c3e75522d3aa0164da594e))

# [2.0.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.32.0...v2.0.0) (2025-08-02)


### Features

* implement smart title search and inline comments separation ([4dfc95c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4dfc95ca1b816082dac5160ee3e6b55ab358d305))


### BREAKING CHANGES

* Title search behavior now includes automatic partial matching fallback

# [1.32.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.31.3...v1.32.0) (2025-08-02)


### Features

* add informational logging for page listing operations ([767e13d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/767e13d8784540b0fd5e2ea40916b40da1586c19))

## [1.31.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.31.2...v1.31.3) (2025-08-02)


### Bug Fixes

* standardize dependencies across MCP projects ([78a2f33](https://github.com/aashari/mcp-server-atlassian-confluence/commit/78a2f3340f4f471cc4d7c7aa8ab4291b9b5a3857))

## [1.31.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.31.1...v1.31.2) (2025-06-22)


### Bug Fixes

* change default transport from HTTP to STDIO for proper MCP client integration ([1ef20d6](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1ef20d6bac4fc5b31571348216354d5f43c72d84))

## [1.31.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.31.0...v1.31.1) (2025-06-22)


### Bug Fixes

* update dependencies ([474c855](https://github.com/aashari/mcp-server-atlassian-confluence/commit/474c855628c589bf43eadf65136963c2116e740d))

# [1.31.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.30.5...v1.31.0) (2025-06-22)


### Features

* migrate from deprecated SSE to dual transport support (STDIO + HTTP) ([6322a43](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6322a437f068527b3c156f514eb2aa54e29430e4))

## [1.30.5](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.30.4...v1.30.5) (2025-06-02)


### Bug Fixes

* replace Unix-specific chmod with cross-platform ensure-executable script ([5b9cb6e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/5b9cb6eff99191ae44e9ea383bfd9644e2676b05))

## [1.30.4](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.30.3...v1.30.4) (2025-06-02)


### Bug Fixes

* update dependencies ([1d60bf5](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1d60bf5ae7ff1dc97898a05c6bada7a1d3df429b))

## [1.30.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.30.2...v1.30.3) (2025-05-21)


### Bug Fixes

* Complete architectural improvements for tools layer in Confluence project ([6e4b49e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6e4b49ef0ddaf3fe6cfe1c4114e75d85d575a334))
* Move business logic to controllers and follow architectural standards ([1078a48](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1078a489c0940ba3bdb48871f67c9a76b3f55d5c))
* update dependencies ([7964854](https://github.com/aashari/mcp-server-atlassian-confluence/commit/7964854594ed9205c0ea90f32489ec0d4e9c8bd1))

## [1.30.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.30.1...v1.30.2) (2025-05-21)


### Bug Fixes

* update dependencies ([adb3475](https://github.com/aashari/mcp-server-atlassian-confluence/commit/adb34756311aaab3656536965ea8190cd3506a4e))

## [1.30.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.30.0...v1.30.1) (2025-05-20)


### Bug Fixes

* update dependencies ([9514a91](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9514a914c04ed6953e66fa9e6de8350d1de9bd89))

# [1.30.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.29.4...v1.30.0) (2025-05-19)


### Features

* update dependencies ([879dd03](https://github.com/aashari/mcp-server-atlassian-confluence/commit/879dd03a499aceff9ea09cd5d0fffa59b1703913))

## [1.29.4](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.29.3...v1.29.4) (2025-05-19)


### Bug Fixes

* remove mock implementations from tests to comply with Live Data Policy ([6d33913](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6d339138d9a99f734ac00da9d4e15b4ccfed848b))

## [1.29.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.29.2...v1.29.3) (2025-05-18)


### Bug Fixes

* update README with correct metadata handling and remove unused imports ([f5fe829](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f5fe8290a20ec6da6bf8bab901162d6e86a5a3bc))
* update tests to handle unified content format ([f23a219](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f23a2198fc2a8dc05f6609e9616d60c6a592e622))

## [1.29.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.29.1...v1.29.2) (2025-05-17)


### Bug Fixes

* ensure JSDocs and metadata removal are complete for tool pagination ([3e389dc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3e389dc2d4899ccd45018aaa3bdd711b1cfca4a5))

## [1.29.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.29.0...v1.29.1) (2025-05-17)


### Bug Fixes

* implement parentId filtering for ls-pages in controller and service ([2952b4c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/2952b4c25f5d37c620fec6c9df9b2b214da0d753))

# [1.29.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.28.3...v1.29.0) (2025-05-17)


### Bug Fixes

* remove mocking from pagination test to ensure all tests run against live APIs ([a5abbad](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a5abbad72e5458c1aa0308fb9000ed04d712fb7c))


### Features

* Enhance get-space to include top-level pages and get-page to include comments ([becaac0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/becaac01dec20b5243844e98e18d0d012bef8b47))

## [1.28.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.28.2...v1.28.3) (2025-05-16)


### Bug Fixes

* clarify Confluence filter behaviors and CQL guidance ([f3e991d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f3e991d35c8e2fcfab0e65268f1428a4705f26e8))

## [1.28.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.28.1...v1.28.2) (2025-05-16)


### Bug Fixes

* ensure consistent default values between CLI and MCP tools for Confluence spaces ([7fdbf20](https://github.com/aashari/mcp-server-atlassian-confluence/commit/7fdbf204e095faa27009c4e230faadabe7a35bc6))

## [1.28.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.28.0...v1.28.1) (2025-05-15)


### Bug Fixes

* resolve linter error in transport utility ([3fa8922](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3fa89224c92642adfa379cabc08bbd23075fb7f2))

# [1.28.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.27.1...v1.28.0) (2025-05-15)


### Features

* enhance error handling for Confluence API responses ([3466361](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3466361f3d5d4e9db78fc43c789f61f00139282e))

## [1.27.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.27.0...v1.27.1) (2025-05-14)


### Bug Fixes

* remove Dockerfile and smithery.yaml ([909c7f7](https://github.com/aashari/mcp-server-atlassian-confluence/commit/909c7f7f1ac4360498b35659abe15a38e8f08d11))

# [1.27.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.26.0...v1.27.0) (2025-05-14)


### Features

* enhance mention links with formatted email addresses for better user experience ([9865b5d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9865b5d40d1f6ca5d92b80dff3863acdc391eb21))

# [1.26.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.25.2...v1.26.0) (2025-05-14)


### Features

* enhance error handling with vendor propagation and enriched CLI/Tool formatting ([51dcc21](https://github.com/aashari/mcp-server-atlassian-confluence/commit/51dcc21a69b0db496844803fccabe83c65d50fa4))

## [1.25.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.25.1...v1.25.2) (2025-05-13)


### Bug Fixes

* update dependencies ([dbdcad9](https://github.com/aashari/mcp-server-atlassian-confluence/commit/dbdcad9887d0cca3123f27f3ed7d82525a9a1a0f))

## [1.25.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.25.0...v1.25.1) (2025-05-09)


### Bug Fixes

* remove unused exports identified by ts-prune ([ba28a4d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ba28a4dadc9ec925f12eceb3f8b669c974ceceb1))

# [1.25.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.24.0...v1.25.0) (2025-05-08)


### Features

* standardize content handling to consistently use ADF format for pages ([1d7dcc5](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1d7dcc54c9cb3ce3ab590f9d08a8ebd7a941c6fd))

# [1.24.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.23.0...v1.24.0) (2025-05-08)


### Features

* add context display for inline comments in Confluence ([658f6db](https://github.com/aashari/mcp-server-atlassian-confluence/commit/658f6dba7e4c57dd63d475f7f3d5067d5b237e7e))

# [1.23.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.13...v1.23.0) (2025-05-08)


### Features

* Standardize content handling and add comments listing functionality ([cb636d7](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cb636d758f6fbd112aaead27655af4725bc9fb2b))

## [1.22.13](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.12...v1.22.13) (2025-05-07)


### Performance Improvements

* Update dependencies ([cc279b4](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cc279b47e039009e406cf38841a6a86d43256fac))

## [1.22.12](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.11...v1.22.12) (2025-05-06)


### Performance Improvements

* Update dependencies ([9788a45](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9788a45842da7120e9dc7dc3d5d712a7f7ba5904))

## [1.22.11](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.10...v1.22.11) (2025-05-06)


### Performance Improvements

* Update dependencies ([fabfd4e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/fabfd4e4a8cc39f131f2bee2cf999926915f4e65))

## [1.22.10](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.9...v1.22.10) (2025-05-06)


### Bug Fixes

* Revert back the index.ts and package.json ([1736bc9](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1736bc96b1dac0eec09290e899c42cb1ad5ffe54))

## [1.22.9](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.8...v1.22.9) (2025-05-06)


### Bug Fixes

* improve main module detection for npx compatibility ([eaeb3bc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/eaeb3bc8c6bb8731201b119858950372fb6fb8b1))

## [1.22.8](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.7...v1.22.8) (2025-05-06)


### Bug Fixes

* improve main module detection for npx compatibility ([abf1cca](https://github.com/aashari/mcp-server-atlassian-confluence/commit/abf1cca59293a5c0444d3c0848aedede0e9f8fe1))

## [1.22.7](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.6...v1.22.7) (2025-05-05)


### Bug Fixes

* revert to working server version that stays running ([c397ab0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/c397ab01b3acbef06a74fabc9eeddd6f83aa1c2c))

## [1.22.6](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.5...v1.22.6) (2025-05-05)


### Bug Fixes

* improve signal handling for npx support ([f455407](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f455407ff29e6c44ce3a3a92dcf03a9255d9d941))

## [1.22.5](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.4...v1.22.5) (2025-05-05)


### Bug Fixes

* Remove explicit exit after CLI execution in index.ts ([23f89f0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/23f89f0c7677ea9c39e504eeb71d49e2bdb71701))

## [1.22.4](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.3...v1.22.4) (2025-05-05)


### Bug Fixes

* Apply cross-platform compatibility improvements from boilerplate ([0a29e2b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/0a29e2b321adf755e395698f275128bfb6492b16))


### Performance Improvements

* Update dependencies ([586ccce](https://github.com/aashari/mcp-server-atlassian-confluence/commit/586cccede3cfd93afd0e22670f6cee4ade98589d))

## [1.22.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.2...v1.22.3) (2025-05-05)


### Bug Fixes

* Remove commented-out code and unused exports ([6f181df](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6f181dfc46326854060fdc7cfe7b0a6c2e8751f3))

## [1.22.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.1...v1.22.2) (2025-05-05)


### Bug Fixes

* **pages:** rename ls-pages query filter to title and update descriptions ([53b0b88](https://github.com/aashari/mcp-server-atlassian-confluence/commit/53b0b88e944237e17905332c009e0b7d8127cff1))

## [1.22.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.22.0...v1.22.1) (2025-05-04)


### Performance Improvements

* Update dependencies ([91d87e8](https://github.com/aashari/mcp-server-atlassian-confluence/commit/91d87e8a1d897a1959a0874e34da40858baf4f66))

# [1.22.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.21.0...v1.22.0) (2025-05-04)


### Features

* **format:** standardize CLI and Tool output formatting ([e9f784c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/e9f784c0d3caa126887b9868eea3cb163f325786))

# [1.21.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.6...v1.21.0) (2025-05-04)


### Bug Fixes

* remove mocks from controller tests and fix transport test assertion ([88147ea](https://github.com/aashari/mcp-server-atlassian-confluence/commit/88147ea306f1b696d8ac45b2f75c577c59ecb225))
* remove unused import to fix linting error ([b915047](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b9150474b9ee1bdffc7d3e1daf2bf331cd8bf05b))
* switch to Confluence V1 Search API to resolve generic-content-type error ([b8ce825](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b8ce82501d3a419905f539d3f1b501000d9fad2c))


### Features

* add Zod runtime validation to service functions for Phase 3 ([14b918b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/14b918b87c335f670459d0ed1b77e8903d228bb6))
* define Zod schemas for Confluence API responses for Phase 3 ([c37692f](https://github.com/aashari/mcp-server-atlassian-confluence/commit/c37692fcc95cf57d0ab14d18db0462e8d75238c9))
* standardize CLI output format with header/context/footer ([f4a68aa](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f4a68aa9f340cb5d4ebef05a1995f024ae7a316a))
* update CLI files and tools to use inferred Zod types for Phase 1-2 ([95a8ca2](https://github.com/aashari/mcp-server-atlassian-confluence/commit/95a8ca269ef9db962744dae34e6c4b3b9bc08f9f))

## [1.20.6](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.5...v1.20.6) (2025-05-04)


### Bug Fixes

* Clean up unused exports and types in Confluence server ([d716590](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d716590b91f989c75063794e51c07309c6de15f2))

## [1.20.5](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.4...v1.20.5) (2025-05-03)


### Bug Fixes

* handle various result types in search formatter and update ls-pages status description ([2973719](https://github.com/aashari/mcp-server-atlassian-confluence/commit/29737196579cf780dee3bcd0889987cd145ac6bf))

## [1.20.4](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.3...v1.20.4) (2025-05-02)


### Bug Fixes

* trigger release ([22d0fa5](https://github.com/aashari/mcp-server-atlassian-confluence/commit/22d0fa52164c6335268e77ed2c627198cabdf390))

## [1.20.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.2...v1.20.3) (2025-05-02)


### Bug Fixes

* Remove re-exports and invalid test ([19c254a](https://github.com/aashari/mcp-server-atlassian-confluence/commit/19c254a8c82f56b659a5003964eb174ff0b3348a))

## [1.20.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.1...v1.20.2) (2025-05-02)


### Bug Fixes

* align confluence ls-spaces CLI/tool with API capability (remove query) ([4f70107](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4f70107ea8225eebde1b6dde31c3bc66500948b2))

## [1.20.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.20.0...v1.20.1) (2025-05-02)


### Bug Fixes

* **confluence:** remove incorrect status validation from ls-pages CLI ([4a205e6](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4a205e656612a04629c68b55298a28a7b359b3ea))
* **confluence:** remove invalid 'draft' status from conf_ls_pages filter enum ([45a6e39](https://github.com/aashari/mcp-server-atlassian-confluence/commit/45a6e39878976c2d6cc7105c0c676ac699d0cd7f))

# [1.20.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.19.2...v1.20.0) (2025-05-02)


### Features

* **confluence:** add query parameter to conf_search for simple text search ([c43545f](https://github.com/aashari/mcp-server-atlassian-confluence/commit/c43545f754e4d807f0ac2c71d670d38c22baeece))


### Performance Improvements

* Update dependencies ([c333bf7](https://github.com/aashari/mcp-server-atlassian-confluence/commit/c333bf748a3a1648680984943a3d55ef13892aa2))

## [1.19.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.19.1...v1.19.2) (2025-05-01)


### Bug Fixes

* **confluence:** remove non-functional query param from conf_ls_spaces, clarify conf_search CQL usage ([a9fe32b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a9fe32b5896043f73f0609877bfadbd405b1bcae))

## [1.19.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.19.0...v1.19.1) (2025-05-01)


### Performance Improvements

* streamline Confluence search tool description for better AI consumption ([a5e83f7](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a5e83f7205ddf7b296e5d8d9d32cb188113ad56f))
* streamline tool descriptions for better AI consumption ([962fb8f](https://github.com/aashari/mcp-server-atlassian-confluence/commit/962fb8f963bb632141f540d18dd22155c6280677))

# [1.19.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.18.3...v1.19.0) (2025-05-01)


### Bug Fixes

* ensure spaceId filter is applied and correct tests ([4ff79fc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4ff79fc4445f398675f26371e3710974056f983e))


### Features

* add dedicated filter parameters to confluence search ([4c8b09b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4c8b09ba532c624c9bcff24411d937c2bb53450e))
* allow filtering pages by space key ([d2c7a84](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d2c7a8402aa16d3a95a4aa8b3541913cda0d6304))

## [1.18.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.18.2...v1.18.3) (2025-05-01)


### Bug Fixes

* align pages CLI option descriptions with Zod schema ([2d5ec86](https://github.com/aashari/mcp-server-atlassian-confluence/commit/2d5ec86d4c102e16c695bae4ac9384194306f500))

## [1.18.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.18.1...v1.18.2) (2025-04-30)


### Bug Fixes

* **cli:** Align command names and descriptions with tool definitions ([2cfeb60](https://github.com/aashari/mcp-server-atlassian-confluence/commit/2cfeb602ee13ae140ebf0a13e6e9cb59bf8faff6))

## [1.18.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.18.0...v1.18.1) (2025-04-30)


### Performance Improvements

* Update dependencies ([ff99283](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ff99283ecbe3e9110fe6c468b9d57ff7f0c61d94))

# [1.18.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.17.0...v1.18.0) (2025-04-30)


### Bug Fixes

* Standardize and shorten MCP tool names ([d88a372](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d88a3722c0ffcee7044bc82dd9c1fc971472b99a))


### Features

* Support multiple keys for global config lookup ([a4226f4](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a4226f466f5fdd4914433cd0cf3777b5566f37ab))

# [1.17.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.16.4...v1.17.0) (2025-04-25)


### Bug Fixes

* unify tool names and descriptions for consistency ([9a24efc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9a24efc28921472d8f0764a0b4542d2fe7739f2b))


### Features

* prefix Confluence tool names with 'confluence_' for uniqueness ([513aac4](https://github.com/aashari/mcp-server-atlassian-confluence/commit/513aac448747b5b61db7065b618809e25bc16dc4))

## [1.16.4](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.16.3...v1.16.4) (2025-04-22)


### Performance Improvements

* Update dependencies ([f4d25d0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f4d25d0fc10991f302ca7d5e28c5a346cab254ed))

## [1.16.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.16.2...v1.16.3) (2025-04-20)


### Bug Fixes

* Update dependencies and fix related type errors ([ae48a05](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ae48a057e2dc7c245dde63b671856830f9b559af))

## [1.16.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.16.1...v1.16.2) (2025-04-09)


### Bug Fixes

* **deps:** update dependencies to latest versions ([3214604](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3214604643d3d1f95ecdf13a8401df32febf849f))

## [1.16.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.16.0...v1.16.1) (2025-04-04)


### Bug Fixes

* standardize README.md format across MCP servers ([91e8c72](https://github.com/aashari/mcp-server-atlassian-confluence/commit/91e8c728d6148abd894c22dbb7c718a4e385e101))
* standardize tool registration function names to registerTools ([65247dc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/65247dc1f07f6ef5ffefef8a1c35c3f1c0a3fb6d))

# [1.16.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.15.0...v1.16.0) (2025-04-03)


### Features

* trigger new release ([666721d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/666721d58bd5e5dca4131af382deacb1eb98d0f2))

# [1.15.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.14.2...v1.15.0) (2025-04-03)


### Features

* **logging:** add file logging with session ID to ~/.mcp/data/ ([cb1691b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cb1691b6a735e231eff0a63a34cb9280de81a302))

## [1.14.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.14.1...v1.14.2) (2025-04-03)


### Bug Fixes

* **logger:** ensure consistent logger implementation across all projects ([e49e0df](https://github.com/aashari/mcp-server-atlassian-confluence/commit/e49e0df5e9710f386403b17953f8b42525ae212d))

## [1.14.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.14.0...v1.14.1) (2025-04-03)


### Performance Improvements

* **confluence:** improve version handling and module exports ([413be54](https://github.com/aashari/mcp-server-atlassian-confluence/commit/413be544774a56196af129159e8647e4f3f27744))

# [1.14.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.13.2...v1.14.0) (2025-03-29)


### Bug Fixes

* add NOT_FOUND error type and use createNotFoundError in transport utility ([98ec69b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/98ec69be89158ae08bcfa7cc47043815b16d0bd9))
* **cli:** standardize parameter naming conventions ([8c53d15](https://github.com/aashari/mcp-server-atlassian-confluence/commit/8c53d15fc053ef33c242bbc05a4e662515dc8c74))
* handle api errors in transport tests without mocking ([fe1acf6](https://github.com/aashari/mcp-server-atlassian-confluence/commit/fe1acf6569b7144eea677e1ab1d4d9dce4914ff4))
* make tests work properly without authentication for CI ([37a09bd](https://github.com/aashari/mcp-server-atlassian-confluence/commit/37a09bd9df363cd80373960602cb44aad4f77a46))
* preserve NOT_FOUND error type in error handling flow ([0c9d994](https://github.com/aashari/mcp-server-atlassian-confluence/commit/0c9d994355411191e6a08ab66bd489ecfd10f430))
* properly skip Atlassian Pages tests when credentials are not available ([4e385ad](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4e385ad0c4f613ee04065dab97b0ad008488de06))
* properly skip fetchAtlassian tests when credentials aren't available ([bef0138](https://github.com/aashari/mcp-server-atlassian-confluence/commit/bef01380e78a10cb05ed15ea6f9b1be82073f846))
* properly skip tests when credentials are not available ([9aad033](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9aad033042de9597d2e5c34128ab48d0144f49bb))
* resolve build errors with status imports ([19e7d11](https://github.com/aashari/mcp-server-atlassian-confluence/commit/19e7d1163c47bfc8906e16204b7dba8b0ab4af36))
* resolve TypeScript errors and lint warnings in Confluence MCP server ([a80d463](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a80d46314ea985e8f1089e12b83c5d88701b7a45))
* standardize CLI binary name to mcp-atlassian-confluence ([9e55363](https://github.com/aashari/mcp-server-atlassian-confluence/commit/9e5536349f0c8920c0df50f51c0947ddecb0487a))
* standardize sort and array parameters in Confluence CLI ([4f633c5](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4f633c5257f79ebd203166c8aa85a487ac6f06bc))
* **tests:** add mock implementation to eliminate skipped tests ([1075287](https://github.com/aashari/mcp-server-atlassian-confluence/commit/10752872d6e99ebeebd229f2aa00e26a3c89ea74))
* update CLI test expectations to match implementation behavior ([623b048](https://github.com/aashari/mcp-server-atlassian-confluence/commit/623b048616d9beb7915f660eb28241ac5952e93b))
* update page CLI test expectations to handle both local and CI environments ([d2319ce](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d2319ceb560cde065c650c6c40105ae62b3b8985))
* update page CLI test expectations to match implementation ([3128935](https://github.com/aashari/mcp-server-atlassian-confluence/commit/31289353df44be3b2f7f6d56b268b46920359bb4))
* update tests to handle NOT_FOUND errors consistently ([934a490](https://github.com/aashari/mcp-server-atlassian-confluence/commit/934a490ab7e61a0b24f28e51dc1958dda78f0f4c))


### Features

* standardize CLI flag patterns and parameter optionality ([66adb3d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/66adb3dc60b4af1ecbb0327e88fbc8c4e3543e1f))
* **test:** add improved integration tests for Confluence spaces service and controller ([3a502f7](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3a502f792c183dc1d240ba41d8f6d756b67d3b86))

## [1.13.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.13.1...v1.13.2) (2025-03-28)


### Bug Fixes

* **markdown:** improve table formatting by consolidating whitespace in cells ([3e917aa](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3e917aa943cf2b14abc5b86df47d97cb214a4eba))

## [1.13.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.13.0...v1.13.1) (2025-03-28)


### Performance Improvements

* rename tools to use underscore instead of hyphen ([5ab5861](https://github.com/aashari/mcp-server-atlassian-confluence/commit/5ab5861b3954a286e93afd4522f978885ffced38))

# [1.13.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.12.0...v1.13.0) (2025-03-27)


### Bug Fixes

* standardize logger utility exports to enforce contextual logging pattern ([a9e21f3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a9e21f381589db9ec29c72cacb0bd902d359ccab))
* standardize startup logging messages for better consistency ([4fdb15c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4fdb15c96cc1aafa11f0145e95f4898e23a9d34c))
* standardize vendor types with other MCP projects ([3c1de7a](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3c1de7a363753aa6a1837deb42290526619ce8aa))
* trigger new release ([341e71e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/341e71e954c07568df8d88bc9c3448c90049a005))
* update applyDefaults utility to work with TypeScript interfaces ([b0fb0a3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b0fb0a3fc4ce73b1d585e1da827fea0800cdaeb3))
* update version to 1.13.0 to fix CI/CD workflows ([b70bb43](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b70bb43f6627bf01e6bdc69dd3a571f5ad07348e))


### Features

* update to version 1.13.1 with improved space command examples ([ce77e09](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ce77e0994d84e63ad924ec1780f1aa7adbe9bf12))

## [1.12.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.12.0...v1.12.1) (2025-03-27)


### Bug Fixes

* standardize logger utility exports to enforce contextual logging pattern ([a9e21f3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a9e21f381589db9ec29c72cacb0bd902d359ccab))
* standardize startup logging messages for better consistency ([4fdb15c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4fdb15c96cc1aafa11f0145e95f4898e23a9d34c))
* standardize vendor types with other MCP projects ([3c1de7a](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3c1de7a363753aa6a1837deb42290526619ce8aa))
* trigger new release ([341e71e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/341e71e954c07568df8d88bc9c3448c90049a005))
* update applyDefaults utility to work with TypeScript interfaces ([b0fb0a3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b0fb0a3fc4ce73b1d585e1da827fea0800cdaeb3))
* update version to 1.13.0 to fix CI/CD workflows ([b70bb43](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b70bb43f6627bf01e6bdc69dd3a571f5ad07348e))

## [1.12.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.12.0...v1.12.1) (2025-03-27)


### Bug Fixes

* standardize logger utility exports to enforce contextual logging pattern ([a9e21f3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a9e21f381589db9ec29c72cacb0bd902d359ccab))
* standardize startup logging messages for better consistency ([4fdb15c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/4fdb15c96cc1aafa11f0145e95f4898e23a9d34c))
* standardize vendor types with other MCP projects ([3c1de7a](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3c1de7a363753aa6a1837deb42290526619ce8aa))
* trigger new release ([341e71e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/341e71e954c07568df8d88bc9c3448c90049a005))
* update applyDefaults utility to work with TypeScript interfaces ([b0fb0a3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/b0fb0a3fc4ce73b1d585e1da827fea0800cdaeb3))

# [1.12.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.11.1...v1.12.0) (2025-03-27)


### Bug Fixes

* **error:** standardize error handling across all MCP servers ([a7ad7e3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a7ad7e39c42d418f760706b3726317376d899d5f))
* improve API test skipping when credentials are missing ([f150985](https://github.com/aashari/mcp-server-atlassian-confluence/commit/f150985c05ce9e8cd2c37d575b071415caad7543))
* **test:** update transport.util.test.ts to handle Logger refactoring ([c9953f4](https://github.com/aashari/mcp-server-atlassian-confluence/commit/c9953f4626b9bbe39357ec9bba3dc4fc0b21642f))


### Features

* **logging:** complete logging standardization across all modules ([dae3f60](https://github.com/aashari/mcp-server-atlassian-confluence/commit/dae3f60e6ec291bdee2cb5ad8f791299327ee420))
* **logging:** enhance logging system with performance metrics, granular debug controls, and operational milestones ([93fde13](https://github.com/aashari/mcp-server-atlassian-confluence/commit/93fde13b1100eba5ec49adf460d25613d419a027))
* **logging:** standardize logger context usage across service modules ([a27cae4](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a27cae42bb66f33052f5bef0b449de2d5741874f))
* **logging:** standardize logging across Confluence modules ([50326ba](https://github.com/aashari/mcp-server-atlassian-confluence/commit/50326ba572ebb827e32d0082baf522b2f9e2c2df))

## [1.11.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.11.0...v1.11.1) (2025-03-27)


### Bug Fixes

* trigger release ([2cd8a9d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/2cd8a9dace5610715867ab8a8adffe0da6161001))

# [1.11.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.10.0...v1.11.0) (2025-03-27)


### Features

* **confluence:** add default sorting to pages and spaces commands ([a91b5af](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a91b5af4418b2928c538469967c574f96152e3fa))

# [1.10.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.9.2...v1.10.0) (2025-03-27)


### Features

* **confluence:** add default sorting to list operations ([3d621c4](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3d621c440985186414e612471227cd0cbe893173))

## [1.9.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.9.1...v1.9.2) (2025-03-26)


### Bug Fixes

* improve CLI and tool descriptions with consistent formatting and detailed guidance ([008f2b9](https://github.com/aashari/mcp-server-atlassian-confluence/commit/008f2b9f829de910253a9825669a5c20b609512e))

## [1.9.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.9.0...v1.9.1) (2025-03-26)


### Bug Fixes

* support comma-separated list for space-id parameter in list-pages ([3f0aecf](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3f0aecfeb4bedcc86be779104487da99c563203e))

# [1.9.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.8.0...v1.9.0) (2025-03-26)


### Features

* trigger release with semantic versioning ([d285293](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d2852939d72c200a4171446578c593e6f588ef96))

# [1.8.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.7.0...v1.8.0) (2025-03-26)


### Features

* **page:** remove bodyFormat option to ensure minimal interface ([bf79382](https://github.com/aashari/mcp-server-atlassian-confluence/commit/bf79382f0c84242cca96076cd1b209c22a0cd4b3))

# [1.7.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.6.0...v1.7.0) (2025-03-26)


### Features

* standardize CQL queries and clarify text search options ([d405fc5](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d405fc5f7a0381fd329558f5d7b763cd7d97dd0e))

# [1.6.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.5.1...v1.6.0) (2025-03-26)


### Features

* enhance pages and spaces CLI with named parameters and improved date handling ([25103de](https://github.com/aashari/mcp-server-atlassian-confluence/commit/25103de54fa91dba532b984c2ea9e85b7a7b6f6f))

## [1.5.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.5.0...v1.5.1) (2025-03-25)


### Bug Fixes

* replace any with unknown in defaults.util.ts ([cd70568](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cd70568e4a0ad36b36fd31760da953eba839b43c))

# [1.5.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.4.0...v1.5.0) (2025-03-25)


### Features

* **pagination:** standardize pagination display across all CLI commands ([442a449](https://github.com/aashari/mcp-server-atlassian-confluence/commit/442a4495dd07039e3acd74541583645118fbe0cb))

# [1.4.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.3.0...v1.4.0) (2025-03-25)


### Features

* **cli:** standardize CLI command descriptions with detailed explanations ([42d11c6](https://github.com/aashari/mcp-server-atlassian-confluence/commit/42d11c6e2670cc3bcc83016ab9d65287454ab1fa))
* **format:** implement standardized formatters and update CLI documentation ([d7aad41](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d7aad41dd9bd7e440b3451c69e508abc310175b7))

# [1.3.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.2.5...v1.3.0) (2025-03-25)


### Bug Fixes

* standardize logging patterns and fix linter errors ([74c879f](https://github.com/aashari/mcp-server-atlassian-confluence/commit/74c879f6d7c4caced10ab6121a31e2b286689da7))


### Features

* **pages:** enhance page and space controllers ([ba21a0d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ba21a0d6b974eedbbf261265290526ca317b550e))

## [1.2.5](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.2.4...v1.2.5) (2025-03-25)


### Bug Fixes

* trigger new release for parameter and pagination standardization ([cc0138a](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cc0138a6ef16d30ef80a4f048a186886ebdfacfb))
* update CLI and tool handlers to use object-based identifiers ([cf6b2ac](https://github.com/aashari/mcp-server-atlassian-confluence/commit/cf6b2ac55b22af12b2cb69e9e0e676168bc8a7b2))

## [1.2.4](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.2.3...v1.2.4) (2025-03-24)


### Bug Fixes

* remove dist directory from git tracking ([7343e65](https://github.com/aashari/mcp-server-atlassian-confluence/commit/7343e65746001cb3465f9d0b0db30297ee43fb09))

## [1.2.3](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.2.2...v1.2.3) (2025-03-24)


### Bug Fixes

* remove dist files from release commit assets ([74e53ce](https://github.com/aashari/mcp-server-atlassian-confluence/commit/74e53cee60c6a7785561354c81cbdf611323df5a))

## [1.2.2](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.2.1...v1.2.2) (2025-03-24)


### Bug Fixes

* version consistency and release workflow improvements ([1a2baae](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1a2baae4326163c8caf4fa4cfeb9f4b8028d2b5a))

## [1.2.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.2.0...v1.2.1) (2025-03-24)


### Bug Fixes

* improve documentation with additional section ([6849f9b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6849f9b2339c049e0017ef40aedadd184350cee0))

# [1.2.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.1.0...v1.2.0) (2025-03-24)


### Features

* enhance get-space command to support both numeric IDs and space keys ([2913153](https://github.com/aashari/mcp-server-atlassian-confluence/commit/29131536f302abf1923c0c6521d544c51ad222fa))

# [1.1.0](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.0.1...v1.1.0) (2025-03-23)


### Bug Fixes

* remove incorrect limit expectation in transport utility tests ([6f7b689](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6f7b689a7eb5db8a8592db88e7fa27ac04d641c8))


### Features

* improve development workflow and update documentation ([4458957](https://github.com/aashari/mcp-server-atlassian-confluence/commit/445895777be6287a624cb19b8cd8a12590a28c7b))

## [1.0.1](https://github.com/aashari/mcp-server-atlassian-confluence/compare/v1.0.0...v1.0.1) (2025-03-23)

### Bug Fixes

- update package name in config loader ([3b8157b](https://github.com/aashari/mcp-server-atlassian-confluence/commit/3b8157b076441e4dde562cddfe31671f3696434d))

# 1.0.0 (2025-03-23)

### Bug Fixes

- add workflows permission to semantic-release workflow ([de3a335](https://github.com/aashari/mcp-server-atlassian-confluence/commit/de3a33510bd447af353444db1fcb58e1b1aa02e4))
- ensure executable permissions for bin script ([395f1dc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/395f1dcb5f3b5efee99048d1b91e3b083e9e544f))
- handle empty strings properly in greet function ([546d3a8](https://github.com/aashari/mcp-server-atlassian-confluence/commit/546d3a84209e1065af46b2213053f589340158df))
- improve error logging with IP address details ([121f516](https://github.com/aashari/mcp-server-atlassian-confluence/commit/121f51655517ddbea7d25968372bd6476f1b3e0f))
- improve GitHub Packages publishing with a more robust approach ([fd2aec9](https://github.com/aashari/mcp-server-atlassian-confluence/commit/fd2aec9926cf99d301cbb2b5f5ca961a6b6fec7e))
- improve GitHub Packages publishing with better error handling and debugging ([db25f04](https://github.com/aashari/mcp-server-atlassian-confluence/commit/db25f04925e884349fcf3ab85316550fde231d1f))
- improve GITHUB_OUTPUT syntax in semantic-release workflow ([6f154bc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/6f154bc43f42475857e9256b0a671c3263dc9708))
- improve version detection for global installations ([97a95dc](https://github.com/aashari/mcp-server-atlassian-confluence/commit/97a95dca61d8cd7a86c81bde4cb38c509b810dc0))
- make publish workflow more resilient against version conflicts ([ffd3705](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ffd3705bc064ee9135402052a0dc7fe32645714b))
- remove invalid workflows permission ([c012e46](https://github.com/aashari/mcp-server-atlassian-confluence/commit/c012e46a29070c8394f7ab596fe7ba68c037d3a3))
- remove type module to fix CommonJS compatibility ([8b1f00c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/8b1f00c37467bc676ad8ec9ab672ba393ed084a9))
- resolve linter errors in version detection code ([5f1f33e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/5f1f33e88ae843b7a0d708899713be36fcd2ec2e))
- update examples to use correct API (greet instead of sayHello) ([7c062ca](https://github.com/aashari/mcp-server-atlassian-confluence/commit/7c062ca42765c659f018f990f4b1ec563d1172d3))
- update release workflow to ensure correct versioning in compiled files ([a365394](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a365394b8596defa33ff5a44583d52e2c43f0aa3))
- update version display in CLI ([2b7846c](https://github.com/aashari/mcp-server-atlassian-confluence/commit/2b7846cbfa023f4b1a8c81ec511370fa8f5aaf33))

### Features

- add automated dependency management ([efa1b62](https://github.com/aashari/mcp-server-atlassian-confluence/commit/efa1b6292e0e9b6efd0d43b40cf7099d50769487))
- add CLI usage examples for both JavaScript and TypeScript ([d5743b0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/d5743b07a6f2afe1c6cb0b03265228cba771e657))
- add support for custom name in greet command ([be48a05](https://github.com/aashari/mcp-server-atlassian-confluence/commit/be48a053834a1d910877864608a5e9942d913367))
- add version update script and fix version display ([ec831d3](https://github.com/aashari/mcp-server-atlassian-confluence/commit/ec831d3a3c966d858c15972365007f9dfd6115b8))
- implement Atlassian Confluence MCP server ([50ee69e](https://github.com/aashari/mcp-server-atlassian-confluence/commit/50ee69e37f4d453cb8f0447e10fa5708a787aa93))
- implement review recommendations ([a23cbc0](https://github.com/aashari/mcp-server-atlassian-confluence/commit/a23cbc0608a07e202396b3cd496c1f2078e304c1))
- implement testing, linting, and semantic versioning ([1d7710d](https://github.com/aashari/mcp-server-atlassian-confluence/commit/1d7710dfa11fd1cb04ba3c604e9a2eb785652394))
- improve CI workflows with standardized Node.js version, caching, and dual publishing ([0dc9470](https://github.com/aashari/mcp-server-atlassian-confluence/commit/0dc94705c81067d7ff63ab978ef9e6a6e3f75784))
- improve package structure and add better examples ([bd66891](https://github.com/aashari/mcp-server-atlassian-confluence/commit/bd668915bde84445161cdbd55ff9da0b0af51944))

### Reverts

- restore simple version handling ([bd0fadf](https://github.com/aashari/mcp-server-atlassian-confluence/commit/bd0fadfa8207b4a7cf472c3b9f4ee63d8e36189d))

# 1.0.0 (2025-03-23)

### Features

- Initial release of Atlassian Confluence MCP server
- Provides tools for accessing and searching Confluence spaces, pages, and content
- Integration with Claude Desktop and Cursor AI via Model Context Protocol
- CLI support for direct interaction with Confluence
