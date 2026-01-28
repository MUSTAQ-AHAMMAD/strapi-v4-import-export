/**
 * Example configuration for enabling the import-export plugin in a Strapi project
 * 
 * This file should be placed (or its content added) to:
 * config/plugins.js (for JavaScript projects)
 * or
 * config/plugins.ts (for TypeScript projects)
 */

module.exports = {
  // ... other plugins configuration
  
  'import-export': {
    enabled: true,
    // If the plugin is in your project's plugins directory
    resolve: './src/plugins/import-export',
    
    // Or if installed as an npm package
    // resolve: './node_modules/strapi-v4-import-export',
  },
  
  // ... other plugins configuration
};
