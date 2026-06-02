const Tts = {
  addEventListener: () => ({remove: () => undefined}),
  removeEventListener: () => undefined,
  getInitStatus: async () => undefined,
  setDefaultLanguage: async () => undefined,
  setDefaultRate: async () => undefined,
  setDefaultPitch: async () => undefined,
  speak: () => undefined,
  stop: async () => undefined,
  pause: async () => undefined,
  resume: async () => undefined,
  voices: async () => [],
};

module.exports = Tts;
module.exports.default = Tts;
