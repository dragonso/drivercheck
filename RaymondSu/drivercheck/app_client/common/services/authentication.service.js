(function () {

  angular
    .module('driverCheck')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {
    var TOKEN = 'drivertoken';
    
    var isLoggedIn = function() {
      if($window.localStorage[TOKEN])
	  {
		  console.log('loggedin');
		  return true;
	  }
	  return false;
	  console.log('not in');
    };

    var currentUser = function() {
      return $window.localStorage[TOKEN]
    };

    
    var login = function(user) {
      $window.localStorage[TOKEN] = user;
    };

    var logout = function() {
      $window.localStorage.removeItem(TOKEN);
	  
    };

    return {
      isLoggedIn : isLoggedIn,
      login : login,
      logout : logout,
	  currentUser: currentUser
    };
  }


})();