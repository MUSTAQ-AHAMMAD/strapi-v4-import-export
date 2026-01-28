'use strict';

module.exports = [
  {
    method: 'POST',
    path: '/import/:contentType',
    handler: 'importExportController.importData',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/export/:contentType',
    handler: 'importExportController.exportData',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/export-all',
    handler: 'importExportController.exportAll',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/content-types',
    handler: 'importExportController.getContentTypes',
    config: {
      policies: [],
      auth: false,
    },
  },
];
