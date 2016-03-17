(function () {
    
    angular
    .module('driverCheck')
    .controller('companyeditCtrl', companyeditCtrl);
    
    companyeditCtrl.$inject = ['$location', '$routeParams', 'driverCheckData'];
    function companyeditCtrl($location, $routeParams, driverCheckData) {
        var vm = this;
        
        vm.pageHeader = {
            title: 'Edit Company'
        };
        vm.company = { "name": "", "address": "" };
        
        driverCheckData.getCompanyById($routeParams.companyId)
        .then(function (res) {
            vm.company = res.data;
            console.log(vm.company);
        }, function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
        
        
        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.company.name || !vm.company.address) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                
                driverCheckData.updateCompanyById($routeParams.companyId,vm.company)
                .then(function (res) {
                    $location.path('/');
                }, function (e) {
                    vm.message = "Sorry, something's gone wrong, please try again later";
                });
            }
        };

    

    }

})();