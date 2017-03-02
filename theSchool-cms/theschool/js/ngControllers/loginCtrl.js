app.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$location', '$window', function ($scope, $http, $rootScope, $location, $window) {

        $scope.u_email = null;
        $scope.u_pass = null;
        $rootScope.isLoggedIn = false;       

        $scope.login = function () {
            $rootScope.isLoggedIn = false;
            $rootScope.currentUser = null;
            $rootScope.currentError = null;
            $http.post('../Ci/Auth/login', {"u_email": $scope.u_email, "u_pass": $scope.u_pass})
                    .success(function (data) {
                        $rootScope.currentUser = data;
                        $rootScope.isLoggedIn = $rootScope.currentUser.success;
                        if ($rootScope.isLoggedIn) {
                            $rootScope.currentError = null;
                            $location.path('/home');
                            console.log($rootScope.currentUser);
                            $scope.u_email = null;
                            $scope.u_pass = null;
                        } else {
                            $rootScope.currentError = "Wrong Email/Password";
                            $window.location.href = '#/login';
                            $location.path('/login');
                        }
                    })
                    .error(function (data) {
                        console.log('Error: ' + data.success);
                        $rootScope.currentError = data.success + " Email/Password";
                    });
        };

    }]);


