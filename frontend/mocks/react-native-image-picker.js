const launchImageLibrary = (_options, callback) => {
  const response = {didCancel: true, assets: []};
  if (typeof callback === 'function') {
    callback(response);
  }
  return Promise.resolve(response);
};

const launchCamera = launchImageLibrary;

module.exports = {
  launchCamera,
  launchImageLibrary,
};
