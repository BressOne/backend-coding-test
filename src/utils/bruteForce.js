const ExpressBrute = require('express-brute');

let bruteforce;
if (process.env.ENABLE_BRUTE_FORCE_PROTECTION) {
  const store = new ExpressBrute.MemoryStore();
  bruteforce = new ExpressBrute(store);
} else {
  bruteforce = { prevent: (rq, re, nt) => nt() };
}

module.exports = bruteforce;
