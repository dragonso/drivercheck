(function () {

  angular
    .module('driverCheck')
    .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location','authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in'
    };

	if(authentication.isLoggedIn())
		$location.path('/auth');
    vm.email="";
	vm.password="";

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.email || !vm.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        authentication.login(vm.email);
		$location.path('/auth');
      }
    };

  }

})();