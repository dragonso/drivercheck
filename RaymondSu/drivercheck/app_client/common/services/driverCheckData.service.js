(function () {
    
    angular
    .module('driverCheck')
    .service('driverCheckData', driverCheckData);
    
    driverCheckData.$inject = ['$http', 'authentication'];
    function driverCheckData($http, authentication) {
        
        var getCompanies = function () {
            return $http.get('/api/companies');
        };
        
        var getCompanyById = function (companyId) {
            return $http.get('/api/companies/' + companyId);
        };
        
        var updateCompanyById = function (companyId, data) {
            return $http.put('/api/companies/' + companyId, data);
        };
        
        var createCompany = function (data) {
            return $http.post('/api/companies', data);
        }
        
        var deleteCompany = function (companyId) {
            return $http.delete('/api/companies/' + companyId);
        }
        
        //emp
        var createEmployee = function (companyId, data) {
            return $http.post('/api/employees/' + companyId, data);
        }
        
        var getEmployeeById = function (companyId, employeeId) {
            return $http.get('/api/employees/' + companyId + '/' + employeeId);
        }
        
        var updateEmployee = function (companyId, employeeId, data) {
            return $http.put('/api/employees/' + companyId + '/' + employeeId, data);
        }
		
		var deleteEmployee = function (companyId, employeeId) {
            return $http.delete('/api/employees/' + companyId + '/' + employeeId);
        }
        
        var createTest = function (companyId, employeeId, data) {
            return $http.post('/api/tests/' + companyId + '/' + employeeId, data);
        }
        
        var getTestById = function (companyId, employeeId, testId) {
            return $http.get('/api/tests/' + companyId + '/' + employeeId + '/' + testId);
        }
        
        var updateTest = function (companyId, employeeId, testId, data) {
            return $http.put('/api/tests/' + companyId + '/' + employeeId + '/' + testId, data);
        }
		
		var deleteTest = function (companyId, employeeId, testId) {
            return $http.delete('/api/tests/' + companyId + '/' + employeeId + '/' + testId);
        }
        
        
        
        
      
        
        return {
            getCompanies: getCompanies,
            getCompanyById: getCompanyById,
            createCompany: createCompany,
            updateCompanyById: updateCompanyById,
            deleteCompany: deleteCompany,
            createEmployee: createEmployee,
            getEmployeeById: getEmployeeById,
            updateEmployee: updateEmployee,
			deleteEmployee:deleteEmployee,
            createTest: createTest,
            getTestById: getTestById,
            updateTest: updateTest,
			deleteTest:deleteTest
        };
    }
    
    mockData.$inject = ['$http', '$q'];
    function mockData($http, $q) {
        var getCompanies = function (lat, lng) {
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.resolve([{ "_id": "1", "name": "client1" }, { "_id": "1", "name": "client2" }, { "_id": "1", "name": "client3" }, { "_id": "1", "name": "client4" }]);
            });
            
            return deferred.promise;
        };
        
        return {
            getCompanies : getCompanies
        };
    }

})();