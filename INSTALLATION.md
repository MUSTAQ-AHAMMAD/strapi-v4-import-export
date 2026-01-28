# Installation Guide

This guide provides detailed instructions for installing the Strapi v4 Import/Export plugin into your **existing Strapi project**.

> 💡 **TypeScript Users**: This JavaScript plugin works perfectly in TypeScript Strapi projects. See the [TypeScript Configuration](#for-typescript-projects-configpluginsts) section for specific setup instructions.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: Clone from GitHub (Recommended)](#method-1-clone-from-github-recommended)
  - [Method 2: Download and Copy](#method-2-download-and-copy)
  - [Method 3: Git Submodule](#method-3-git-submodule)
- [Configuration](#configuration)
  - [TypeScript Projects](#for-typescript-projects-configpluginsts)
  - [JavaScript Projects](#for-javascript-projects-configpluginsjs)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## Prerequisites

Before installing this plugin, ensure you have:

- ✅ **Strapi v4.x** installed and working
- ✅ **Node.js** version 14.x or higher
- ✅ **npm** or **yarn** package manager
- ✅ An existing Strapi project (if not, create one with `npx create-strapi-app@latest my-project`)
- ℹ️ **TypeScript or JavaScript**: This plugin works with both TypeScript and JavaScript Strapi projects

### Check Your Strapi Version

```bash
# Navigate to your Strapi project
cd /path/to/your-strapi-project

# Check Strapi version
npm list @strapi/strapi
```

You should see version 4.x.x. If you have Strapi v3, this plugin will **not work**.

## Installation Methods

### Method 1: Clone from GitHub (Recommended)

This is the easiest and most common method.

#### Step 1: Navigate to Your Strapi Project

```bash
cd /path/to/your-strapi-project
```

#### Step 2: Create Plugins Directory (if it doesn't exist)

```bash
mkdir -p src/plugins
```

#### Step 3: Clone the Plugin

```bash
cd src/plugins
git clone https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export.git import-export
```

**Note:** The folder must be named `import-export` (not `strapi-v4-import-export`).

#### Step 4: Go Back to Project Root

```bash
cd ../..
```

Your structure should now look like:
```
your-strapi-project/
├── src/
│   ├── plugins/
│   │   └── import-export/    # ← Plugin installed here
│   ├── api/
│   └── ...
├── config/
├── package.json
└── ...
```

### Method 2: Download and Copy

If you prefer not to use git:

#### Step 1: Download the Plugin

1. Go to https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file

#### Step 2: Copy to Your Project

```bash
# Navigate to your Strapi project
cd /path/to/your-strapi-project

# Create plugins directory if needed
mkdir -p src/plugins

# Copy the extracted folder (rename it to 'import-export')
cp -r /path/to/extracted/strapi-v4-import-export ./src/plugins/import-export
```

**Important:** Rename the folder to `import-export` (remove the `strapi-v4-` prefix).

### Method 3: Git Submodule

For advanced users who want to track the plugin as a git submodule:

```bash
cd /path/to/your-strapi-project
mkdir -p src/plugins
git submodule add https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export.git src/plugins/import-export
git submodule update --init --recursive
```

## Configuration

After installing the plugin files, you need to enable it in your Strapi configuration.

> **💡 Important for TypeScript Projects**: This JavaScript plugin works seamlessly in TypeScript Strapi projects. Strapi v4 natively supports JavaScript plugins in TypeScript applications.

### Step 1: Create or Edit Plugin Configuration

Choose the appropriate configuration based on your project type:

#### For TypeScript Projects (`config/plugins.ts`)

**If your Strapi project uses TypeScript**, create or edit `config/plugins.ts`:

```typescript
export default {
  // ... your existing plugins
  'import-export': {
    enabled: true,
    resolve: './src/plugins/import-export'
  },
};
```

**Example with multiple plugins:**

```typescript
export default {
  // Existing plugins
  'graphql': {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
    }
  },
  
  // Import-Export plugin
  'import-export': {
    enabled: true,
    resolve: './src/plugins/import-export'
  },
};
```

**Key points for TypeScript:**
- ✅ Use `export default` instead of `module.exports`
- ✅ File must be named `config/plugins.ts` (not `.js`)
- ✅ JavaScript plugins work perfectly in TypeScript Strapi projects
- ✅ No type definitions needed - Strapi handles integration automatically

#### For JavaScript Projects (`config/plugins.js`)

If your Strapi project uses JavaScript, create or edit `config/plugins.js`:

```javascript
module.exports = {
  // ... your existing plugins
  'import-export': {
    enabled: true,
    resolve: './src/plugins/import-export'
  },
};
```

**Example with multiple plugins:**

```javascript
module.exports = {
  // Existing plugins
  'graphql': {
    enabled: true,
    config: {
      // ... graphql config
    }
  },
  
  // Add the import-export plugin
  'import-export': {
    enabled: true,
    resolve: './src/plugins/import-export'
  },
};
```

### Step 2: Restart Strapi

After configuration, restart your Strapi server:

```bash
# Stop the server (Ctrl+C if running)

# Start in development mode
npm run develop

# OR for production
npm run start
```

## Verification

After installation and restart, verify the plugin is working:

### 1. Check Server Logs

Look for messages indicating the plugin loaded successfully. You should see something like:

```
[INFO] ⏳ Starting the server...
[INFO] ✅ Server is running
```

### 2. Test the API Endpoints

Get an authentication token from your Strapi admin panel (Settings → API Tokens → Create new API Token).

Then test the plugin endpoints:

```bash
# Set your token
export TOKEN="your-api-token-here"

# Test: List available content types
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:1337/api/import-export/content-types
```

**Expected Response:**
```json
{
  "data": [
    {
      "uid": "api::article.article",
      "apiID": "article",
      "displayName": "Article"
    }
    // ... more content types
  ]
}
```

### 3. Check Plugin in File System

Verify the plugin files are in the correct location:

```bash
ls -la src/plugins/import-export/
```

You should see:
```
server/
package.json
README.md
...
```

## Troubleshooting

### Issue: Plugin Not Loading

**Symptoms:** No import-export endpoints available, no logs about the plugin.

**Solutions:**

1. **Check the folder name:**
   ```bash
   ls src/plugins/
   ```
   The folder must be named exactly `import-export`, not `strapi-v4-import-export`.

2. **Check the configuration file:**
   - Verify `config/plugins.js` (or `.ts`) exists
   - Ensure the syntax is correct (no missing commas, brackets)
   - Verify the `resolve` path: `'./src/plugins/import-export'`

3. **Check file permissions:**
   ```bash
   chmod -R 755 src/plugins/import-export
   ```

4. **Clear Strapi cache:**
   ```bash
   rm -rf .cache
   npm run build
   npm run develop
   ```

### Issue: 404 Not Found on Endpoints

**Symptoms:** Strapi starts but API endpoints return 404.

**Solutions:**

1. **Verify plugin is enabled:**
   Check `config/plugins.js` has `enabled: true`

2. **Check the URL:**
   Endpoints are at `/api/import-export/...`, not `/import-export/...`

3. **Restart the server:**
   ```bash
   npm run develop
   ```

### Issue: 401 Unauthorized

**Symptoms:** Endpoints return "Unauthorized" error.

**Solutions:**

1. **Check authentication token:**
   - Create a new API token in Strapi admin: Settings → API Tokens
   - Use the token in the Authorization header: `Bearer YOUR_TOKEN`

2. **Test with admin user JWT:**
   - Login to Strapi admin
   - Open browser console
   - Check for JWT token in localStorage or cookies
   - Use that token for testing

### Issue: Module Not Found Errors

**Symptoms:** Errors about missing modules when starting Strapi.

**Solutions:**

The plugin has no external dependencies, but if you see errors:

1. **Reinstall Strapi dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Check Node version:**
   ```bash
   node --version
   ```
   Should be v14 or higher.

### Issue: TypeScript Errors

**Symptoms:** TypeScript compilation errors.

**Solutions:**

1. **Rename config file:**
   If using TypeScript, ensure your config file is `config/plugins.ts`, not `.js`

2. **Update tsconfig:**
   Add the plugin path to your `tsconfig.json` if needed:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "strapi-v4-import-export": ["./src/plugins/import-export"]
       }
     }
   }
   ```

### Issue: Port Already in Use

**Symptoms:** Error "Port 1337 already in use".

**Solutions:**

1. **Kill existing process:**
   ```bash
   # Find process using port 1337
   lsof -i :1337
   
   # Kill it (replace PID with actual process ID)
   kill -9 PID
   ```

2. **Change Strapi port:**
   Edit `.env` file:
   ```
   PORT=1338
   ```

## Uninstallation

If you need to remove the plugin:

### Step 1: Disable in Configuration

Edit `config/plugins.js`:

```javascript
module.exports = {
  'import-export': {
    enabled: false,  // ← Set to false
    resolve: './src/plugins/import-export'
  },
};
```

Or remove the entire `'import-export'` block.

### Step 2: Delete Plugin Files

```bash
rm -rf src/plugins/import-export
```

### Step 3: Restart Strapi

```bash
npm run develop
```

## Next Steps

After successful installation:

1. 📖 Read the [README.md](README.md) for API documentation
2. 🚀 Follow the [QUICKSTART.md](QUICKSTART.md) to start using the plugin
3. 🧪 Check [TESTING.md](TESTING.md) for testing guidelines
4. 💡 See usage examples in the README

## Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/MUSTAQ-AHAMMAD/strapi-v4-import-export/issues)
2. Read the [Troubleshooting](#troubleshooting) section above
3. Create a new issue with:
   - Your Strapi version
   - Node.js version
   - Error messages
   - Steps you've tried

## Video Tutorial

For a visual walkthrough, we recommend:
1. Creating a test Strapi project: https://docs.strapi.io/dev-docs/quick-start
2. Following the installation steps above
3. Testing with the Quick Start guide

---

**Successfully installed?** → Continue to [QUICKSTART.md](QUICKSTART.md) to start using the plugin! 🎉
