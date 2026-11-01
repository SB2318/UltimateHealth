"""Small, dependency-tolerant semantic article search and tag suggestion demo.

The prototype deliberately stays outside the mobile app. It can use live API data
when configured, but always has a clearly labelled sample-data fallback so it is
reproducible for contributors and reviewers.
"""

from __future__ import annotations

import argparse
import json
import math
import os
import re
from collections import Counter
from pathlib import Path
from typing import Any
from urllib.request import Request, urlopen

SAMPLE_ARTICLES = [
    {"id": "sample-1", "title": "Building a consistent sleep routine", "content": "A regular sleep schedule, daylight exposure, and a calm bedtime routine can improve sleep quality."},
    {"id": "sample-2", "title": "Simple ways to manage daily stress", "content": "Breathing exercises, short walks, and social support are practical tools for managing everyday stress."},
    {"id": "sample-3", "title": "Balanced nutrition basics", "content": "A balanced plate combines vegetables, fruit, whole grains, protein, and healthy fats in sensible portions."},
]

STOP_WORDS = {
    "about", "after", "also", "and", "are", "can", "for", "from", "how",
    "into", "more", "that", "the", "their", "this", "ways", "what", "with",
}


def _tokens(text: str) -> list[str]:
    return [word for word in re.findall(r"[a-zA-Z]{3,}", text.lower()) if word not in STOP_WORDS]


def _tfidf_vectors(texts: list[str]) -> list[list[float]]:
    tokenized = [_tokens(text) for text in texts]
    vocabulary = sorted({token for words in tokenized for token in words})
    document_frequency = Counter(token for words in tokenized for token in set(words))
    vectors: list[list[float]] = []
    for words in tokenized:
        counts = Counter(words)
        vectors.append([
            (1 + math.log(counts[token])) * math.log((1 + len(texts)) / (1 + document_frequency[token]))
            if counts[token] else 0.0
            for token in vocabulary
        ])
    return vectors


def _cosine(left: list[float], right: list[float]) -> float:
    denominator = math.sqrt(sum(value * value for value in left)) * math.sqrt(sum(value * value for value in right))
    return sum(a * b for a, b in zip(left, right)) / denominator if denominator else 0.0


def search_articles(question: str, articles: list[dict[str, Any]], limit: int = 5) -> list[dict[str, Any]]:
    texts = [question] + [f"{article.get('title', '')} {article.get('content', '')}" for article in articles]
    vectors = _tfidf_vectors(texts)
    ranked = sorted(
        ({"article": article, "score": round(_cosine(vectors[0], vector), 4)} for article, vector in zip(articles, vectors[1:])),
        key=lambda result: result["score"],
        reverse=True,
    )
    return ranked[:limit]


def suggest_tags(question: str, results: list[dict[str, Any]], limit: int = 5) -> list[str]:
    words = _tokens(" ".join([question] + [result["article"].get("title", "") for result in results]))
    return [word for word, _ in Counter(words).most_common(limit)]


def load_articles(api_url: str | None) -> tuple[list[dict[str, Any]], str]:
    if not api_url:
        return SAMPLE_ARTICLES, "sample data (no API URL configured)"
    try:
        request = Request(api_url, headers={"Accept": "application/json", "User-Agent": "UltimateHealth-semantic-search-demo/1.0"})
        with urlopen(request, timeout=8) as response:
            payload = json.load(response)
        articles = payload.get("articles", payload) if isinstance(payload, dict) else payload
        if not isinstance(articles, list) or not articles:
            raise ValueError("API returned no article list")
        return articles, f"live API data from {api_url}"
    except Exception as error:
        print(f"Warning: live article loading failed ({error}); using sample data.", flush=True)
        return SAMPLE_ARTICLES, "sample data (live API unavailable)"


def main() -> None:
    parser = argparse.ArgumentParser(description="Search UltimateHealth articles and suggest tags.")
    parser.add_argument("question", help="Natural-language health question")
    parser.add_argument("--api-url", default=os.getenv("ULTIMATEHEALTH_ARTICLES_URL"))
    parser.add_argument("--limit", type=int, default=5)
    args = parser.parse_args()
    articles, source = load_articles(args.api_url)
    results = search_articles(args.question, articles, max(1, args.limit))
    print(f"Data source: {source}")
    for index, result in enumerate(results, start=1):
        article = result["article"]
        print(f"{index}. {article.get('title', 'Untitled')} (similarity: {result['score']:.3f})")
    print("Suggested tags:", ", ".join(suggest_tags(args.question, results)) or "none")


if __name__ == "__main__":
    main()
