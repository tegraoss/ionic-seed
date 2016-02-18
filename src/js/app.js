(angular => {
  'use strict';

  angular.module('app', [
    'ionic',
    'underscore',
    'moment',
    'ngCordova',
    'ngStorage',
    'app.config',
    'app.controllers',
    'app.views',
    'app.directives',
    'app.factories',
    'app.services',
    'app.filters'
  ])

  // Add constants to the rootScope
  .run(['$rootScope', 'VERSION', 'APP_NAME', ($rootScope, VERSION, APP_NAME) => {
    $rootScope.VERSION = VERSION;
    $rootScope.APP_NAME = APP_NAME;
  }])

  // Configure the keyboard
  .run(['$ionicPlatform', $ionicPlatform => {
    $ionicPlatform.on("deviceready", () => {
      if (window.cordova && $window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.close();
        cordova.plugins.Keyboard.disableScroll(false);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

    });
  }])

  // Configure the back button
  .run(['$ionicPlatform', '$ionicHistory', '$rootScope', '$state', ($ionicPlatform, $ionicHistory, $rootScope, $state) => {
    $ionicPlatform.registerBackButtonAction(event => {
      if ($ionicHistory.backView()) {
        $ionicHistory.goBack(-1);
      }
    }, 101);
  }]);

})(angular);
