(angular => {
  'use strict';

  angular.module('app.directives', [])

  .directive('myTabs', [() => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        selected: '='
      },
      controller: ['$scope', function($scope) {
        const tabs = $scope.tabs = [];

        $scope.selected = $scope.selected || 0;

        $scope.$watch('selected', v => $scope.selectIndex(v || 0));

        $scope.select = tab => {
          angular.forEach(tabs, tab => tab.selected = false);
          tab.selected = true;
          $scope.selected = $scope.tabs.indexOf(tab);
          $scope.$emit('my-tabs-changed', tab);
        };

        $scope.selectIndex = idx => {
          if (!tabs[idx]) {
            return;
          }
          $scope.select(tabs[idx]);
        };

        this.addTab = (tab) => tabs.push(tab);
      }],
      templateUrl: 'views/common/my-tabs.html'
    };
  }])

  .directive('myTab', () => ({
    require: '^myTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: (scope, element, attrs, tabsCtrl) => {
      tabsCtrl.addTab(scope);
    },
    templateUrl: 'views/common/my-tab.html'
  }))

  .directive('uppercased', () => ({
    require: 'ngModel',
    restrict: 'AC',
    link: (scope, element, attrs, modelCtrl) => {
      modelCtrl.$parsers.push((input) => input ? input.toUpperCase() : "");
      element.css("text-transform","uppercase");
    }
  }))

  .directive('showHideContainer', () => ({
    templateUrl: 'views/common/show-hide-password.html',
    restrict: 'A',
    replace: false,
    transclude: true,
    scope: {
    },
    controller: ['$scope', ($scope) => {
      $scope.show = false;

      $scope.toggleType = $event => {
        $event.stopPropagation();
        $event.preventDefault();

        $scope.show = !$scope.show;

        $scope.$broadcast("toggle-type", $scope.show);
      };
    }]
  }))

  .directive('multiBg', ['_', _ => ({
    templateUrl: 'views/common/multi-bg.html',
    restrict: 'A',
    replace: true,
    transclude: true,
    scope: {
      multiBg: '=',
      interval: '=',
      helperClass: '@'
    },
    controller: ['$scope', '$element', function($scope, $element) {
      $scope.loaded = false;

      this.animateBg = () => {
        $scope.$apply(() => {
          $scope.loaded = true;
          $element.css({'background-image': 'url(' + $scope.bg_img + ')'});
        });
      };

      this.setBackground = bg => $scope.bg_img = bg;

      if(!_.isUndefined($scope.multiBg))
      {
        this.setBackground($scope.multiBg[0]);
      }
    }]
  })])

  .directive('bg', () => ({
    restrict: 'A',
    require: '^multiBg',
    scope: {
      ngSrc: '@'
    },
    link: (scope, element, attr, multiBgController) => {
      element.on('load', () => multiBgController.animateBg());
    }
  }));

})(angular);
