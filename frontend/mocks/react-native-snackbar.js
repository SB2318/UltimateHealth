// Web mock for react-native-snackbar
// On web, NativeModules.RNSnackbar is undefined, which crashes at import time.
// This mock provides a no-op implementation that doesn't access NativeModules.

const Snackbar = {
  LENGTH_SHORT: 0,
  LENGTH_LONG: 1,
  LENGTH_INDEFINITE: -1,
  DISMISS_EVENT_SWIPE: 'swipe',
  DISMISS_EVENT_ACTION: 'action',
  DISMISS_EVENT_TIMEOUT: 'timeout',
  DISMISS_EVENT_MANUAL: 'manual',
  DISMISS_EVENT_CONSECUTIVE: 'consecutive',
  SHOW_EVENT: 'show',
  show: () => {},
  dismiss: () => {},
};

export default Snackbar;
