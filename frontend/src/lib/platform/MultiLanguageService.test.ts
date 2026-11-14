
import Tts from "react-native-tts";
import MultiLanguageTTSService from "./MultiLanguageService";

describe("MultiLanguageTTSService", () => {
  const resetInitialization = () => {
    const service = MultiLanguageTTSService as unknown as {
      _isTtsInitialized: boolean;
      initializationPromise: Promise<boolean> | null;
    };

    service._isTtsInitialized = false;
    service.initializationPromise = null;
  };

  const validVoice = {
    id: "voice-en-IN",
    name: "English India",
    language: "en-IN",
    quality: 500,
    latency: 100,
    networkConnectionRequired: false,
    notInstalled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    resetInitialization();

    // Reset mocks to prevent test implementations leaking between tests.
    (Tts.getInitStatus as jest.Mock)
      .mockReset()
      .mockResolvedValue("success");

    (Tts.setDefaultRate as jest.Mock)
      .mockReset()
      .mockResolvedValue("success");

    (Tts.setDefaultPitch as jest.Mock)
      .mockReset()
      .mockResolvedValue("success");

    (Tts.setDefaultVoice as jest.Mock)
      .mockReset()
      .mockResolvedValue("success");

    (Tts.requestInstallData as jest.Mock)
      .mockReset()
      .mockResolvedValue("success");

    (Tts.stop as jest.Mock)
      .mockReset()
      .mockResolvedValue(true);

    (Tts.voices as jest.Mock)
      .mockReset()
      .mockResolvedValue([]);

    (Tts.speak as jest.Mock)
      .mockReset()
      .mockReturnValue("mock-utterance-id");

    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("initializes TTS successfully", async () => {
    await expect(MultiLanguageTTSService.init()).resolves.toBe(true);

    expect(Tts.getInitStatus).toHaveBeenCalledTimes(1);
    expect(Tts.setDefaultRate).toHaveBeenCalledWith(0.5);
    expect(Tts.setDefaultPitch).toHaveBeenCalledWith(1.0);
  });

  it("handles initialization failure", async () => {
    (Tts.getInitStatus as jest.Mock).mockRejectedValueOnce(
      new Error("Initialization failed")
    );

    await expect(MultiLanguageTTSService.init()).resolves.toBe(false);

    expect(console.warn).toHaveBeenCalled();
    expect(Tts.setDefaultRate).not.toHaveBeenCalled();
  });

  it("returns a matching available voice", async () => {
    (Tts.voices as jest.Mock).mockResolvedValueOnce([
      { ...validVoice, id: "uninstalled", notInstalled: true },
      { ...validVoice, id: "network", networkConnectionRequired: true },
      { ...validVoice, language: "hi-IN" },
      validVoice,
    ]);

    const voice =
      await MultiLanguageTTSService.getAvailableVoice("en-IN");

    expect(voice).toEqual(validVoice);
  });

  it("handles voice query failure gracefully", async () => {
    (Tts.voices as jest.Mock).mockRejectedValueOnce(
      new Error("Voice query failed")
    );

    await expect(
      MultiLanguageTTSService.getAvailableVoice("en-IN")
    ).resolves.toBeNull();

    expect(console.warn).toHaveBeenCalled();
  });

  it("does not request voice installation when voice query fails", async () => {
    (Tts.voices as jest.Mock).mockRejectedValueOnce(
      new Error("Voice query failed")
    );

    await expect(
      MultiLanguageTTSService.ensureLanguage("en-IN")
    ).resolves.toBe(false);

    expect(Tts.requestInstallData).not.toHaveBeenCalled();
  });

  it("returns true when a voice is configured successfully", async () => {
    (Tts.voices as jest.Mock).mockResolvedValueOnce([validVoice]);

    await expect(
      MultiLanguageTTSService.ensureLanguage("en-IN")
    ).resolves.toBe(true);

    expect(Tts.setDefaultVoice).toHaveBeenCalledWith(validVoice.id);
  });

  it("handles voice configuration failure", async () => {
    (Tts.voices as jest.Mock).mockResolvedValueOnce([validVoice]);

    (Tts.setDefaultVoice as jest.Mock).mockRejectedValueOnce(
      new Error("Voice setting failed")
    );

    await expect(
      MultiLanguageTTSService.ensureLanguage("en-IN")
    ).resolves.toBe(false);

    expect(console.warn).toHaveBeenCalled();
  });

  it("does not speak when initialization fails", async () => {
    (Tts.getInitStatus as jest.Mock).mockRejectedValueOnce(
      new Error("Initialization failed")
    );

    await MultiLanguageTTSService.speak("Hello", "en-IN");

    expect(Tts.speak).not.toHaveBeenCalled();
  });

  it("speaks when initialization and language setup succeed", async () => {
    (Tts.voices as jest.Mock).mockResolvedValueOnce([validVoice]);

    await MultiLanguageTTSService.speak("Hello", "en-IN");

    expect(Tts.getInitStatus).toHaveBeenCalledTimes(1);
    expect(Tts.stop).toHaveBeenCalled();
    expect(Tts.setDefaultVoice).toHaveBeenCalledWith(validVoice.id);
    expect(Tts.speak).toHaveBeenCalledWith("Hello");
  });

  it("handles synchronous speaking errors", async () => {
    (Tts.voices as jest.Mock).mockResolvedValueOnce([validVoice]);

    (Tts.speak as jest.Mock).mockImplementationOnce(() => {
      throw new Error("Speaking failed");
    });

    await expect(
      MultiLanguageTTSService.speak("Hello", "en-IN")
    ).resolves.toBeUndefined();

    expect(console.warn).toHaveBeenCalled();
  });

  it("does not initialize TTS again on repeated speak calls", async () => {
    (Tts.voices as jest.Mock).mockResolvedValue([validVoice]);

    await MultiLanguageTTSService.speak("First message", "en-IN");
    await MultiLanguageTTSService.speak("Second message", "en-IN");

    expect(Tts.getInitStatus).toHaveBeenCalledTimes(1);
    expect(Tts.setDefaultRate).toHaveBeenCalledTimes(1);
    expect(Tts.setDefaultPitch).toHaveBeenCalledTimes(1);
    expect(Tts.speak).toHaveBeenCalledTimes(2);
  });

  it("shares one initialization between concurrent speak calls", async () => {
    let resolveInitialization!: (value: "success") => void;

    (Tts.getInitStatus as jest.Mock).mockImplementationOnce(
      () =>
        new Promise<"success">((resolve) => {
          resolveInitialization = resolve;
        })
    );

    (Tts.voices as jest.Mock).mockResolvedValue([validVoice]);

    const firstSpeak = MultiLanguageTTSService.speak(
      "First message",
      "en-IN"
    );

    const secondSpeak = MultiLanguageTTSService.speak(
      "Second message",
      "en-IN"
    );

    expect(Tts.getInitStatus).toHaveBeenCalledTimes(1);

    resolveInitialization("success");

    await Promise.all([firstSpeak, secondSpeak]);

    expect(Tts.getInitStatus).toHaveBeenCalledTimes(1);
    expect(Tts.setDefaultRate).toHaveBeenCalledTimes(1);
    expect(Tts.setDefaultPitch).toHaveBeenCalledTimes(1);
    expect(Tts.speak).toHaveBeenCalledTimes(2);
  });
});
