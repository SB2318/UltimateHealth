import offlineReducer, {
  MAX_SESSION_ARTICLES,
  cacheSessionArticle,
  cacheSessionContent,
  clearSessionArticles,
} from '../../store/offlineSlice';

const makeArticle = (id: number) =>
  ({_id: String(id), title: `Article ${id}`, pb_recordId: `rec-${id}`}) as any;

const initial = offlineReducer(undefined, {type: '@@INIT'});

describe('offlineSlice', () => {
  it('keeps an opened article in memory for the session', () => {
    const state = offlineReducer(
      initial,
      cacheSessionArticle({articleId: 1, article: makeArticle(1)}),
    );

    expect(state.articles).toHaveLength(1);
    expect(state.articles[0].article.title).toBe('Article 1');
  });

  it('keeps an opened article body keyed by record id', () => {
    const state = offlineReducer(
      initial,
      cacheSessionContent({recordId: 'rec-1', htmlContent: '<p>Body</p>'}),
    );

    expect(state.contents[0]).toEqual({
      recordId: 'rec-1',
      htmlContent: '<p>Body</p>',
    });
  });

  it('replaces rather than duplicates a re-opened article', () => {
    let state = offlineReducer(
      initial,
      cacheSessionArticle({articleId: 1, article: makeArticle(1)}),
    );
    state = offlineReducer(
      state,
      cacheSessionArticle({
        articleId: 1,
        article: {...makeArticle(1), title: 'Updated'},
      }),
    );

    expect(state.articles).toHaveLength(1);
    expect(state.articles[0].article.title).toBe('Updated');
  });

  it('bounds the session cache so browsing cannot grow it without limit', () => {
    let state = initial;
    for (let id = 1; id <= MAX_SESSION_ARTICLES + 5; id++) {
      state = offlineReducer(
        state,
        cacheSessionArticle({articleId: id, article: makeArticle(id)}),
      );
    }

    expect(state.articles).toHaveLength(MAX_SESSION_ARTICLES);
    // Newest first, so the oldest openings are the ones dropped.
    expect(state.articles[0].articleId).toBe(MAX_SESSION_ARTICLES + 5);
    expect(state.articles.some(entry => entry.articleId === 1)).toBe(false);
  });

  it('drops everything when the session cache is cleared on app unmount', () => {
    let state = offlineReducer(
      initial,
      cacheSessionArticle({articleId: 1, article: makeArticle(1)}),
    );
    state = offlineReducer(
      state,
      cacheSessionContent({recordId: 'rec-1', htmlContent: '<p>Body</p>'}),
    );

    expect(offlineReducer(state, clearSessionArticles())).toEqual(initial);
  });
});
