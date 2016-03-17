var express = require('express');
var router = express.Router();

var ctrlCompanies = require('../controllers/companies');
var ctrlEmployees = require('../controllers/employees');
var ctrlTests = require('../controllers/tests');



router.get('/companies', ctrlCompanies.companyList);
router.get('/companies/:companyId', ctrlCompanies.companyDetailsById);
router.post('/companies', ctrlCompanies.companyCreate);
router.put('/companies/:companyId', ctrlCompanies.companyUpdate);
router.delete('/companies/:companyId', ctrlCompanies.companyDeleteById);

router.get('/employees/:companyId/:employeeId', ctrlEmployees.employeeDetailsById);
router.put('/employees/:companyId/:employeeId', ctrlEmployees.employeeUpdate);
router.delete('/employees/:companyId/:employeeId', ctrlEmployees.employeeDelete);
router.post('/employees/:companyId', ctrlEmployees.employeeCreate);
router.get('/employees/:companyId', ctrlEmployees.employeeListByCompanyId);


router.post('/tests/:companyId/:employeeId', ctrlTests.testCreate);
router.get('/tests/:companyId/:employeeId/:testId', ctrlTests.testGet);
router.put('/tests/:companyId/:employeeId/:testId', ctrlTests.testUpdate);
router.delete('/tests/:companyId/:employeeId/:testId', ctrlTests.testDelete);


module.exports = router;
