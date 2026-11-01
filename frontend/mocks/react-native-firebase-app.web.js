const firebase = {
  apps: [],
  initializeApp: async config => {
    const app = {options: config};
    firebase.apps.push(app);
    return app;
  },
  app: () => firebase.apps[0],
};

module.exports = firebase;
module.exports.default = firebase;
