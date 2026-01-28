'use strict';

module.exports = [
  {
    method: 'POST',
    path: '/import/:contentType',
    handler: 'importExportController.importData',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/export/:contentType',
    handler: 'importExportController.exportData',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/export-all',
    handler: 'importExportController.exportAll',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/content-types',
    handler: 'importExportController.getContentTypes',
    config: {
      policies: [],
    },
  },
];
