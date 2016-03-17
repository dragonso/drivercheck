(function () {
    
    angular
    .module('driverCheck')
    .controller('employeedetailCtrl', employeedetailCtrl);
    
    employeedetailCtrl.$inject = ['$scope', '$location', 'driverCheckData', '$routeParams'];
    function employeedetailCtrl($scope, $location, driverCheckData, $routeParams) {
        
        
        var vm = this;
        console.log(window.location);
        vm.pageHeader = {
            title: 'Employee Detail',
        };
        
        
        vm.emp = { "name": "", "address": "" };
        
        driverCheckData.getEmployeeById($routeParams.companyId, $routeParams.employeeId)
        .then(function (res) {
            vm.emp = res.data;
            vm.emp.companyId = $routeParams.companyId;
            console.log(vm.emp);
        }, function (e) {
            vm.message = "Sorry, something's gone wrong, please try again later";
        });
        
        vm.deleteTest = function (compId,employeeId,testId) {

            driverCheckData.deleteTest(compId,employeeId,testId)
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
        
        vm.noGeo = function () {
            $scope.$apply(function () {
                vm.message = "Geolocation is not supported by this browser.";
            });
        };


    }

})();