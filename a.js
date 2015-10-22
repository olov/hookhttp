require("./hookhttp");

console.log("in a, before require ./b");
const b = require("./b");
console.log("in a, after require ./b");
console.log("in a, b says: " + b.hi());
console.log("end of a");
