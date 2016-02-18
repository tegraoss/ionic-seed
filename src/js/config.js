(angular => {
  'use strict';

  angular.module('app.config', [])

  .constant('APP_NAME', 'Tegra Ionic Seed')
    .constant('VERSION', {
      number: '0.0.0',
      date: '01/01/1970'
    })
    .constant('API', 'https://sabesp-api.herokuapp.com/v2')
    .config(['$ionicConfigProvider', ($ionicConfigProvider) => {
      $ionicConfigProvider.scrolling.jsScrolling(false);

      if (ionic.Platform.isWindowsPhone()) {
        $ionicConfigProvider.views.transition('none');
      }
    }])
    .config(['$compileProvider', $compileProvider => {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|ms-appx-web|x-wmapp0):/);
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|ms-appx-web|x-wmapp0):|data:image\//);
    }]);

})(angular);
