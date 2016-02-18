(angular => {
  'use strict';

  angular.module('app.services', [])

  .service('Sabesp', ['$http', function($http) {

    const endpoint = 'https://sabesp-api.herokuapp.com/v2';

    this.listAll = () => {
      return $http.get(endpoint).then((result) => result.data);
    };

  }]);

})(angular);
