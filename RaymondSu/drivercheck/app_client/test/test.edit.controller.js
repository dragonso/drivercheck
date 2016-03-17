(function () {
    
    angular
    .module('driverCheck')
    .controller('testeditCtrl', testeditCtrl);
    
    testeditCtrl.$inject = ['$location', '$routeParams', 'driverCheckData','$filter'];
    function testeditCtrl($location, $routeParams, driverCheckData, $filter) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'Edit Test Result'
        };
        vm.test = { "result": "", "testDate": "" };
        
        driverCheckData.getTestById($routeParams.companyId, $routeParams.employeeId, $routeParams.testId)
        .then(function (res) {
            vm.test = res.data;
            vm.test.testDate = $filter('date')(vm.test.testDate,'MMMM dd, yyyy');
            console.log(vm.test);
        }, function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
        
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (vm.test.result ==="" || vm.test.testDate && isNaN(Date.parse(vm.test.testDate))) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                
                driverCheckData.updateTest($routeParams.companyId, $routeParams.employeeId, $routeParams.testId, vm.test)
                .then(function (res) {
                    console.log(res);
                    $location.path('/auth/employee/detail/'+ $routeParams.companyId+'/'+ $routeParams.employeeId);
                }, function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
            }
        };

    

    }

})();