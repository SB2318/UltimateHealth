# Semantic search and tag suggestion prototype

This proof of concept addresses the roadmap direction for article discovery and
community tag suggestions without changing the React Native app or backend.

It accepts a natural-language question, ranks articles with a deterministic TF-IDF
similarity fallback, and suggests tags from the question and top results. Set
`ULTIMATEHEALTH_ARTICLES_URL` or pass `--api-url` to use a JSON API response. If
the API is unavailable, the output explicitly identifies the bundled sample data.

```bash
python semantic_search.py "How can I improve my sleep?"
python semantic_search.py "healthy food for busy days" --api-url https://example.test/articles
```

The prototype intentionally does not write scraped API responses to the repository.
It is a demonstration, not medical advice or a production recommendation engine.
