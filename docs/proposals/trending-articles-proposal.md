# Trending & popular articles

## Approach

Other options considered:
- Raw counts: no time decay, so old high-view articles never lose rank
- Z-score against historical average
- Velocity/acceleration tracking

The last two need time-series infrastructure this project doesn't have yet.

Went with the Hacker News / Reddit style decay model, confirmed as the right call in review: avoids heavy infra overhead while still sorting accurately.

## Idea

Two separate scores instead of one:
- **Trending score**: what's picking up right now, hourly decay
- **Popular score**: what's held up over a longer stretch, daily decay

Same engagement data feeds both, just different decay windows, so a burst of activity can surface without old high-view articles burying it, and vice versa.

```
score = (views + likes*2 + comments*3 + shares*4 + FRESHNESS_CONSTANT) / (age + 2) ^ 1.5
```

`FRESHNESS_CONSTANT` is a small fixed value added to the numerator so a brand new article with zero interactions doesn't score exactly 0 and get buried at the bottom. It gives a new article a shot at surfacing for its first few hours, then it falls off naturally if no one engages with it.

## Implementation

**Write path**
- Buffer interactions in memory instead of firing `$inc` on every view/like: `Map<articleId, {views, likes, comments, shares}>`
- Flush the buffer every 10-30 seconds as a single `bulkWrite` with `$inc`
- Update an `interactionUpdatedAt` timestamp during that same flush, so the recalculation job knows what actually needs revisiting

**Score computation**
- Add a compound index on `{ interactionUpdatedAt: -1, _id: 1 }`
- Every 15 minutes, query only articles updated in the last 15 minutes
- Compute `trendingScore` via a MongoDB aggregation pipeline (`$addFields` for the math, `$merge` to write results back in place), not by pulling documents into Node and looping
- `popularScore` runs once a day the same way, across the full collection
- If the app ever runs multiple containers, add a simple lock (`findOneAndUpdate` against a `SystemLocks` collection) before the cron job starts, so it doesn't run twice in parallel

**Serving trending/popular lists**
- Offset pagination (`skip`/`limit`) on a live, recalculating index will drift, users can see duplicates or miss articles between pages
- Instead, snapshot the top 500 trending articles into a cached document (or Redis list) during each cron run
- `/articles/trending` paginates that static snapshot, giving a stable list and near-zero database reads
- `/articles/popular` follows the same pattern with its own daily snapshot

**Indexes**
- `trendingScore` and `popularScore` tie frequently among inactive articles, which makes sort order non-deterministic
- Index both as `{ trendingScore: -1, _id: -1 }` and `{ popularScore: -1, _id: -1 }` so `_id` breaks ties consistently

## Tech stack details

- Node, Express
- MongoDB: aggregation pipeline with `$merge` for scoring, `bulkWrite` for buffered counters, compound indexes for sorted reads
- node-cron for scheduling, with a lightweight lock collection for safe multi-instance runs
- Redis (optional): useful for the write buffer and the trending snapshot cache if the app scales past a single instance, not required to ship the first version
