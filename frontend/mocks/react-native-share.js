const open = async options => {
  const title = options?.title || options?.subject || '';
  const text = options?.message || '';
  const url = options?.url || '';

  if (typeof navigator !== 'undefined' && navigator.share) {
    await navigator.share({title, text, url});
    return {success: true, message: 'Shared with browser share sheet'};
  }

  const shareText = [title, text, url].filter(Boolean).join('\n');

  if (typeof navigator !== 'undefined' && navigator.clipboard && shareText) {
    await navigator.clipboard.writeText(shareText);
    return {success: true, message: 'Share details copied to clipboard'};
  }

  if (typeof window !== 'undefined' && url) {
    window.open(url, '_blank', 'noopener,noreferrer');
    return {success: true, message: 'Opened share URL'};
  }

  return {success: false, message: 'Web share is not available'};
};

const Share = {
  open,
};

module.exports = Share;
module.exports.default = Share;
