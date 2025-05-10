function createLRUCache(LIMIT) {
  const cache = new Map();

  const getItem = (key) => {
    if (!cache.has(key)) {
      return -1;
    }

    const value = cache.get(key);
    cache.delete(key);
    cache.set(key, value);
    return value;
  };
  const setItem = (k, v) => {
    if (cache.has(k)) {
      cache.delete(k);
    }

    if (cache.size >= LIMIT) {
      const firstVal = cache.keys().next().value;
      cache.delete(firstVal);
    }

    cache.set(k, v);
  };

  return {
    get: getItem,
    put: setItem,
  };
}

const lruCache = createLRUCache(10);
lruCache.put(1, 1); // cache = {1=1}
lruCache.put(2, 2); // cache = {1=1, 2=2}
console.log(lruCache.get(1)); // returns 1
lruCache.put(3, 3); // evicts key 2, cache = {1=1, 3=3}
console.log(lruCache.get(2)); // returns -1 (not found)
lruCache.put(4, 4); // evicts key 1, cache = {3=3, 4=4}
console.log(lruCache.get(1)); // returns -1 (not found)
console.log(lruCache.get(3)); // returns 3
console.log(lruCache.get(4)); // returns 4
