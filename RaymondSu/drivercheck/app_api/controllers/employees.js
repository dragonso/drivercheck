var mongoose = require('mongoose');
var Com = mongoose.model('Company');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};



module.exports.employeeCreate = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId) {
        
        Com.findById(req.params.companyId)
        .select("employees")
        .exec(function (err, company) {
            if (err) {
                sendJSONresponse(res, 400, err);
            }
            else {
                company.employees.push({ name: req.body.name, address : req.body.address });
                company.save(function (err, company) {
                    if (err) {
                        sendJSONresponse(res, 400, err);
                    } else {
                        sendJSONresponse(res, 201, company.employees[company.employees.length - 1]);
                    }

                });
            }

        });

    } else {
        console.log('No companyid specified');
        sendJSONresponse(res, 400, {
            "message": "No companyid in request"
        });
    }
};


module.exports.employeeUpdate = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId && req.params.employeeId) {
        Com.findById(req.params.companyId)
        .exec(function (err, company) {
            if (!company) {
                sendJSONresponse(res, 404, {
                    "message": "company not found"
                });
                return;
            }
            else if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }
            var emp = company.employees.id(req.params.employeeId);
            if (!emp) {
                sendJSONresponse(res, 404, {
                    "message": "employee not found"
                });
            } else {
                emp.name = req.body.name;
                emp.address = req.body.address;
                company.save(function (err, location) {
                    if (err) {
                        sendJSONresponse(res, 400, err);
                    } else {
                        sendJSONresponse(res, 200, emp);
                    }
                });
            }
        });
    } else {
        console.log('No companyid or no employeeId specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid or no employeeId in request"
        });

    }

};


module.exports.employeeDetailsById = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId && req.params.employeeId) {
        Com.findById(req.params.companyId)
        .exec(function (err, company) {
            if (!company) {
                sendJSONresponse(res, 404, {
                    "message": "company not found"
                });
                return;
            }
            else if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }
            var emp = company.employees.id(req.params.employeeId);
            if (!emp) {
                sendJSONresponse(res, 404, {
                    "message": "employee not found"
                });
            } else {
                sendJSONresponse(res, 200, emp);
                    
            }
        });
    } else {
        console.log('No companyid or no employeeId specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid or no employeeId in request"
        });

    }

};


module.exports.employeeListByCompanyId = function (req, res) {
    if (req.params && req.params.companyId) {
        Com.findById(req.params.companyId)
        .select("employees")
        .exec(function (err, company) {
            if (!company) {
                sendJSONresponse(res, 404, {
                    "message": "company not found"
                });
                return;
            }
            else if (err) {
                sendJSONresponse(res, 400, err);
            }
            else {
                var response = company.employees ? company.employees : [];
                sendJSONresponse(res, 200, response );                     
            }
        });

    } else {
        console.log('No companyid specified');
        sendJSONresponse(res, 400, {
            "message": "No companyid in request"
        });
    }
};


module.exports.employeeDelete = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId && req.params.employeeId) {
        Com.findById(req.params.companyId)
        .exec(function (err, company) {
            if (!company) {
                sendJSONresponse(res, 404, {
                    "message": "company not found"
                });
                return;
            }
            else if (err) {
                sendJSONresponse(res, 400, err);
                return;
            }
            var emp = company.employees.id(req.params.employeeId);
            if (!emp) {
                sendJSONresponse(res, 404, {
                    "message": "employee not found"
                });
            } else {
                emp.remove();
                company.save(function (err){
                        if (err) {
                            sendJSONresponse(res, 404, err);
                        } else {
                            sendJSONresponse(res, 204, null);
                        }
                    });
                }
                        
            });
    } else {
        console.log('No companyid or no employeeId specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid or no employeeId in request"
        });

    }

};