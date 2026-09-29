import {calculateReadTime, getReadableWordCount, getReadTime} from '@/src/lib/utils/readTime';

describe('read-time utilities', () => {
  it('calculates a minimum one-minute read', () => {
    expect(calculateReadTime('A short article')).toBe(1);
    expect(getReadTime('')).toBe('1 min read');
  });

  it('calculates 200 words as one minute and rounds up', () => {
    const twoHundredWords = Array.from({length: 200}, () => 'health').join(' ');
    const twoHundredOneWords = `${twoHundredWords} wellness`;

    expect(calculateReadTime(twoHundredWords)).toBe(1);
    expect(calculateReadTime(twoHundredOneWords)).toBe(2);
  });

  it('counts readable words in HTML while ignoring scripts and images', () => {
    const html = '<p>Healthy <strong>habits</strong></p><img src="cover.jpg"><script>ignore this</script>';

    expect(getReadableWordCount(html)).toBe(2);
  });
});
