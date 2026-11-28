import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SOURCE_TYPE_LABELS,
  HEALTH_RESOURCES_DISCLAIMER,
  slugifyTitle,
  normalizeHealthResource,
  parseHealthResourcesPayload,
  parsePlacementPayload,
  parseHealthResourcePayload,
  filterHealthResources,
  deriveFilterOptions,
  resolvePlacementState,
  buildExternalLinkProps,
} from './health-resources-helpers.mjs';

const RAW_HELPLINE = {
  _id: 'res-1',
  slug: 'national-mental-health-helpline',
  title: 'National Mental Health Helpline',
  description: 'Free, confidential support for mental health crises.',
  provider: 'Ministry of Health and Family Welfare',
  category: 'Mental Health',
  sourceType: 'government',
  region: 'India',
  resourceType: 'Helpline',
  tags: ['crisis', 'mental health'],
  freeAccess: true,
  officialUrl: 'https://example.gov.in/helpline',
  eligibility: 'Open to all residents',
  lastVerifiedAt: '2026-11-01',
};

const RAW_VACCINE = {
  id: 'res-2',
  title: 'Vaccination Drive Finder',
  description: 'Find nearby vaccination centres.',
  authority: 'State Health Mission',
  category: 'Immunization',
  sourceType: 'verified-ngo',
  region: 'Maharashtra',
  resourceType: 'Directory',
  tags: ['vaccines'],
  officialUrl: 'https://example.org/vaccines',
};

const RAW_MINIMAL = {
  title: 'Blood Donation Camps',
  category: 'Blood Donation',
};

test('slugifyTitle lowercases and hyphenates', () => {
  assert.equal(slugifyTitle('National Mental Health Helpline'), 'national-mental-health-helpline');
  assert.equal(slugifyTitle('  Blood & Donation!  '), 'blood-donation');
  assert.equal(slugifyTitle(''), '');
});

test('normalizeHealthResource keeps a full record intact', () => {
  const resource = normalizeHealthResource(RAW_HELPLINE);
  assert.equal(resource.id, 'res-1');
  assert.equal(resource.slug, 'national-mental-health-helpline');
  assert.equal(resource.title, 'National Mental Health Helpline');
  assert.equal(resource.provider, 'Ministry of Health and Family Welfare');
  assert.equal(resource.sourceType, 'government');
  assert.equal(resource.freeAccess, true);
  assert.equal(resource.officialUrl, 'https://example.gov.in/helpline');
  assert.deepEqual(resource.tags, ['crisis', 'mental health']);
});

test('normalizeHealthResource accepts id, authority alias, and derives a slug', () => {
  const resource = normalizeHealthResource(RAW_VACCINE);
  assert.equal(resource.id, 'res-2');
  assert.equal(resource.slug, 'vaccination-drive-finder');
  assert.equal(resource.provider, 'State Health Mission');
  assert.equal(resource.sourceType, 'verified-ngo');
  assert.equal(resource.freeAccess, undefined);
});

test('normalizeHealthResource fills safe defaults for a minimal record', () => {
  const resource = normalizeHealthResource(RAW_MINIMAL);
  assert.equal(resource.slug, 'blood-donation-camps');
  assert.equal(resource.category, 'Blood Donation');
  assert.equal(resource.sourceType, 'public-interest');
  assert.equal(resource.region, '');
  assert.equal(resource.officialUrl, '');
  assert.deepEqual(resource.tags, []);
});

test('normalizeHealthResource rejects records without a title and never throws', () => {
  assert.equal(normalizeHealthResource({}), null);
  assert.equal(normalizeHealthResource({ description: 'no title' }), null);
  assert.equal(normalizeHealthResource(null), null);
  assert.equal(normalizeHealthResource('not-an-object'), null);
  assert.equal(normalizeHealthResource({ title: 'X', sourceType: 'commercial-ad' }).sourceType, 'public-interest');
});

test('parseHealthResourcesPayload accepts array and wrapped shapes, rejects the rest', () => {
  assert.equal(parseHealthResourcesPayload([RAW_HELPLINE, RAW_VACCINE]).length, 2);
  assert.equal(parseHealthResourcesPayload({ resources: [RAW_HELPLINE] }).length, 1);
  assert.equal(parseHealthResourcesPayload({ data: [RAW_VACCINE] }).length, 1);
  assert.equal(parseHealthResourcesPayload({ healthResources: [RAW_HELPLINE] }).length, 1);
  assert.deepEqual(parseHealthResourcesPayload([]), []);
  assert.deepEqual(parseHealthResourcesPayload({}), []);
  assert.deepEqual(parseHealthResourcesPayload(null), []);
  // A 404 HTML error body parses to nothing, not a crash
  assert.deepEqual(parseHealthResourcesPayload('<!DOCTYPE html>'), []);
  // Records without titles are dropped, valid ones survive
  assert.equal(parseHealthResourcesPayload([{}, RAW_MINIMAL]).length, 1);
});

