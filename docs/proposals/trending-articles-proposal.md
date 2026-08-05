# Trending & popular articles

## Possible ways

A few ways to approach this, from simplest to more involved:

1. Raw counts, just sort by total views/likes. No time factor, so old articles never move down even if nothing's happening with them anymore.
2. Hacker News / Reddit style decay: score divided by (age + constant) raised to a power. Old and proven, easy to tune.
3. Half-life exponential decay on recency, combined separately with an engagement score.
4. Z-score against an article's own historical average, flags unusual spikes. Needs a time-series of past engagement, more infra than this needs right now.
5. Velocity/acceleration tracking (rate of change of engagement per hour). Same infra problem as above.

Going with option 2, it's simple, well tested elsewhere, and doesn't need anything beyond what the app already stores.

## Idea

Two separate scores instead of one: a trending score for what's picking up right now, and a popular score for what's held up over a longer stretch. Same engagement data, just two different decay windows so a burst of activity can surface without old high-view articles burying it, and vice versa.

```
score = (views + likes*2 + comments*3 + shares*4) / (age + 2) ^ 1.5
```

Trending uses age in hours. Popular uses age in days.

## Implementation

- Add `viewCount`, `likeCount`, `commentCount`, `shareCount` on the Article model if not already there
- Update these with `$inc` when the action happens, not recalculated on page load
- Add `trendingScore` and `popularScore` fields, both indexed for sorting
- Cron job (node-cron) recalculates `trendingScore` every 15-30 min for recently active articles, and `popularScore` once a day across everything
- Two endpoints: `GET /articles/trending` and `GET /articles/popular`, both paginated

## Tech stack details

Node, Express, MongoDB aggregation for scoring, node-cron for scheduling. No new dependencies needed.