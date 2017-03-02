var app = angular.module('app', ['ui.router']);

app.config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: '/login',
            controller: 'loginCtrl',
            templateUrl: 'ngViews/login.php',
            data: {needLogedIn: false}
        }).state('home', {
            url: '/home',
            templateUrl: 'ngViews/home.php',
            views: {
                '': {
                    templateUrl: 'ngViews/home.php'
                },
                'mainView@home': {
                    templateUrl: 'ngViews/home-mainView.php'
                },
                'sideView@home': {
                    templateUrl: 'ngViews/home-sideView.php'
                }
            },
            data: {needLogedIn: true}
        });

    }]).run(function ($rootScope, $window, $http) {
    //check for user session in case of refreshing the page
    $http.get('../Ci/Auth/isLoggedIn').success(function (data) {
        $rootScope.currentUser = data;
        $rootScope.isLoggedIn = $rootScope.currentUser.isLoggedIn;
    });
    //prevent the user the home page if not logged in
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams) {
        if (toState.data.needLogedIn === true && $rootScope.isLoggedIn === false) {
            event.preventDefault();
            $window.location.href = '#/login';
            $rootScope.currentError = "Not Logged In";
        }
        if ($rootScope.isLoggedIn === true && toState.data.needLogedIn === false) {
            event.preventDefault();
        }
    });
});




