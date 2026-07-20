type CacheEntry<T> = { data: T; expiry: number };

const memoryCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL = 300;

function getRedisUrl(): string | null {
  if (typeof process === "undefined") return null;
  return process.env.REDIS_URL ?? null;
}

let redisClient: Promise<import("ioredis").Redis> | null = null;

async function getRedis() {
  const url = getRedisUrl();
  if (!url) return null;
  if (!redisClient) {
    redisClient = import("ioredis").then(
      ({ Redis }) =>
        new Redis(url, {
          lazyConnect: true,
          maxRetriesPerRequest: 3,
          retryStrategy(times) {
            if (times > 3) return null;
            return Math.min(times * 100, 3000);
          },
          enableOfflineQueue: false,
        }),
    );
  }
  try {
    const client = await redisClient;
    if (client.status !== "ready") {
      await client.connect().catch(() => {});
    }
    return client;
  } catch {
    return null;
  }
}

export async function cacheGet<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = DEFAULT_TTL,
): Promise<T> {
  const redis = await getRedis();
  if (redis) {
    try {
      const cached = await redis.get(key);
      if (cached) {
        return JSON.parse(cached) as T;
      }
      const data = await fetcher();
      await redis.setex(key, ttl, JSON.stringify(data));
      return data;
    } catch {
      return fetcher();
    }
  }

  const now = Date.now();
  const existing = memoryCache.get(key);
  if (existing && existing.expiry > now) {
    return existing.data as T;
  }
  const data = await fetcher();
  memoryCache.set(key, { data, expiry: now + ttl * 1000 });
  if (memoryCache.size > 100) {
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
  return data;
}

export function cacheInvalidate(key: string) {
  memoryCache.delete(key);
  getRedis().then((redis) => {
    if (redis) redis.del(key).catch(() => {});
  });
}

export function cacheFlush() {
  memoryCache.clear();
  getRedis().then((redis) => {
    if (redis) redis.flushdb().catch(() => {});
  });
}
