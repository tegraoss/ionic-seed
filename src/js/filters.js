(angular => {
  'use strict';

  angular.module('app.filters', [])

  .filter('pad', () =>  (n, nr, str) => Array(nr - String(n).length+1).join(str||'0')+n)

  .filter('hhmm', ['$filter', $filter => {
    const pad = $filter('pad');
    return minutes => {
      if (minutes < 0) {
        minutes = minutes * -1;
      }

      const hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      return pad(hours, 2) + ":" + pad(minutes, 2);
    };
  }]);
})(angular);
