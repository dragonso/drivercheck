var mongoose = require('mongoose');
var Com = mongoose.model('Company');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.testGet = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId && req.params.employeeId && req.params.testId) {
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
                var test = emp.tests.id(req.params.testId);
                
                    if (!test) {
                        sendJSONresponse(res, 404, {
                        "message": "test not found"
                    });
                    } else {
                        sendJSONresponse(res, 200, test);
                    }
                
            }
        });
    } else {
        console.log('No companyid or no employeeId specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid or no employeeId in request"
        });

    }

};


module.exports.testCreate = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId &&  req.params.employeeId) {
        
        Com.findById(req.params.companyId)
        .select("employees")
        .exec(function (err, company) {
            if (err) {
                sendJSONresponse(res, 400, err);
            }
            else if (!company) {
                sendJSONresponse(res, 404, {
                    "message": "company not found"
                });
            }
            else {
                var emp = company.employees.id(req.params.employeeId);
                if (!emp) {
                    sendJSONresponse(res, 404, {
                        "message": "employee not found"
                    });
                } else {
                    var test = { result: req.body.result, testDate : req.body.testDate };
                    emp.tests.push(test);
                    company.save(function (err, location) {
                        if (err) {
                            sendJSONresponse(res, 400, err);
                        } else {
                            sendJSONresponse(res, 200, test);
                        }
                    });
                    }

            }

        });

    } else {
        console.log('No companyid specified');
        sendJSONresponse(res, 400, {
            "message": "No companyid in request"
        });
    }
};


module.exports.testUpdate = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId && req.params.employeeId &&  req.params.testId) {
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
                var test = emp.tests.id(req.params.testId);
                test.result = req.body.result;
                test.testDate = req.body.testDate; 
                company.save(function (err, location) {
                    if (err) {
                        sendJSONresponse(res, 400, err);
                    } else {
                        sendJSONresponse(res, 200, test);
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

module.exports.testDelete = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId && req.params.employeeId &&  req.params.testId) {
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
                var test = emp.tests.id(req.params.testId);
                test.remove();
                company.save(function (err, location) {
                    if (err) {
                        sendJSONresponse(res, 400, err);
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



