/*
    Expiry tests
 */

require ejs.cache.local

//  Test expiry
cache = new LocalCache({resolution: 100})
cache.write("message", "Hello World", {lifespan: 1})
assert(cache.read("message") == "Hello World")
App.sleep(1100)
assert(cache.read("message") == null)
