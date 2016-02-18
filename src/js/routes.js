
(angular => {
  'use strict';

  angular.module('app')

  .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

    $stateProvider

    .state('app', {
      abstract: true,
      templateUrl: 'views/side-menu.html',
      controller: 'appCtrl'
    })

    .state('app.start', {
      url: '/start',
      views: {
        'menuContent': {
          templateUrl: 'views/start.html',
          controller: 'startCtrl'
        }
      }
    });

    $urlRouterProvider.otherwise('/start');
  }]);

})(angular);
