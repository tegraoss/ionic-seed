((angular, window) => {
  'use strict';

  angular.module('underscore', [])
    .factory('_', () => window._);

  angular.module('moment', [])
    .factory('moment', () => window.moment);

})(angular, window);
