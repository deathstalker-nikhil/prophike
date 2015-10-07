angular.module('prophikeApp', [
  'ui.router'
])

.run(['$rootScope','$state','$stateParams',function ($rootScope,$state,$stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  ])

.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
      $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state("home", {
          url: "/",
          template: '<p class="lead">Welcome to the UI-Router Demo</p>' +
            '<p>Use the menu above to navigate. ' +
            'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>'
        })
    }
  ]
);
