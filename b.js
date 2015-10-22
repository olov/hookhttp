const fs = require("fs"); // local require because of name, see hookhttp
const c = require("./dir/c");
module.exports = {hi: function() { return "hi my source code is " + JSON.stringify(String(fs.readFileSync("b.js"))); }};
