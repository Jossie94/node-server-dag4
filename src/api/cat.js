const { getAllPersons, getPersonByID, insertPerson, updatePerson } = require("../datasource/mysql");
const { sendJSON, getData } = require("../utilities")

module.exports = {
    "GET": {
        handler: function(req, res, param) {
            if(!param) {
                getAllPersons( data => {
                    sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param: "No param, but thats OK", data});
                })
                return;
            }
            param = param.replace("/","");
            getPersonByID(param, data => {
                if(data.length) {
                    sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param, data});
                    return;
                }
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param, data}, 404);
            })
        }
    },
    "POST": {
        handler: function(req, res, param) {
            if(param) {
                sendJSON(req, res, {route: "/api/cat", method: req.method, error: "Params not allowed here"}, 405);
                return;
            }
            getData(req)
                .then( input => {
                    insertPerson(input, data => {
                        sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", input, data});    
                    })
            })
        }
    },
    "PUT": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", error: "Parameter required"}, 400);
                return;
            }
            getData(req)
                .then( input => {
                    updatePerson(param, input, data => {
                        
                        sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param, data});
                    })
                })
        }
    },
    "DELETE": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", error: "Parameter required"}, 400);
                return;
            }            
            sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param});
        }
    }
}