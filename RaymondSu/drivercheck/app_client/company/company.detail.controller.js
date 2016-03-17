(function () {
    
    angular
    .module('driverCheck')
    .controller('companydetailCtrl', companydetailCtrl);
    
    companydetailCtrl.$inject = ['$scope', '$location', 'driverCheckData', '$routeParams'];
    function companydetailCtrl($scope, $location, driverCheckData,$routeParams) {
        
       
        var vm = this;
        console.log(window.location);
        vm.pageHeader = {
            title: 'Company Detail',
        };
     
           
        driverCheckData.getCompanyById($routeParams.companyId)
        .then(function (res) {
            vm.company = res.data;
            console.log(vm.company);
        }, function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
        
         vm.deleteEmployee = function (compId,employeeId) {

            driverCheckData.deleteEmployee(compId,employeeId)
                .then(function() {
                    location.reload();
                }, function (e) {
                vm.message = "Sorry, something's gone wrong, please try again later";
            });

        }
  
        
        vm.showError = function (error) {
            $scope.$apply(function () {
                vm.message = error.message;
            });
        };
        
       
    }

})();