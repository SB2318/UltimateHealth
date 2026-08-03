import { Alert, Linking } from 'react-native';

interface SafeOpenUrlOptions {
    /** Custom message shown when the URL can't be opened. */
    errorMessage?: string;
    /** Custom title for the error alert. */
    errorTitle?: string;
    /** Called after a successful open. */
    onSuccess?: () => void;
    /** Called after a failure (in addition to showing the alert). */
    onError?: (error: unknown) => void;
}

const DEFAULT_ERROR_TITLE = 'Unable to Open Link';
const DEFAULT_ERROR_MESSAGE =
    'This link could not be opened on your device. Please check your internet connection or try again later.';

/**
 * Safely opens a URL, validating it, checking device support,
 * and handling any rejected promises with consistent user feedback.
 */
export async function safeOpenUrl(
    url: string | null | undefined,
    options: SafeOpenUrlOptions = {},
): Promise<boolean> {
    const {
    errorMessage = DEFAULT_ERROR_MESSAGE,
    errorTitle = DEFAULT_ERROR_TITLE,
    onSuccess,
    onError,
    } = options;

  // 1. Basic validation
    if (!url || typeof url !== 'string' || url.trim().length === 0) {
    Alert.alert(errorTitle, 'This link is invalid or missing.');
    onError?.(new Error('Empty or invalid URL'));
    return false;
    }

    let normalizedUrl = url.trim();

  // Guard against obviously malformed URLs (no scheme at all)
    const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(normalizedUrl);
    if (!hasScheme) {
    // Assume https if someone passed "github.com/..." without a scheme
    normalizedUrl = `https://${normalizedUrl}`;
    }

    try {
    // 2. Check support where the platform allows us to
    const supported = await Linking.canOpenURL(normalizedUrl);

    if (!supported) {
        Alert.alert(errorTitle, errorMessage);
        onError?.(new Error(`Unsupported URL: ${normalizedUrl}`));
        return false;
    }

    // 3. Attempt to open, catching rejected promises
    await Linking.openURL(normalizedUrl);
    onSuccess?.();
    return true;
    } catch (error) {
    Alert.alert(errorTitle, errorMessage);
    onError?.(error);
    return false;
    }
}