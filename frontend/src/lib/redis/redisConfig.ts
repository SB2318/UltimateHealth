// @ts-nocheck
export interface RedisConfigOptions {
  host?: string;
  port?: number;
  password?: string;
  url?: string;
}

export interface CommentEvent {
  eventId: string;
  type: 'CREATE_COMMENT' | 'EDIT_COMMENT' | 'DELETE_COMMENT' | 'ADD_REACTION';
  articleId: string;
  commentId: string;
  payload?: any;
  timestamp: number;
}

export class RedisConnectionManager {
  private isConnected: boolean = false;
  private processedEvents: Set<string> = new Set();
  private eventListeners: Array<(event: CommentEvent) => void> = [];
  public config: RedisConfigOptions;

  constructor(config?: RedisConfigOptions) {
    this.config = {
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || '',
      url: process.env.REDIS_URL || '',
      ...config,
    };
  }

  public async connect(): Promise<boolean> {
    try {
      // Simulate connection logic or connection via ioredis/redis client
      this.isConnected = true;
      console.log(`[Redis] Connected to ${this.config.host}:${this.config.port}`);
      return true;
    } catch (err) {
      console.error('[Redis] Connection failed, falling back to database mode:', err);
      this.isConnected = false;
      return false;
    }
  }

  public async checkHealth(): Promise<{ status: 'ok' | 'error'; connected: boolean }> {
    return {
      status: this.isConnected ? 'ok' : 'error',
      connected: this.isConnected,
    };
  }

  public async publishCommentEvent(event: CommentEvent): Promise<boolean> {
    if (this.processedEvents.has(event.eventId)) {
      return false; // Deduplicate
    }
    this.processedEvents.add(event.eventId);

    if (!this.isConnected) {
      console.warn('[Redis] Warning: Redis unavailable. Operating in DB-only fallback mode.');
      return false;
    }

    // Notify local subscribers
    this.eventListeners.forEach((listener) => listener(event));
    return true;
  }

  public subscribe(listener: (event: CommentEvent) => void): () => void {
    this.eventListeners.push(listener);
    return () => {
      this.eventListeners = this.eventListeners.filter((l) => l !== listener);
    };
  }

  public async disconnect(): Promise<void> {
    this.isConnected = false;
    this.processedEvents.clear();
    this.eventListeners = [];
  }
}

export const redisManager = new RedisConnectionManager();
