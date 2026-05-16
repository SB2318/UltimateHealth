/**
 * Web stub for react-native-snackbar.
 * Falls back to console.log on web since native Snackbar is not available.
 */

const LENGTH_SHORT = 2000;
const LENGTH_LONG = 4000;
const LENGTH_INDEFINITE = -1;

const show = ({ text }) => {
  console.log('[Snackbar]', text);
};

const dismiss = () => {};

const Snackbar = {
  show,
  dismiss,
  LENGTH_SHORT,
  LENGTH_LONG,
  LENGTH_INDEFINITE,
};

export default Snackbar;
module.exports = Snackbar;
