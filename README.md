## hookhttp.js

server.js is a stupid insecure web server, loads what is requested and does some "hi " => "yoyoma " processing

`node server.js&`

`a.js` is just a simple program that loads `/.b` and prints some stuff, but `./b` will be loaded through HTTP:

 ```js
require("./hookhttp");

console.log("in a, before require ./b");
const b = require("./b");
console.log("in a, after require ./b");
console.log("in a, b says: " + b.hi());
console.log("end of a");
```

`b.js` in turn loads `./dir/c` (again fetched over HTTP) and prints its own source code (via `fs` module, loaded locally). 

 
## HACK
 
Here be dragons. Insecure, incomplete, blah blah. To fix this you need to tidy it up, implement proper client-side and server-side caching, 
module directory resolving, proper module naming, error handling, built-in handling and probably a lot more.

This hack is Public Domain so do what you want
