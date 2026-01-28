# Strapi v4 Import/Export Plugin

A comprehensive Strapi v4 plugin that provides dynamic import and export functionality for all content types. This plugin allows you to seamlessly export and import your Strapi content in JSON format without any manual configuration for each content type.

## Features

- ✅ **Dynamic Support**: Works with all content types automatically without requiring customization
- ✅ **RESTful API**: Simple HTTP endpoints for importing and exporting data
- ✅ **Bulk Operations**: Export all content types at once or work with individual types
- ✅ **Error Handling**: Comprehensive error logging and failure handling during import operations
- ✅ **Security**: Built-in permission checks to protect your data
- ✅ **Update Support**: Automatically updates existing entries or creates new ones during import
- ✅ **Modular Architecture**: Clean separation of controllers, services, and routes

## Installation

### As a Plugin in Your Strapi Project

1. Copy this plugin to your Strapi project's plugins directory:
   ```bash
   cp -r strapi-v4-import-export ./src/plugins/import-export
   ```

2. Enable the plugin in your `config/plugins.js` (or `config/plugins.ts`):
   ```javascript
   module.exports = {
     // ... other plugins
     'import-export': {
       enabled: true,
       resolve: './src/plugins/import-export'
     },
   };
   ```

3. Restart your Strapi server:
   ```bash
   npm run develop
   ```

## API Endpoints

All endpoints are prefixed with `/api/import-export/`.

### 1. Get Available Content Types

Returns a list of all content types that can be exported/imported.

```http
GET /api/import-export/content-types
```

**Response:**
```json
{
  "data": [
    {
      "uid": "api::article.article",
      "apiID": "article",
      "displayName": "Article"
    }
  ]
}
```

### 2. Export Single Content Type

Export all entries of a specific content type.

```http
GET /api/import-export/export/:contentType
```

**Parameters:**
- `contentType` (required): The UID of the content type (e.g., `api::article.article`)

**Example:**
```bash
curl http://localhost:1337/api/import-export/export/api::article.article
```

**Response:**
```json
{
  "contentType": "api::article.article",
  "data": [
    {
      "id": 1,
      "title": "My Article",
      "content": "Article content...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1,
  "exportedAt": "2024-01-01T12:00:00.000Z"
}
```

### 3. Export All Content Types

Export all entries from all available content types.

```http
GET /api/import-export/export-all
```

**Example:**
```bash
curl http://localhost:1337/api/import-export/export-all > backup.json
```

**Response:**
```json
{
  "exportedAt": "2024-01-01T12:00:00.000Z",
  "contentTypes": {
    "api::article.article": {
      "contentType": "api::article.article",
      "data": [...],
      "count": 5
    },
    "api::category.category": {
      "contentType": "api::category.category",
      "data": [...],
      "count": 3
    }
  }
}
```

### 4. Import Data

Import data for a specific content type.

```http
POST /api/import-export/import/:contentType
Content-Type: application/json

{
  "data": [
    {
      "title": "New Article",
      "content": "Content here..."
    }
  ]
}
```

**Parameters:**
- `contentType` (required): The UID of the content type (e.g., `api::article.article`)

**Body:**
- `data` (required): Array of entries to import

**Example:**
```bash
curl -X POST http://localhost:1337/api/import-export/import/api::article.article \
  -H "Content-Type: application/json" \
  -d '{
    "data": [
      {
        "title": "Imported Article",
        "content": "This is an imported article"
      }
    ]
  }'
```

**Response:**
```json
{
  "contentType": "api::article.article",
  "success": 1,
  "updated": 0,
  "failed": 0,
  "results": {
    "success": [
      {
        "id": 2,
        "entry": {
          "id": 2,
          "title": "Imported Article",
          "content": "This is an imported article"
        }
      }
    ],
    "updated": [],
    "failed": []
  },
  "importedAt": "2024-01-01T12:30:00.000Z"
}
```

## Usage Examples

### Export and Import Workflow

1. **Export your content:**
   ```bash
   # Export a specific content type
   curl http://localhost:1337/api/import-export/export/api::article.article > articles.json
   
   # Or export everything
   curl http://localhost:1337/api/import-export/export-all > full-backup.json
   ```

2. **Modify the exported data (optional)**

3. **Import back to Strapi:**
   ```bash
   curl -X POST http://localhost:1337/api/import-export/import/api::article.article \
     -H "Content-Type: application/json" \
     -d @articles.json
   ```

### JavaScript Example

```javascript
// Export content
const exportData = async (contentType) => {
  const response = await fetch(
    `http://localhost:1337/api/import-export/export/${contentType}`
  );
  return await response.json();
};

// Import content
const importData = async (contentType, data) => {
  const response = await fetch(
    `http://localhost:1337/api/import-export/import/${contentType}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    }
  );
  return await response.json();
};

// Usage
const articles = await exportData('api::article.article');
await importData('api::article.article', articles.data);
```

## Architecture

The plugin follows Strapi v4's recommended structure:

```
strapi-v4-import-export/
├── server/
│   ├── controllers/
│   │   ├── index.js
│   │   └── import-export-controller.js
│   ├── services/
│   │   ├── index.js
│   │   └── import-export-service.js
│   ├── routes/
│   │   └── index.js
│   └── index.js
├── package.json
└── README.md
```

### Components

- **Controllers**: Handle HTTP requests and responses, validate inputs, and check permissions
- **Services**: Contain the core business logic for import/export operations
- **Routes**: Define the API endpoints and map them to controller methods

## Security

The plugin includes basic security checks:

- Authentication validation when authorization headers are present
- Content type validation to prevent invalid operations
- Input validation for all endpoints
- Error logging without exposing sensitive information

For production use, consider:
- Enabling stricter authentication requirements
- Adding role-based access control (RBAC)
- Rate limiting import/export operations
- Implementing data validation schemas

## Error Handling

The plugin provides comprehensive error handling:

- **Validation Errors**: Returns 400 Bad Request for invalid inputs
- **Authentication Errors**: Returns 401 Unauthorized when required
- **Not Found Errors**: Returns appropriate errors for non-existent content types
- **Server Errors**: Logs detailed error information while returning safe messages to clients

During import operations:
- Successful imports are tracked separately from failures
- Each failed entry is logged with specific error details
- Import continues even if individual entries fail
- Final report includes counts of successful, updated, and failed imports

## Limitations

- System content types (admin, upload, permissions, roles) are excluded from export/import
- Single-type content types are currently excluded
- Relation fields are populated during export but may require special handling during import
- Media files (uploaded assets) are not included in the export

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Author

MUSTAQ-AHAMMAD

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export).