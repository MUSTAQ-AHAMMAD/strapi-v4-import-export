'use strict';

module.exports = ({ strapi }) => ({
  /**
   * Get all content types that can be exported/imported
   */
  getContentTypes() {
    const contentTypes = Object.keys(strapi.contentTypes)
      .filter((uid) => {
        const contentType = strapi.contentTypes[uid];
        // Filter out system content types
        return (
          !uid.startsWith('admin::') &&
          !uid.startsWith('plugin::upload') &&
          !uid.startsWith('plugin::users-permissions.permission') &&
          !uid.startsWith('plugin::users-permissions.role') &&
          contentType.kind !== 'singleType'
        );
      })
      .map((uid) => ({
        uid,
        apiID: strapi.contentTypes[uid].info?.singularName || uid,
        displayName: strapi.contentTypes[uid].info?.displayName || uid,
      }));

    return contentTypes;
  },

  /**
   * Export data for a specific content type
   */
  async exportData(contentTypeUid) {
    try {
      // Validate content type exists
      if (!strapi.contentTypes[contentTypeUid]) {
        throw new Error(`Content type ${contentTypeUid} does not exist`);
      }

      strapi.log.info(`Exporting data for content type: ${contentTypeUid}`);

      // Fetch all entries for the content type
      const entries = await strapi.entityService.findMany(contentTypeUid, {
        populate: '*',
      });

      return {
        contentType: contentTypeUid,
        data: entries,
        count: Array.isArray(entries) ? entries.length : 0,
        exportedAt: new Date().toISOString(),
      };
    } catch (error) {
      strapi.log.error(`Error exporting ${contentTypeUid}: ${error.message}`);
      throw error;
    }
  },

  /**
   * Export data for all content types
   */
  async exportAll() {
    try {
      strapi.log.info('Exporting all content types');
      const contentTypes = this.getContentTypes();
      const exportData = {};

      for (const contentType of contentTypes) {
        try {
          const data = await this.exportData(contentType.uid);
          exportData[contentType.uid] = data;
        } catch (error) {
          strapi.log.error(
            `Failed to export ${contentType.uid}: ${error.message}`
          );
          exportData[contentType.uid] = {
            error: error.message,
          };
        }
      }

      return {
        exportedAt: new Date().toISOString(),
        contentTypes: exportData,
      };
    } catch (error) {
      strapi.log.error(`Error exporting all content types: ${error.message}`);
      throw error;
    }
  },

  /**
   * Import data for a specific content type
   */
  async importData(contentTypeUid, data) {
    try {
      // Validate content type exists
      if (!strapi.contentTypes[contentTypeUid]) {
        throw new Error(`Content type ${contentTypeUid} does not exist`);
      }

      if (!Array.isArray(data)) {
        throw new Error('Data must be an array of entries');
      }

      strapi.log.info(
        `Importing ${data.length} entries for content type: ${contentTypeUid}`
      );

      const results = {
        success: [],
        failed: [],
        updated: [],
      };

      for (const entry of data) {
        try {
          // Remove id, createdAt, updatedAt from the entry to avoid conflicts
          const { id, createdAt, updatedAt, publishedAt, ...cleanEntry } =
            entry;

          let result;

          // Check if entry with same id exists
          if (id) {
            try {
              const existing = await strapi.entityService.findOne(
                contentTypeUid,
                id
              );
              if (existing) {
                // Update existing entry
                result = await strapi.entityService.update(
                  contentTypeUid,
                  id,
                  {
                    data: cleanEntry,
                  }
                );
                results.updated.push({ id: result.id, entry: result });
                strapi.log.debug(`Updated entry ${id} in ${contentTypeUid}`);
              } else {
                // Create new entry
                result = await strapi.entityService.create(contentTypeUid, {
                  data: cleanEntry,
                });
                results.success.push({ id: result.id, entry: result });
                strapi.log.debug(`Created entry in ${contentTypeUid}`);
              }
            } catch (findError) {
              // If finding fails, try to create
              result = await strapi.entityService.create(contentTypeUid, {
                data: cleanEntry,
              });
              results.success.push({ id: result.id, entry: result });
              strapi.log.debug(`Created entry in ${contentTypeUid}`);
            }
          } else {
            // Create new entry without id
            result = await strapi.entityService.create(contentTypeUid, {
              data: cleanEntry,
            });
            results.success.push({ id: result.id, entry: result });
            strapi.log.debug(`Created entry in ${contentTypeUid}`);
          }
        } catch (entryError) {
          strapi.log.error(
            `Failed to import entry: ${entryError.message}`,
            entry
          );
          results.failed.push({
            entry,
            error: entryError.message,
          });
        }
      }

      strapi.log.info(
        `Import completed for ${contentTypeUid}: ${results.success.length} created, ${results.updated.length} updated, ${results.failed.length} failed`
      );

      return {
        contentType: contentTypeUid,
        success: results.success.length,
        updated: results.updated.length,
        failed: results.failed.length,
        results,
        importedAt: new Date().toISOString(),
      };
    } catch (error) {
      strapi.log.error(`Error importing ${contentTypeUid}: ${error.message}`);
      throw error;
    }
  },
});
