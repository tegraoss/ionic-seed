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

  .controller('startCtrl', ['$scope', 'Loader', 'Sabesp', ($scope, Loader, Sabesp) => {

    $scope.data = [];

    Loader('Carregando dados da Sabesp', Sabesp.listAll()).then((data) => {
      $scope.data = data;
    });

  }]);

})(angular, navigator);
