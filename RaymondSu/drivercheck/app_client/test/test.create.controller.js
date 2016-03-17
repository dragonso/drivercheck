(function () {
    
    angular
    .module('driverCheck')
    .controller('testcreateCtrl', testcreateCtrl);
    
    testcreateCtrl.$inject = ['$location', '$routeParams','driverCheckData'];
    function testcreateCtrl($location, $routeParams, driverCheckData) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'New Test'
        };

        vm.test = { "result": "", "testDate": "" };
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (vm.test.result ==="" || vm.test.testDate && isNaN(Date.parse(vm.test.testDate))) {
                vm.formError = "All fields required, please try again";
                console.log(vm.test.testDate);
                return false;
            } else {
                var comId = $routeParams.companyId;
                driverCheckData.createTest(comId, $routeParams.employeeId,vm.test)
                .
                then(function (res) {
                    $location.path('/auth/employee/detail/'+ $routeParams.companyId+'/'+ $routeParams.employeeId);
                }, function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
            }
        };

    

    }

})();