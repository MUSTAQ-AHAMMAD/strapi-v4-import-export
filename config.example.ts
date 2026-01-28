/**
 * TypeScript configuration example for enabling the import-export plugin
 * 
 * This file should be placed at:
 * config/plugins.ts (for TypeScript Strapi projects)
 * 
 * Note: This plugin is written in JavaScript but works perfectly in TypeScript
 * Strapi projects. Strapi v4 natively supports JavaScript plugins in TypeScript
 * applications without requiring any type definitions or conversions.
 */

export default {
  // ... other plugins configuration
  
  'import-export': {
    enabled: true,
    // Path to the plugin in your project's plugins directory
    resolve: './src/plugins/import-export',
  },
  
  // ... other plugins configuration
};
