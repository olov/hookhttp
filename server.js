const fs = require("fs");
const http = require("http");

// here be dragons

function resolve(path) {
    return path + ".js";
}

// transpiler that replaces first instance of "hi " to "yoyoma ". such useful!
function process(str) {
    return str.replace("hi ", "yoyoma ");
}

const server = http.createServer(function(request, response) {
    const path = resolve(request.url.slice(1));
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end(process(String(fs.readFileSync(path))));
});
server.listen(9876);
