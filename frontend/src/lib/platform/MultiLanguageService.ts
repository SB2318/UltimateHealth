
import Tts from "react-native-tts";
import { Platform } from "react-native";

type SupportedLang = "en-IN" | "hi-IN" | "bn-IN" | "ta-IN";

class MultiLanguageTTSService {
  private currentVoiceId: string | null = null;
  private _isTtsInitialized = false;

  async init(): Promise<boolean> {
    try {
      await Tts.getInitStatus();
      this._isTtsInitialized = true;
    } catch (error) {
      this._isTtsInitialized = false;
      console.warn("TTS initialization failed:", error);
      return false;
    }

    // Configure default speech rate and pitch.
    try {
      await Promise.all([
        Tts.setDefaultRate(0.5),
        Tts.setDefaultPitch(1.0),
      ]);
    } catch (error) {
      console.warn("Failed to configure TTS defaults:", error);
    }

    return true;
  }

  async stop(): Promise<void> {
    try {
      await Tts.stop();
    } catch (error) {
      console.warn("Failed to stop TTS:", error);
    }
  }

  async getAvailableVoice(lang: SupportedLang) {
    try {
      const voices = await Tts.voices();

      return voices.find(
        (v) =>
          v.language === lang &&
          !v.notInstalled &&
          !v.networkConnectionRequired
      );
    } catch (error) {
      console.warn("Failed to fetch available TTS voices:", error);
      return null;
    }
  }

  async ensureLanguage(lang: SupportedLang): Promise<boolean> {
    try {
      const voice = await this.getAvailableVoice(lang);

      // Stop if fetching voices failed.
      if (voice === null) {
        return false;
      }

      if (voice) {
        await Tts.setDefaultVoice(voice.id);
        this.currentVoiceId = voice.id;
        return true;
      }

      // No matching installed voice was found.
      if (Platform.OS === "android") {
        await Tts.requestInstallData();
      }

      return false;
    } catch (error) {
      console.warn(`Failed to configure TTS language ${lang}:`, error);
      return false;
    }
  }

  async speak(text: string, lang: SupportedLang): Promise<void> {
    try {
      // Initialize TTS automatically if it is not initialized.
      if (!this._isTtsInitialized) {
        const initialized = await this.init();

        if (!initialized) {
          return;
        }
      }

      await this.stop();

      const ready = await this.ensureLanguage(lang);

      if (!ready) {
        console.warn(`${lang} voice not installed`);
        return;
      }

      // Tts.speak() returns an utterance ID, not a Promise.
      Tts.speak(text);
    } catch (error) {
      console.warn(`Failed to speak text in ${lang}:`, error);
    }
  }
}

export default new MultiLanguageTTSService();
