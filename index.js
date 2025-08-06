// index.js
const defaultOptions = {
  windowMs: 60 * 1000, 
  max: 100,
  keyGenerator: (req) => req.ip, 
  message: 'Too many requests. Please try again later.',
  statusCode: 429
};

function rateLimiter(userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };
  const store = new Map();

  return (req, res, next) => {
    const key = options.keyGenerator(req);
    const currentTime = Date.now();

    if (!store.has(key)) {
      store.set(key, []);
    }

    const timestamps = store.get(key).filter(ts => currentTime - ts < options.windowMs);
    timestamps.push(currentTime);
    store.set(key, timestamps);

    if (timestamps.length > options.max) {
      res.status(options.statusCode).send(options.message);
    } else {
      next();
    }
  };
}

module.exports = rateLimiter;
