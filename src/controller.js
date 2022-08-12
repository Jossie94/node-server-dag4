const cnf = require("./config/serverconfig.json");
const {sendText, sendJSON, sendFile, redirect, logger, streamFile} = require("./utilities");
const api = {
    "cat" : require("./api/cat"),
    "person" :require("./api/person")
};

module.exports = function(req, res) {
    logger(req, res);
    const url = new URL(req.url, cnf.host + ":" + cnf.port);

    const endpoint = url.pathname;
    if(endpoint === "/") {
        redirect(res, "http://localhost:3003/html/index.html");
        return;
    }
    let regex = /^\/(html|css|img|js)\/[\w-]+\.(html|css|js|jpe?g|png|gif|bmp|svg|tiff)$/i;

    let regexRes = endpoint.match(regex);
    if(regexRes) {
        streamFile(req, res, cnf.docroot + regexRes[0]);
        return;
    }

    regex = /^\/api\/(?<route>\w+)(?<param>\/\d+)?/
    regexRes = endpoint.match(regex);
    if(regexRes) {
        // hvis jeg er her er mønsteret OK
        if(api[regexRes.groups.route]){
            // hvis jeg er her finde en route
            if(api[regexRes.groups.route][req.method]) {
                // hvis jeg er her er der en handler til http-metoden
                const param = regexRes.groups.param? regexRes.groups.param.replace("/", ""): undefined;
                api[regexRes.groups.route][req.method].handler(req, res, param);
                return;
            }
            sendJSON(req, res, {msg: `Method ${req.method} not allowed here`}, 405);
            return;
        }
    }

    // hvis jeg er her er der ikke fundet et match

    
    sendJSON(req, res, {msg: "resourcen findes ikke", endpoint: endpoint}, 404);   
}