'use strict';

module.exports = ({ strapi }) => ({
  /**
   * Get all available content types
   */
  async getContentTypes(ctx) {
    try {
      // Check user permissions - authentication required
      if (!ctx.state.user) {
        return ctx.unauthorized('You must be authenticated to access this resource');
      }

      const contentTypes = strapi
        .plugin('import-export')
        .service('importExportService')
        .getContentTypes();

      ctx.body = {
        data: contentTypes,
      };
    } catch (error) {
      strapi.log.error('Error getting content types:', error);
      ctx.throw(500, 'An error occurred while fetching content types');
    }
  },

  /**
   * Export data for a specific content type
   */
  async exportData(ctx) {
    try {
      const { contentType } = ctx.params;

      // Check user permissions - authentication required
      if (!ctx.state.user) {
        return ctx.unauthorized('You must be authenticated to export data');
      }

      if (!contentType) {
        return ctx.badRequest('Content type parameter is required');
      }

      const exportedData = await strapi
        .plugin('import-export')
        .service('importExportService')
        .exportData(contentType);

      ctx.body = exportedData;
    } catch (error) {
      strapi.log.error('Error exporting data:', error);
      ctx.throw(500, error.message || 'An error occurred while exporting data');
    }
  },

  /**
   * Export all content types
   */
  async exportAll(ctx) {
    try {
      // Check user permissions - authentication required
      if (!ctx.state.user) {
        return ctx.unauthorized('You must be authenticated to export data');
      }

      const exportedData = await strapi
        .plugin('import-export')
        .service('importExportService')
        .exportAll();

      ctx.body = exportedData;
    } catch (error) {
      strapi.log.error('Error exporting all data:', error);
      ctx.throw(500, error.message || 'An error occurred while exporting all data');
    }
  },

  /**
   * Import data for a specific content type
   */
  async importData(ctx) {
    try {
      const { contentType } = ctx.params;
      const { data } = ctx.request.body;

      // Check user permissions - authentication required
      if (!ctx.state.user) {
        return ctx.unauthorized('You must be authenticated to import data');
      }

      if (!contentType) {
        return ctx.badRequest('Content type parameter is required');
      }

      if (!data || !Array.isArray(data)) {
        return ctx.badRequest('Request body must contain a "data" array');
      }

      const importResult = await strapi
        .plugin('import-export')
        .service('importExportService')
        .importData(contentType, data);

      ctx.body = importResult;
    } catch (error) {
      strapi.log.error('Error importing data:', error);
      ctx.throw(500, error.message || 'An error occurred while importing data');
    }
  },
});
