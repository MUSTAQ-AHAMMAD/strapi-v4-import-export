# Contributing to Strapi v4 Import/Export Plugin

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- Clear title and description
- Steps to reproduce
- Expected vs actual behavior
- Strapi version, Node.js version, and plugin version
- Relevant error messages and logs
- Code samples if applicable

### Suggesting Enhancements

Enhancement suggestions are welcome! Please create an issue with:
- Clear description of the enhancement
- Use cases and benefits
- Any implementation ideas you might have

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Create a pull request** with a clear description

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export.git
   cd strapi-v4-import-export
   ```

2. Create a test Strapi project for development:
   ```bash
   npx create-strapi-app@latest test-app --quickstart
   cd test-app
   ```

3. Copy the plugin to the test app:
   ```bash
   mkdir -p src/plugins
   cp -r ../strapi-v4-import-export src/plugins/import-export
   ```

4. Enable the plugin in `config/plugins.js`:
   ```javascript
   module.exports = {
     'import-export': {
       enabled: true,
       resolve: './src/plugins/import-export'
     },
   };
   ```

5. Start the development server:
   ```bash
   npm run develop
   ```

## Code Style Guidelines

- Use **single quotes** for strings
- Use **2 spaces** for indentation
- Add **JSDoc comments** for functions
- Follow **JavaScript Standard Style**
- Keep functions **focused and small**
- Use **meaningful variable names**

## Project Structure

```
strapi-v4-import-export/
├── server/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes definition
│   └── index.js         # Plugin entry point
├── package.json
├── README.md
├── TESTING.md
├── CHANGELOG.md
├── CONTRIBUTING.md
└── LICENSE
```

## Testing

Before submitting a pull request:

1. **Manual Testing**: Follow the testing guide in TESTING.md
2. **Test all endpoints**: Ensure all API endpoints work correctly
3. **Test error cases**: Verify error handling works as expected
4. **Test with different content types**: Try with various schemas

## Documentation

Update documentation when:
- Adding new features
- Changing existing functionality
- Fixing bugs that affect user behavior
- Adding configuration options

Documents to update:
- README.md for user-facing changes
- TESTING.md for test-related changes
- CHANGELOG.md for all changes
- Code comments for implementation changes

## Commit Messages

Write clear commit messages:
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- First line should be concise (50 chars or less)
- Add detailed description if needed

Examples:
```
Add bulk import functionality

- Implement batch processing for large imports
- Add progress tracking
- Update documentation
```

## Review Process

1. All pull requests require review before merging
2. Address review comments promptly
3. Keep pull requests focused on a single concern
4. Update your PR based on feedback

## Security

- **Never commit sensitive data** (tokens, passwords, etc.)
- **Report security issues privately** to the maintainers
- **Follow security best practices** in your code
- **Test for common vulnerabilities** (SQL injection, XSS, etc.)

## Areas for Contribution

Looking for something to work on? Consider:

### High Priority
- Transaction support for import operations
- Pagination support for large exports
- Validation schemas for imported data
- Performance optimizations
- Unit and integration tests

### Medium Priority
- Support for media file export/import
- Import progress tracking
- Batch processing options
- Export filtering and search
- Import preview/dry-run mode

### Documentation
- More usage examples
- Video tutorials
- Integration guides
- Migration guides from other plugins

### Nice to Have
- CLI tool for export/import
- Scheduled exports
- Export templates
- Data transformation during import
- Multi-language support

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Reach out to the maintainers
- Start a discussion on GitHub

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

Thank you for contributing to make this plugin better!
