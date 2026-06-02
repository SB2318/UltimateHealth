const VersionCheck = {
  getCurrentVersion: () => '1.0.0',
  getLatestVersion: async () => '1.0.0',
  needUpdate: async () => ({isNeeded: false, storeUrl: ''}),
  getStoreUrl: async () => '',
};

module.exports = VersionCheck;
module.exports.default = VersionCheck;
