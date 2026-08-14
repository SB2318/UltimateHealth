import {formatViewCount} from '../Utils';

describe('formatViewCount', () => {
  it('returns 0 views for undefined', () => {
    expect(formatViewCount(undefined)).toBe('0 views');
  });

  it('returns singular for 1 view', () => {
    expect(formatViewCount(1)).toBe('1 view');
  });

  it('returns plural for counts other than 1', () => {
    expect(formatViewCount(0)).toBe('0 views');
    expect(formatViewCount(2)).toBe('2 views');
    expect(formatViewCount(125)).toBe('125 views');
  });
});
