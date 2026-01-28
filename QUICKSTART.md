# Quick Start Guide

Get started with the Strapi v4 Import/Export plugin in minutes!

## 1. Installation (2 minutes)

### Option A: Copy to Your Project
```bash
# Copy the plugin to your Strapi project's plugins directory
cp -r strapi-v4-import-export ./your-strapi-project/src/plugins/import-export
```

### Option B: Clone Repository
```bash
# Clone directly into your Strapi project
cd your-strapi-project/src/plugins
git clone https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export.git import-export
```

## 2. Enable the Plugin (1 minute)

Create or edit `config/plugins.js`:

```javascript
module.exports = {
  'import-export': {
    enabled: true,
    resolve: './src/plugins/import-export'
  },
};
```

## 3. Restart Strapi (1 minute)

```bash
npm run develop
```

## 4. Get Your Authentication Token (1 minute)

1. Log into your Strapi admin panel
2. Go to Settings → API Tokens
3. Create a new token or use an existing one
4. Copy the token

Or use your user JWT token after logging in.

## 5. Test the Plugin (2 minutes)

Set your token as an environment variable:
```bash
export TOKEN="your_token_here"
```

### List available content types:
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/content-types
```

### Export a content type:
```bash
# Replace 'api::article.article' with your content type UID
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/export/api::article.article
```

### Import data:
```bash
# Create a test file
echo '{
  "data": [
    {
      "title": "My First Import",
      "content": "This was imported!"
    }
  ]
}' > test-import.json

# Import it
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @test-import.json \
  http://localhost:1337/api/import-export/import/api::article.article
```

## 6. Start Using! 🎉

You're all set! The plugin is now ready to use.

## Common Use Cases

### Backup All Content
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/export-all \
  > backup-$(date +%Y%m%d).json
```

### Restore Content
```bash
# Extract specific content type from backup
cat backup-20260128.json | jq '.contentTypes["api::article.article"].data' > articles.json

# Import it
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @articles.json \
  http://localhost:1337/api/import-export/import/api::article.article
```

### Copy Content Between Environments
```bash
# Export from staging
curl -H "Authorization: Bearer $STAGING_TOKEN" \
  http://staging.example.com/api/import-export/export/api::article.article \
  > articles-from-staging.json

# Import to production
curl -X POST \
  -H "Authorization: Bearer $PROD_TOKEN" \
  -H "Content-Type: application/json" \
  -d @articles-from-staging.json \
  http://production.example.com/api/import-export/import/api::article.article
```

## Troubleshooting

### Error: 401 Unauthorized
- Make sure your token is valid
- Check the Authorization header format: `Bearer <token>`

### Error: Content type does not exist
- Verify the content type UID is correct
- List available content types first

### Plugin not loading
- Check `config/plugins.js` syntax
- Ensure the plugin path is correct
- Restart Strapi after configuration changes

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [TESTING.md](TESTING.md) for comprehensive testing guide
- See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## Need Help?

- Check the [GitHub Issues](https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export/issues)
- Read the full documentation
- Create a new issue if you can't find a solution

Happy importing and exporting! 🚀
