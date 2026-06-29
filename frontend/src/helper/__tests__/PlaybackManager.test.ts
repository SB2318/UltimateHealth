jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

import {getPlaybackProgressPercent} from '../PlaybackManager';

describe('getPlaybackProgressPercent', () => {
  it('returns a percentage for valid playback progress', () => {
    expect(getPlaybackProgressPercent({position: 30, duration: 120})).toBe(25);
  });

  it('clamps progress to the supported range', () => {
    expect(getPlaybackProgressPercent({position: -10, duration: 120})).toBe(0);
    expect(getPlaybackProgressPercent({position: 150, duration: 120})).toBe(100);
  });

  it('returns zero for invalid or unsupported duration values', () => {
    expect(getPlaybackProgressPercent({position: 30, duration: 0})).toBe(0);
    expect(getPlaybackProgressPercent({position: 30, duration: -1})).toBe(0);
    expect(getPlaybackProgressPercent({position: Number.NaN, duration: 120})).toBe(0);
    expect(getPlaybackProgressPercent({position: 30, duration: Number.POSITIVE_INFINITY})).toBe(0);
  });
});
