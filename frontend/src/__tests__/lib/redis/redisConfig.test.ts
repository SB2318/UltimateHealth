import { RedisConnectionManager } from '@/src/lib/redis/redisConfig';

describe('RedisConnectionManager', () => {
  let redisManager: RedisConnectionManager;

  beforeEach(() => {
    redisManager = new RedisConnectionManager({
      host: '127.0.0.1',
      port: 6379,
    });
  });

  afterEach(async () => {
    await redisManager.disconnect();
  });

  it('connects and passes health check', async () => {
    const connected = await redisManager.connect();
    expect(connected).toBe(true);

    const health = await redisManager.checkHealth();
    expect(health.status).toBe('ok');
    expect(health.connected).toBe(true);
  });

  it('publishes comment events to subscribers and deduplicates events', async () => {
    await redisManager.connect();
    const listener = jest.fn();

    redisManager.subscribe(listener);

    const event = {
      eventId: 'evt_1',
      type: 'CREATE_COMMENT' as const,
      articleId: 'art_1',
      commentId: 'c_1',
      payload: { id: 'c_1', text: 'Hello World' },
      timestamp: Date.now(),
    };

    const firstPublish = await redisManager.publishCommentEvent(event);
    expect(firstPublish).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);

    // Duplicate event should be ignored
    const secondPublish = await redisManager.publishCommentEvent(event);
    expect(secondPublish).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('handles Redis offline fallback gracefully without throwing', async () => {
    // Redis not connected
    const listener = jest.fn();
    redisManager.subscribe(listener);

    const event = {
      eventId: 'evt_fallback',
      type: 'CREATE_COMMENT' as const,
      articleId: 'art_1',
      commentId: 'c_2',
      timestamp: Date.now(),
    };

    const published = await redisManager.publishCommentEvent(event);
    expect(published).toBe(false);
    // Operation completed gracefully without throwing error
  });
});
