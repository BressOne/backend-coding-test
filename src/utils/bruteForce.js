const ExpressBrute = require('express-brute');

let bruteforce;
if (process.env.ENABLE_BRUTE_FORCE_PROTECTION) {
  const options = {};
  if (process.env.BF_FREE_RETRIES) {
    options.freeRetries = process.env.BF_FREE_RETRIES;
  }
  if (process.env.BF_MAX_WAIT) {
    options.maxWait = process.env.BF_MAX_WAIT;
  }
  const store = new ExpressBrute.MemoryStore();
  bruteforce = new ExpressBrute(store, options);
} else {
  bruteforce = { prevent: (_, __, next) => next() };
}

module.exports = bruteforce;
