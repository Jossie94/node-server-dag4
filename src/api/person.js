const { getAllPersons, getPersonByID, insertPerson, updatePerson, deletePerson } = require("../datasource/mysql");
const { sendJSON, getData } = require("../utilities")

module.exports = {
    "GET": {
        handler: function(req, res, param) {
            if(!param) {
                getAllPersons( data => {
                    sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", param: "No param, but thats OK", data}, 200);
                })
                return;
            }
            param = param.replace("/","");
            getPersonByID(param, data => {
                if(data.length) {
                    sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", param, data}, 200);
                    return;
                }
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", param, data}, 404);
            })
        }
    },
    "POST": {
        handler: function(req, res, param) {
            if(param) {
                sendJSON(req, res, {route: "/api/person", method: req.method, error: "Params not allowed here"}, 500);
                return;
            }
            getData(req)
                .then( input => {
                    insertPerson(input, data => {
                        sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", input, data}, 201);    
                    })
            })
            .catch(error=> {sendJSON (req, res, "Incorrect syntax", 400)});
        }
    },
    "PUT": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", error: "Parameter required"}, 400);
                return;
            }
            getData(req)
                .then( input => {
                    updatePerson(param, input, data => {
                        
                        sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", param, data}, 201);
                    })
                })
        }
    },

    "DELETE": {
        handler: function(req, res, param) {
            if(!param) {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", error: "Parameter required"}, 500);
                return;
            }
            //if param is a number
            if(isNaN(param)) {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", error: "parameter must be a number"}, 500);
                return;
            }
            deletePerson(param,data => {
                sendJSON(req, res, {route: "/api/person", method: req.method, says: "Quack", param, data}, 204);
            });
        }
    }
}
