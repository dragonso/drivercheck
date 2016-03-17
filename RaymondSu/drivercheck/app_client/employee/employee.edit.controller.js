(function () {
    
    angular
    .module('driverCheck')
    .controller('employeeeditCtrl', employeeeditCtrl);
    
    employeeeditCtrl.$inject = ['$location', '$routeParams', 'driverCheckData'];
    function employeeeditCtrl($location, $routeParams, driverCheckData) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'Edit Employee'
        };
        vm.emp = { "name": "", "address": "" };
        
        driverCheckData.getEmployeeById($routeParams.companyId, $routeParams.employeeId)
        .then(function (res) {
            vm.emp = res.data;
            console.log(vm.emp);
        }, function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
        
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.emp.name || !vm.emp.address) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                
                driverCheckData.updateEmployee($routeParams.companyId, $routeParams.employeeId, vm.emp)
                .then(function (res) {
                    $location.path('/auth/'+ $routeParams.companyId);
                }, function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
            }
        };

    

    }

})();