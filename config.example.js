/**
 * JavaScript configuration example for enabling the import-export plugin
 * 
 * This file should be placed at:
 * config/plugins.js (for JavaScript Strapi projects)
 * 
 * For TypeScript projects, see config.example.ts
 */

module.exports = {
  // ... other plugins configuration
  
  'import-export': {
    enabled: true,
    // Path to the plugin in your project's plugins directory
    resolve: './src/plugins/import-export',
    
    // Or if installed as an npm package (not currently available)
    // resolve: './node_modules/strapi-v4-import-export',
  },
  
  // ... other plugins configuration
};
