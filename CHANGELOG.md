# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-01-28

### Added
- Comprehensive TypeScript compatibility documentation throughout all guides
- New `config.example.ts` file with TypeScript configuration template
- Prominent TypeScript compatibility notices in README.md, INSTALLATION.md, and QUICKSTART.md
- Dedicated "TypeScript Configuration" section in README.md
- TypeScript-first configuration examples in INSTALLATION.md
- Clarification that JavaScript plugins work perfectly in TypeScript Strapi projects

### Changed
- Reordered configuration sections to show TypeScript examples first
- Enhanced `config.example.js` with better documentation
- Updated all documentation to emphasize TypeScript compatibility
- Added "TypeScript Compatible" to feature list

### Documentation
- Clearly documented that no conversion or type definitions are needed
- Added verification steps for TypeScript users
- Included examples with multiple plugins for TypeScript projects
- Enhanced troubleshooting section with TypeScript-specific guidance

## [1.0.1] - 2026-01-28

### Added
- Comprehensive INSTALLATION.md guide with detailed installation instructions for existing Strapi projects
- Multiple installation methods (Git clone, download, Git submodule)
- Prerequisites checklist with version verification commands
- Step-by-step configuration for JavaScript and TypeScript projects
- Extensive troubleshooting section covering common installation issues
- Verification procedures to confirm successful installation
- Uninstallation instructions

### Changed
- Enhanced README.md installation section with quick steps and reference to detailed guide
- Updated QUICKSTART.md with clearer installation instructions and link to comprehensive guide
- Improved folder naming clarity (import-export vs strapi-v4-import-export)

## [1.0.0] - 2026-01-28

### Added
- Initial release of Strapi v4 Import/Export plugin
- Dynamic support for all content types without manual configuration
- RESTful API endpoints for import and export operations
- Export single content type functionality (`GET /export/:contentType`)
- Export all content types functionality (`GET /export-all`)
- Import content type data functionality (`POST /import/:contentType`)
- Get available content types endpoint (`GET /content-types`)
- Authentication requirement for all endpoints
- Comprehensive error handling and logging
- Automatic update or create logic during import
- Filtering of system content types (admin, upload, permissions, roles, users)
- Detailed import results with success, updated, and failed counts
- Complete documentation with usage examples
- Testing guide with manual and automated test scenarios
- Example configuration file for plugin integration

### Security
- Required authentication for all API endpoints
- User data exclusion from export/import operations
- Input validation for all endpoints
- Secure error messages that don't expose sensitive information
- Content type validation before operations

### Technical Details
- Built using Strapi v4 plugin architecture
- Modular structure with controllers, services, and routes
- Uses Strapi's entityService for database operations
- Follows Strapi best practices and conventions
- No external dependencies required

[1.0.0]: https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export/releases/tag/v1.0.0
