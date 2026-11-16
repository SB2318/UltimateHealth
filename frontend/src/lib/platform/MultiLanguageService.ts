
import Tts from "react-native-tts";
import type {
  TtsEvents,
  TtsEventHandler,
  Voice,
} from "react-native-tts";
import { Platform } from "react-native";

class MultiLanguageTTSService {
  private currentVoiceId: string | null = null;
  private _isTtsInitialized = false;
  private initializationPromise: Promise<boolean> | null = null;

  async init(): Promise<boolean> {
    if (this._isTtsInitialized) {
      return true;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    const attempt = this.initializeTts();
    this.initializationPromise = attempt;

    try {
      return await attempt;
    } finally {
      if (this.initializationPromise === attempt) {
        this.initializationPromise = null;
      }
    }
  }

  private async initializeTts(): Promise<boolean> {
    try {
      await Tts.getInitStatus();
      this._isTtsInitialized = true;
    } catch (error) {
      this._isTtsInitialized = false;
      console.warn("TTS initialization failed:", error);
      return false;
    }

    // Configure rate and pitch independently.
    // Failure of either setting must not invalidate initialization.
    try {
      await Tts.setDefaultRate(0.5);
    } catch (error) {
      console.warn("Failed to configure TTS rate:", error);
    }

    try {
      await Tts.setDefaultPitch(1.0);
    } catch (error) {
      console.warn("Failed to configure TTS pitch:", error);
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

  async getAvailableVoice(
    lang: string
  ): Promise<Voice | null | undefined> {
    try {
      if (!(await this.init())) {
        return null;
      }

      const voices = await Tts.voices();

      return voices.find(
        (voice) =>
          voice.language === lang &&
          !voice.notInstalled &&
          !voice.networkConnectionRequired
      );
    } catch (error) {
      console.warn("Failed to fetch available TTS voices:", error);
      return null;
    }
  }

  async ensureLanguage(lang: string): Promise<boolean> {
    try {
      if (!(await this.init())) {
        return false;
      }

      const voice = await this.getAvailableVoice(lang);

      if (voice === null) {
        return false;
      }

      if (!voice) {
        if (Platform.OS === "android") {
          await Tts.requestInstallData();
        }

        return false;
      }

      await Tts.setDefaultLanguage(lang);
      await Tts.setDefaultVoice(voice.id);

      this.currentVoiceId = voice.id;

      return true;
    } catch (error) {
      console.warn(`Failed to configure TTS language ${lang}:`, error);
      return false;
    }
  }

  async setDefaultRate(rate: number): Promise<void> {
    try {
      if (!(await this.init())) {
        return;
      }

      await Tts.setDefaultRate(rate);
    } catch (error) {
      console.warn("Failed to change TTS rate:", error);
    }
  }

  async setDefaultPitch(pitch: number): Promise<void> {
    try {
      if (!(await this.init())) {
        return;
      }

      await Tts.setDefaultPitch(pitch);
    } catch (error) {
      console.warn("Failed to change TTS pitch:", error);
    }
  }

  // Speaks a chunk without stopping or reconfiguring the current voice.
  // This is used by ArticleScreen's chunk-based reader.
  async speakChunk(text: string): Promise<void> {
    try {
      if (!(await this.init())) {
        return;
      }

      Tts.speak(text);
    } catch (error) {
      console.warn("Failed to speak TTS chunk:", error);
    }
  }

  // Starts a new speech request with the requested language.
  async speak(text: string, lang: string): Promise<void> {
    try {
      if (!(await this.init())) {
        return;
      }

      await this.stop();

      const ready = await this.ensureLanguage(lang);

      if (!ready) {
        console.warn(`${lang} voice not installed or unavailable`);
        return;
      }

      await this.speakChunk(text);
    } catch (error) {
      console.warn(`Failed to speak text in ${lang}:`, error);
    }
  }

  addEventListener<T extends TtsEvents>(
    event: T,
    handler: TtsEventHandler<T>
  ): void {
    try {
      Tts.addEventListener(event, handler);
    } catch (error) {
      console.warn(`Failed to add TTS ${event} listener:`, error);
    }
  }

  removeEventListener<T extends TtsEvents>(
    event: T,
    handler: TtsEventHandler<T>
  ): void {
    try {
      Tts.removeEventListener(event, handler);
    } catch (error) {
      console.warn(`Failed to remove TTS ${event} listener:`, error);
    }
  }
}

export default new MultiLanguageTTSService();
