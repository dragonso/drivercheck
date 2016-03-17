(function() {

  angular
    .module('driverCheck')
    .service('mockData', mockData);

  driverCheckData.$inject = ['$http','$q'];
  function driverCheckData ($http,$q) {
    var getCompanies = function (lat, lng) {
		var deferred = $q.defer();
		deferred.resolve([{"name":"client1"},{"name":"client2"},{"name":"client3"},{"name":"client4"}]);
		return deferred.promise;
      //return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
    };

    var locationById = function (locationid) {
      return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function (locationid, data) {
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      locationByCoords : locationByCoords,
      locationById : locationById,
      addReviewById : addReviewById
    };
  }

})();