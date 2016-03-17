(function () {
    
    angular
    .module('driverCheck')
    .controller('employeecreateCtrl', employeecreateCtrl);
    
    employeecreateCtrl.$inject = ['$location', '$routeParams','driverCheckData'];
    function employeecreateCtrl($location, $routeParams, driverCheckData) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'New Employee'
        };
        
        
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.emp.name || !vm.emp.address) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                var comId = $routeParams.companyId;
                driverCheckData.createEmployee(comId,vm.emp)
                .
                then(function (res) {
                    $location.path('/auth/detail/'+ $routeParams.companyId);
                }, function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
            }
        };

    

    }

})();