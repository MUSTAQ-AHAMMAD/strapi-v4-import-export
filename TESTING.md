# Testing Guide for Strapi v4 Import/Export Plugin

This guide provides instructions on how to test the import/export plugin functionality.

## Prerequisites

1. A running Strapi v4 project with the plugin installed
2. At least one content type defined (e.g., Article, Category, etc.)
3. Authentication credentials (JWT token or session)

## Manual Testing

### Setup Test Environment

1. Install the plugin in a Strapi project following the installation instructions in README.md
2. Start your Strapi server:
   ```bash
   npm run develop
   ```
3. Create a test content type (if you don't have one):
   - Go to Content-Type Builder
   - Create a simple content type (e.g., "Article" with fields: title, content)
   - Add some sample entries

### Test 1: Get Available Content Types

```bash
# Get authentication token first (from Strapi admin panel or login API)
export TOKEN="your_jwt_token_here"

# Test the endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/content-types
```

**Expected Result:**
- Status: 200 OK
- Response contains list of content types with uid, apiID, and displayName

### Test 2: Export Single Content Type

```bash
# Replace 'api::article.article' with your actual content type UID
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/export/api::article.article \
  -o exported-articles.json
```

**Expected Result:**
- Status: 200 OK
- File `exported-articles.json` created with exported data
- JSON contains: contentType, data array, count, exportedAt timestamp

### Test 3: Export All Content Types

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/export-all \
  -o full-export.json
```

**Expected Result:**
- Status: 200 OK
- File `full-export.json` created with all content types
- JSON contains: exportedAt timestamp and contentTypes object

### Test 4: Import Data

First, create a test JSON file `import-test.json`:

```json
{
  "data": [
    {
      "title": "Test Article",
      "content": "This is a test article for import functionality"
    },
    {
      "title": "Another Test",
      "content": "Another test article"
    }
  ]
}
```

Then import:

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @import-test.json \
  http://localhost:1337/api/import-export/import/api::article.article
```

**Expected Result:**
- Status: 200 OK
- Response shows: success count, updated count, failed count, and detailed results

### Test 5: Authentication Check

Test without authentication token:

```bash
curl http://localhost:1337/api/import-export/content-types
```

**Expected Result:**
- Status: 401 Unauthorized
- Error message: "You must be authenticated to access this resource"

### Test 6: Error Handling - Invalid Content Type

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/export/api::invalid.invalid
```

**Expected Result:**
- Status: 500 Internal Server Error
- Error message about content type not existing

### Test 7: Error Handling - Invalid Import Data

```bash
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": "not_an_array"}' \
  http://localhost:1337/api/import-export/import/api::article.article
```

**Expected Result:**
- Status: 400 Bad Request
- Error message: "Request body must contain a 'data' array"

## Automated Testing (Optional)

If you want to set up automated tests, here's a basic structure using Jest:

### Install Test Dependencies

```bash
npm install --save-dev jest supertest
```

### Create Test File: `__tests__/import-export.test.js`

```javascript
const request = require('supertest');

describe('Import/Export Plugin', () => {
  let app;
  let token;

  beforeAll(async () => {
    // Setup: Start Strapi app and get auth token
    // This depends on your Strapi setup
  });

  describe('GET /api/import-export/content-types', () => {
    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/import-export/content-types');
      
      expect(response.status).toBe(401);
    });

    it('should return content types when authenticated', async () => {
      const response = await request(app)
        .get('/api/import-export/content-types')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /api/import-export/export/:contentType', () => {
    it('should export content type data', async () => {
      const response = await request(app)
        .get('/api/import-export/export/api::article.article')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('contentType');
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('POST /api/import-export/import/:contentType', () => {
    it('should import content type data', async () => {
      const testData = {
        data: [
          { title: 'Test', content: 'Test content' }
        ]
      };

      const response = await request(app)
        .post('/api/import-export/import/api::article.article')
        .set('Authorization', `Bearer ${token}`)
        .send(testData);
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBeGreaterThanOrEqual(0);
      expect(response.body.failed).toBeGreaterThanOrEqual(0);
    });
  });
});
```

## Testing Checklist

- [ ] Plugin loads without errors when Strapi starts
- [ ] All endpoints require authentication
- [ ] Can list available content types
- [ ] Can export single content type
- [ ] Can export all content types
- [ ] Can import new entries
- [ ] Can update existing entries during import
- [ ] Import handles errors gracefully for invalid data
- [ ] System content types are excluded (admin, upload, users, etc.)
- [ ] Error messages are informative but don't expose sensitive data
- [ ] Export includes all fields and relations
- [ ] Large datasets don't crash the server

## Performance Testing

For large datasets, monitor:
- Memory usage during export
- Response times for export/import operations
- Database query performance

Consider using tools like:
- Apache Bench (ab) for load testing
- New Relic or similar for APM
- Database query analyzers

## Security Testing

Verify:
- [ ] Unauthenticated requests are rejected
- [ ] User data (passwords, etc.) is not exported
- [ ] Invalid content type UIDs don't cause information disclosure
- [ ] SQL injection attempts are prevented by Strapi's ORM
- [ ] Large file uploads are handled safely

## Troubleshooting

### Issue: 401 Unauthorized even with valid token

**Solution:** Check that:
- Token is valid and not expired
- Token is properly formatted in Authorization header
- User account is active

### Issue: Content type not found

**Solution:** 
- Verify content type UID is correct
- Check that content type is not filtered out (system types)
- Ensure content type exists in the Strapi application

### Issue: Import partially fails

**Solution:**
- Check logs for specific error messages
- Verify relation fields reference existing entries
- Ensure required fields are present in import data

### Issue: Out of memory during export

**Solution:**
- Export content types individually instead of all at once
- Implement pagination in the service for large datasets
- Increase Node.js memory limit: `node --max-old-space-size=4096`

## Reporting Issues

When reporting issues, please include:
- Strapi version
- Node.js version
- Plugin version
- Content type schema
- Error messages and logs
- Steps to reproduce
