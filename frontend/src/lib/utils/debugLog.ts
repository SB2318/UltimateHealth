/**
 * Dev-only logging helper. Prevents storage keys, error internals,
 * and other sensitive diagnostic info from leaking into production
 * system logs.
 */

type LogLevel = 'log' | 'warn' | 'error';

function log(level: LogLevel, ...args: unknown[]): void {
    if (__DEV__) {
     
    console[level](...args);
    }
}

export const debugLog = (...args: unknown[]): void => log('log', ...args);
export const debugWarn = (...args: unknown[]): void => log('warn', ...args);
export const debugError = (...args: unknown[]): void => log('error', ...args);