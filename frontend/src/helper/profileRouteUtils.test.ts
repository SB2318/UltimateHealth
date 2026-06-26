import {resolveProfileTarget} from './profileRouteUtils';

describe('resolveProfileTarget', () => {
  it('prefers a string authorId', () => {
    expect(
      resolveProfileTarget(
        {authorId: 'author-1', userId: 'legacy-user'},
        'current-user',
      ),
    ).toEqual({
      authorId: 'author-1',
      userHandle: undefined,
      hasExternalTarget: true,
    });
  });

  it('resolves an author object ID', () => {
    expect(
      resolveProfileTarget(
        {authorId: {_id: 'author-2'} as any},
        'current-user',
      ).authorId,
    ).toBe('author-2');
  });

  it('supports the userId compatibility parameter', () => {
    expect(
      resolveProfileTarget({userId: 'user-3'}, 'current-user').authorId,
    ).toBe('user-3');
  });

  it.each([
    [{author_handle: '@health_writer'}, '@health_writer'],
    [{userHandle: 'health_writer'}, 'health_writer'],
  ])(
    'resolves handle-only routes without using the current user',
    (params, handle) => {
      expect(resolveProfileTarget(params, 'current-user')).toEqual({
        authorId: '',
        userHandle: handle,
        hasExternalTarget: true,
      });
    },
  );

  it('falls back to the current user when no external target exists', () => {
    expect(resolveProfileTarget(undefined, 'current-user')).toEqual({
      authorId: 'current-user',
      userHandle: undefined,
      hasExternalTarget: false,
    });
  });
});
