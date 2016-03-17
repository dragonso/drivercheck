(function () {
    
    angular.module('driverCheck', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);
    
    function config($routeProvider, $locationProvider) {
        $routeProvider
	.when('/', {
            templateUrl: '/auth/login/login.view.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
      .when('/auth', {
            templateUrl: '/company/company.list.view.html',
            controller: 'companylistCtrl',
            controllerAs: 'vm'
        })
      .when('/auth/create', {
            templateUrl: '/company/company.create.view.html',
            controller: 'companycreateCtrl',
            controllerAs: 'vm'
        })
	  .when('/auth/edit/:companyId', {
            templateUrl: '/company/company.edit.view.html',
            controller: 'companyeditCtrl',
            controllerAs: 'vm'
        })
        .when('/auth/detail/:companyId', {
            templateUrl: '/company/company.detail.view.html',
            controller: 'companydetailCtrl',
            controllerAs: 'vm'
        })
        .when('/auth/employee/create/:companyId', {
            templateUrl: '/employee/employee.create.view.html',
            controller: 'employeecreateCtrl',
            controllerAs: 'vm'
        })
        .when('/auth/employee/edit/:companyId/:employeeId', {
            templateUrl: '/employee/employee.edit.view.html',
            controller: 'employeeeditCtrl',
            controllerAs: 'vm'
        })
        .when('/auth/employee/detail/:companyId/:employeeId', {
            templateUrl: '/employee/employee.detail.view.html',
            controller: 'employeedetailCtrl',
            controllerAs: 'vm'
        })
        .when('/auth/employee/test/create/:companyId/:employeeId', {
            templateUrl: '/test/test.create.view.html',
            controller: 'testcreateCtrl',
            controllerAs: 'vm'
        })
         .when('/auth/employee/test/edit/:companyId/:employeeId/:testId', {
            templateUrl: '/test/test.edit.view.html',
            controller: 'testeditCtrl',
            controllerAs: 'vm'
        })
      .when('/about', {
            templateUrl: '/common/views/genericText.view.html',
            controller: 'aboutCtrl',
            controllerAs: 'vm'
        })
      .when('/location/:locationid', {
            templateUrl: '/locationDetail/locationDetail.view.html',
            controller: 'locationDetailCtrl',
            controllerAs: 'vm'
        })
      .when('/register', {
            templateUrl: '/auth/register/register.view.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
      .otherwise({ redirectTo: '/' });
        
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }
    
    angular
    .module('driverCheck')
    .config(['$routeProvider', '$locationProvider', config]);

})();