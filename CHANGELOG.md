# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