test('parsePlacementPayload resolves placement name and resources', () => {
  const placed = parsePlacementPayload(
    { name: 'homepage-banner', resources: [RAW_HELPLINE] },
    'homepage-banner'
  );
  assert.equal(placed.name, 'homepage-banner');
  assert.equal(placed.resources.length, 1);

  const fromArray = parsePlacementPayload([RAW_VACCINE], 'article-footer');
  assert.equal(fromArray.name, 'article-footer');
  assert.equal(fromArray.resources.length, 1);

  assert.equal(parsePlacementPayload({ resources: [] }, 'homepage-banner'), null);
  assert.equal(parsePlacementPayload({}, 'homepage-banner'), null);
  assert.equal(parsePlacementPayload(null, 'homepage-banner'), null);
});

test('parseHealthResourcePayload unwraps single-resource responses', () => {
  assert.equal(parseHealthResourcePayload({ healthResource: RAW_HELPLINE }).slug, 'national-mental-health-helpline');
  assert.equal(parseHealthResourcePayload(RAW_VACCINE).slug, 'vaccination-drive-finder');
  assert.equal(parseHealthResourcePayload({}), null);
  assert.equal(parseHealthResourcePayload(null), null);
});

test('filterHealthResources matches query across title, description, and tags', () => {
  const list = [RAW_HELPLINE, RAW_VACCINE, RAW_MINIMAL].map(normalizeHealthResource);

  assert.deepEqual(
    filterHealthResources(list, { query: 'mental' }).map((r) => r.slug),
    ['national-mental-health-helpline']
  );
  assert.deepEqual(
    filterHealthResources(list, { query: 'VACCINES' }).map((r) => r.slug),
    ['vaccination-drive-finder']
  );
  // Tag match
  assert.deepEqual(
    filterHealthResources(list, { query: 'crisis' }).map((r) => r.slug),
    ['national-mental-health-helpline']
  );
  // Empty query returns everything
  assert.equal(filterHealthResources(list, { query: '' }).length, 3);
  assert.equal(filterHealthResources(list, {}).length, 3);
});

test('filterHealthResources applies category, region, and resource-type filters', () => {
  const list = [RAW_HELPLINE, RAW_VACCINE, RAW_MINIMAL].map(normalizeHealthResource);

  assert.deepEqual(
    filterHealthResources(list, { category: 'Mental Health' }).map((r) => r.slug),
    ['national-mental-health-helpline']
  );
  assert.deepEqual(
    filterHealthResources(list, { region: 'Maharashtra' }).map((r) => r.slug),
    ['vaccination-drive-finder']
  );
  assert.deepEqual(
    filterHealthResources(list, { resourceType: 'Helpline' }).map((r) => r.slug),
    ['national-mental-health-helpline']
  );
  // Combined filters intersect
  assert.equal(
    filterHealthResources(list, { category: 'Mental Health', region: 'Maharashtra' }).length,
    0
  );
  assert.equal(
    filterHealthResources(list, { category: 'Mental Health', resourceType: 'Helpline' }).length,
    1
  );
});

test('deriveFilterOptions returns sorted unique values from the list', () => {
  const list = [RAW_HELPLINE, RAW_VACCINE, RAW_MINIMAL].map(normalizeHealthResource);
  const options = deriveFilterOptions(list);
  assert.deepEqual(options.categories, ['Blood Donation', 'Immunization', 'Mental Health']);
  assert.deepEqual(options.regions, ['India', 'Maharashtra']);
  assert.deepEqual(options.resourceTypes, ['Directory', 'Helpline']);
  assert.deepEqual(deriveFilterOptions([]), { categories: [], regions: [], resourceTypes: [] });
});

test('resolvePlacementState drives loading, list, and fallback rendering', () => {
  assert.equal(resolvePlacementState({ loading: true, error: false, resources: [] }), 'loading');
  assert.equal(
    resolvePlacementState({ loading: false, error: false, resources: [RAW_HELPLINE] }),
    'list'
  );
  assert.equal(resolvePlacementState({ loading: false, error: false, resources: [] }), 'fallback');
  assert.equal(
    resolvePlacementState({ loading: false, error: true, resources: [] }),
    'fallback'
  );
  // An error never shows a half-loaded list
  assert.equal(
    resolvePlacementState({ loading: false, error: true, resources: [RAW_HELPLINE] }),
    'fallback'
  );
});

test('source-type badges use the exact public labels', () => {
  assert.equal(SOURCE_TYPE_LABELS.government, 'Government');
  assert.equal(SOURCE_TYPE_LABELS['verified-ngo'], 'Verified NGO');
  assert.equal(SOURCE_TYPE_LABELS['public-interest'], 'Public interest');
});

test('external links always open in a new tab with noopener noreferrer', () => {
  const props = buildExternalLinkProps('https://example.gov.in/helpline');
  assert.equal(props.href, 'https://example.gov.in/helpline');
  assert.equal(props.target, '_blank');
  assert.equal(props.rel, 'noopener noreferrer');
});

test('disclaimer matches the issue text exactly', () => {
  assert.equal(
    HEALTH_RESOURCES_DISCLAIMER,
    'UltimateHealth is an independent health information platform. Listing a public resource does not imply government affiliation or endorsement.'
  );
});
