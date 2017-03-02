app.controller('navCtrl', ['$scope', '$http', '$rootScope', '$location', '$state', function ($scope, $http, $rootScope, $location, $state) {

        $rootScope.schoolView = true;
        $rootScope.adminView = false;
        $rootScope.addEditUserView = false;
        $rootScope.addEditCourseView = false;
        $rootScope.addEditStudentView = false;
        $rootScope.cView = false;
        $scope.borderedSchoolView = false;
        $scope.borderedAdminView = false;

        //get specific data from the server
        function specDataToReturn(sUrl, id) {
            $http.get('../Ci/' + sUrl + '/show/' + id)
                    .success(function (data) {
                        if (sUrl === "courses") {
                            $rootScope.specCourse = data;
                        }
                        if (sUrl === "students") {
                            $rootScope.specStudent = data;
                        }
                        if (sUrl === "users") {
                            $rootScope.specUser = data;
                        }
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
        }
        ;

        //present the school home view to the main container
        $rootScope.showSchoolView = function () {
            if (!$rootScope.showDModal) {
                $rootScope.adminView = false;
                $rootScope.schoolView = true;
                $rootScope.uView = false;
                $rootScope.cView = false;
                $rootScope.sView = false;
                $rootScope.addEditUserView = false;
                $rootScope.addEditCourseView = false;
                $rootScope.addEditStudentView = false;
                $rootScope.sCView = true;
            }

        };

        //present the admin home view to the main container
        $rootScope.showAdminView = function () {
            if (!$rootScope.showDModal) {
                $rootScope.schoolView = false;
                $rootScope.adminView = true;
                $rootScope.cView = false;
                $rootScope.sView = false;
                $rootScope.sCView = false;
                $rootScope.addEditUserView = false;
                $rootScope.addEditCourseView = false;
                $rootScope.addEditStudentView = false;
                $rootScope.uView = true;        
            }
        };

        //loads a specific Course's details to the edit Course page
        $scope.editSpecificCourse = function () {
            $rootScope.toRegister = false;
            $scope.crsIdToGetFromServer = $rootScope.toView.c_id;
            $rootScope.specCourse = specDataToReturn("courses", $scope.crsIdToGetFromServer);
            $rootScope.cView = false;
            $rootScope.sView = false;
            $rootScope.sCView = false;
            $rootScope.addEditStudentView = false;
            $rootScope.addEditCourseView = true;
        };

        //send a logout request to the server
        $scope.logout = function () {
            $http.post('../Ci/Auth/logout', {"u_email": $scope.u_email, "u_pass": $scope.u_pass})
                    .success(function (data) {
                        console.log(data);
                        $rootScope.isLoggedIn = false;
                        $location.path('/login');
                    }).error(function (data) {
                console.log('Error: ' + data);
            });
        };

    }]);


