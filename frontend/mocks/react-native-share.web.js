const share = async options => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    return navigator.share({
      title: options.title,
      text: options.message,
      url: options.url,
    });
  }
  if (typeof navigator !== 'undefined' && navigator.clipboard && options.url) {
    await navigator.clipboard.writeText(options.url);
  }
  return {success: true};
};

module.exports = {open: share};
module.exports.default = module.exports;
