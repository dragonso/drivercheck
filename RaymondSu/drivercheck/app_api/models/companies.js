var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
    result: String,
    testDate: {
        type: Date,
        "default": Date.now
    }

});

var employeeSchema = new mongoose.Schema({
    name: String,
    address: String,
    tests:[testSchema]
});


var companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    employees: [employeeSchema]
});

mongoose.model('Company', companySchema);