var mongoose = require('mongoose');
var Com = mongoose.model('Company');

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};



module.exports.companyCreate = function (req, res) {
    console.log(req.body);
    Com.create({
        name: req.body.name,
        address: req.body.address,
        
    }, function (err, location) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(location);
            sendJSONresponse(res, 201, location);
        }
    });
};


module.exports.companyUpdate = function (req, res) {
    console.log(req.body);
    if (req.params && req.params.companyId) {
        Com.findById(req.params.companyId)
        .exec(function (err, company){
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
            company.name = req.body.name;
            company.address = req.body.address;
            company.save(function (err, company) {
                if (err) {
                    sendJSONresponse(res, 400, err);
                } else {
                    sendJSONresponse(res, 200, company);
                }
            });
           
        });
    } else {
        console.log('No companyid specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid in request"
        });

    }

};


module.exports.companyList = function (req, res) {   
       Com
      .find({})
      .exec(function (err, companies) {
            if (!companies) {
                sendJSONresponse(res, 404, {
                    "message": "no company found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, companies);
        });
};


module.exports.companyDetailsById = function (req, res) {
    if (req.params && req.params.companyId) {
        Com
      .findById(req.params.companyId)
      .exec(function (err, company) {
            if (!company) {
                sendJSONresponse(res, 404, {
                    "message": "company not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 200, company);
        });
    } else {
        console.log('No companyid specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid in request"
        });
    }
};

module.exports.companyDeleteById = function (req, res) {
    if (req.params && req.params.companyId) {
        Com
      .findByIdAndRemove(req.params.companyId)
      .exec(function (err) {
             if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            sendJSONresponse(res, 204, null);
        });
    } else {
        console.log('No companyid specified');
        sendJSONresponse(res, 404, {
            "message": "No companyid in request"
        });
    }
};

