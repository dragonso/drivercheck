(function () {
    
    angular
    .module('driverCheck')
    .controller('companycreateCtrl', companycreateCtrl);
    
    companycreateCtrl.$inject = ['$location','driverCheckData'];
    function companycreateCtrl($location, driverCheckData) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'Create Company'
        };
        
        
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.company.name || !vm.company.address) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                driverCheckData.createCompany(vm.company)
                .
                then(function (res) {
                    $location.path('/');
                }, function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
            }
        };

    

    }

})();