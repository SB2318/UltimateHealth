const Snackbar = {
  LENGTH_SHORT: 1500,
  LENGTH_LONG: 3500,
  LENGTH_INDEFINITE: -1,
  show: options => {
    if (options?.text) {
      console.log(options.text);
    }
  },
  dismiss: () => undefined,
};

module.exports = Snackbar;
module.exports.default = Snackbar;
