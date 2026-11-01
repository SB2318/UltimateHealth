const Snackbar = {
  LENGTH_SHORT: 2000,
  LENGTH_LONG: 3500,
  show: ({text}) => {
    if (typeof window !== 'undefined') {
      window.alert(text);
    }
  },
};

module.exports = Snackbar;
module.exports.default = Snackbar;
