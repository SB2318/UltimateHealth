import test from 'node:test';
import assert from 'node:assert/strict';

import {
  formatPodcastDuration,
  formatPodcastDate,
  resolvePodcastCoverUrl,
  resolvePodcastAudioUrl,
  getPodcastAuthorInfo,
  normalizePodcast,
  SEED_PODCASTS,
  SEED_EPISODES,
} from './podcast-helpers.mjs';

test('formatPodcastDuration formats seconds and milliseconds correctly', () => {
  // Seconds
  assert.equal(formatPodcastDuration(0), '0:00');
  assert.equal(formatPodcastDuration(45), '0:45');
  assert.equal(formatPodcastDuration(324), '5:24');
  assert.equal(formatPodcastDuration(3665), '1:01:05');

  // Milliseconds
  assert.equal(formatPodcastDuration(300000), '5:00');
  assert.equal(formatPodcastDuration(7200000), '2:00:00');
});

test('formatPodcastDate formats dates gracefully', () => {
  assert.equal(formatPodcastDate(undefined), 'Recent');
  assert.equal(formatPodcastDate('invalid-date'), 'Recent');
  assert.match(formatPodcastDate('2026-11-02T10:00:00Z'), /Nov\s+2,\s+2026/);
});

test('resolvePodcastCoverUrl handles remote, relative, and category fallbacks', () => {
  // Remote absolute URL
  const remote = 'https://images.unsplash.com/photo-test';
  assert.equal(resolvePodcastCoverUrl(remote), remote);

  // Relative backend image
  assert.equal(
    resolvePodcastCoverUrl('cover-123.jpg'),
    'https://ultimatehealth.blog/api/getFile/cover-123.jpg'
  );

  // Category fallback
  const cardioCover = resolvePodcastCoverUrl('', { category: 'Cardiology' });
  assert.ok(cardioCover.includes('photo-1628348068343'));

  const sleepCover = resolvePodcastCoverUrl('', { category: 'Sleep Medicine' });
  assert.ok(sleepCover.includes('photo-1511295742362'));
});

test('resolvePodcastAudioUrl proxies official domains and protects streaming', () => {
  // Already proxied
  assert.equal(
    resolvePodcastAudioUrl('/api/proxy-audio?url=test'),
    '/api/proxy-audio?url=test'
  );

  // UltimateHealth domain audio routed through proxy-audio
  const uhAudio = 'https://ultimatehealth.blog/audio/track1.mp3';
  assert.equal(
    resolvePodcastAudioUrl(uhAudio),
    `/api/proxy-audio?url=${encodeURIComponent(uhAudio)}`
  );

  // Relative mp3 file mapped to backend endpoint via proxy
  assert.equal(
    resolvePodcastAudioUrl('track-99.mp3'),
    `/api/proxy-audio?url=${encodeURIComponent('https://ultimatehealth.blog/api/getFile/track-99.mp3')}`
  );

  // Empty returns sample fallback
  assert.ok(resolvePodcastAudioUrl('').includes('SoundHelix'));
});

test('getPodcastAuthorInfo extracts name, handle, role, and avatar robustly', () => {
  // String input
  const infoStr = getPodcastAuthorInfo('Dr. John Doe');
  assert.equal(infoStr.name, 'Dr. John Doe');
  assert.equal(infoStr.handle, 'dr._john_doe');

  // Object input
  const infoObj = getPodcastAuthorInfo({
    user_name: 'Dr. Sarah Smith',
    user_handle: 'sarah_md',
    role: 'Pulmonologist',
    Profile_image: 'https://example.com/avatar.jpg',
  });
  assert.equal(infoObj.name, 'Dr. Sarah Smith');
  assert.equal(infoObj.handle, 'sarah_md');
  assert.equal(infoObj.role, 'Pulmonologist');
  assert.equal(infoObj.avatar, 'https://example.com/avatar.jpg');
});

test('normalizePodcast creates unified PodcastData structure', () => {
  const normalized = normalizePodcast({
    _id: 'custom-1',
    title: 'Hypertension Basics',
    description: 'Learn about BP',
    tags: ['Cardiology'],
    duration: 600,
  });

  assert.equal(normalized._id, 'custom-1');
  assert.equal(normalized.title, 'Hypertension Basics');
  assert.equal(normalized.category, 'Cardiology');
  assert.equal(normalized.duration, 600);
  assert.ok(normalized.authorName);
  assert.ok(normalized.cover_image);
});

test('SEED_PODCASTS has rich medical content matching requirements', () => {
  assert.ok(Array.isArray(SEED_PODCASTS));
  assert.ok(SEED_PODCASTS.length >= 4);

  for (const podcast of SEED_PODCASTS) {
    assert.ok(podcast._id);
    assert.ok(podcast.title);
    assert.ok(podcast.description);
    assert.ok(podcast.cover_image);
    assert.ok(podcast.duration > 0);
  }
});

test('SEED_EPISODES provides structured series containers', () => {
  assert.ok(Array.isArray(SEED_EPISODES));
  assert.ok(SEED_EPISODES.length >= 4);

  const respiratory = SEED_EPISODES.find((e) => e._id === 'ep-respiratory-series');
  assert.ok(respiratory);
  assert.ok(respiratory.name.includes('Respiratory'));
  assert.ok((respiratory.podcasts_count || 0) >= 1);
});
