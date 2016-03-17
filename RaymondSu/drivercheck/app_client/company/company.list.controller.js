(function () {

  angular
    .module('driverCheck')
    .controller('companylistCtrl', companylistCtrl);

  companylistCtrl.$inject = ['$scope', '$location','driverCheckData'];
  function companylistCtrl ($scope,$location, driverCheckData) {

    
    
    var vm = this;
    console.log(window.location);
    vm.pageHeader = {
      title: 'Company List'
    };
    

	
	driverCheckData.getCompanies()
         .then(function(res) {
           vm.message = res.data.length > 0 ? "" : "Nothing found";
           vm.data = { companies: res.data };
           console.log(vm.data);
         },function (e) {
		 vm.message = "Sorry, something's gone wrong, please try again later";});
	
	
	
        vm.deleteCompany = function ($event, id) {

            driverCheckData.deleteCompany(id)
                .then(function() {
                    location.reload();
                }, function (e) {
                vm.message = "Sorry, something's gone wrong, please try again later";
            });

        }

    vm.showError = function (error) {
      $scope.$apply(function() {
        vm.message = error.message;
      });
    };

    

  }

})();