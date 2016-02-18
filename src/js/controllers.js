((angular, navigator) => {
  'use strict';

  angular.module('app.controllers', [])

  .controller('appCtrl', ['$scope', ($scope) => {

    $scope.exit = () => {
      if (navigator) {
        navigator.app.exitApp();
      }
    };

  }])

  .controller('startCtrl', [() => {

  }]);

})(angular, navigator);
