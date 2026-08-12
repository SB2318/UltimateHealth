import { renderHook, act } from '@testing-library/react-native';
import { useSyncComments } from '@/src/hooks/social/useSyncComments';

describe('useSyncComments', () => {
  it('initializes with default comments and syncs additions, edits, and deletions', async () => {
    const initialComments = [
      { id: 'c_1', articleId: 'art_100', author: 'Alice', text: 'First comment' },
    ];

    const { result } = renderHook(() => useSyncComments('art_100', initialComments));

    expect(result.current.comments).toHaveLength(1);
    expect(result.current.comments[0].text).toBe('First comment');

    // Add new comment
    await act(async () => {
      await result.current.addComment({
        id: 'c_2',
        articleId: 'art_100',
        author: 'Bob',
        text: 'Second comment',
      });
    });

    expect(result.current.comments).toHaveLength(2);
    expect(result.current.comments[0].text).toBe('Second comment');

    // Edit comment
    await act(async () => {
      await result.current.editComment('c_1', 'Updated first comment');
    });

    const updated = result.current.comments.find((c) => c.id === 'c_1');
    expect(updated?.text).toBe('Updated first comment');

    // Delete comment
    await act(async () => {
      await result.current.deleteComment('c_2');
    });

    expect(result.current.comments.some((c) => c.id === 'c_2')).toBe(false);
  });
});
