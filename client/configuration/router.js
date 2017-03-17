app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
    todo think on router
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('root',{
                url : '/',
                abstract:true,
                templateUrl:'../content/states/root/rootTemplate.html',
                controller:'RootCtrl'
            })
    }

]);