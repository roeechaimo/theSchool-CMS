app.controller('sideCtrl', ['$scope', '$http', '$rootScope', '$timeout', 'courseCounterSrv', function ($scope, $http, $rootScope, $timeout, courseCounterSrv) {

        $rootScope.schoolView = true;
        $rootScope.adminView = false;
        $rootScope.cView = false;
        $rootScope.sView = false;
        $rootScope.uView = false;
        $rootScope.sCView = true;
        $rootScope.showDModal = false;
        $rootScope.toRegister = false;

        $rootScope.specUser = null;

        $rootScope.users = null;
        $rootScope.courses = null;
        $rootScope.students = null;

        //get all courses/students/users from server
        function allDataToReturn(sUrl) {
            $http.get('../Ci/' + sUrl + '/show')
                    .success(function (data) {
                        if (sUrl === "courses") {
                            $rootScope.courses = data;
                            return;
                        }
                        if (sUrl === "students") {
                            $rootScope.students = data;
                            return;
                        }
                        if (sUrl === "users") {
                            $rootScope.users = data;
                        }
                    })
                    .error(function (data) {
                        console.log(data);
                    });
        }
        ;

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
                        if (sUrl === "enrollments") {
                            $rootScope.specStudentdEnrollments = data;     
                        }
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
        }
        ;

        //uses the courseCounterSrv service to get the current enrollments for a specific student from server
        function getCoursesPerStudent(sId) {
            $rootScope.coursesPerStudent = [];
            courseCounterSrv.dataToReturn(sId).then(function success(data) {
                $rootScope.coursesPerStudent = courseCounterSrv.coursesPerStudent;
            }, function error(data) {
                console.log(data);
            });
        }
        ;

        $rootScope.courses = allDataToReturn("courses");
        $rootScope.students = allDataToReturn("students");
        $rootScope.users = allDataToReturn("users");

        //load a specific course's details to the main container view
        $rootScope.getSpecificCourse = function (clickedItem) {
            if (!$rootScope.showDModal) {
                $rootScope.sCView = false;
                $rootScope.sView = false;
                $rootScope.addEditCourseView = false;
                $rootScope.addEditStudentView = false;
                $rootScope.cView = true;
                $rootScope.toView = $scope.courses[clickedItem];
                $rootScope.specCourseName = $scope.toView.c_name;
                $rootScope.specCourseDescr = $scope.toView.c_description;
                $rootScope.enrollmentsForCourse = [];
                $rootScope.studentsInCourse = [];
                $http.get('../Ci/enrollments/count/' + $scope.toView.c_id)
                        .success(function (data) {
                            $rootScope.specCourseStudentsCounter = data;
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
                $http.get('../Ci/enrollments/eShow/' + $scope.toView.c_id)
                        .success(function (data) {    
                            $rootScope.enrollmentsForCourse = data;
                            for (var i = 0; i < $rootScope.enrollmentsForCourse.length; i++) {
                                $http.get('../Ci/students/show/' + $rootScope.enrollmentsForCourse[i].s_id)
                                        .success(function (data) {
                                            $rootScope.studentsInCourse.push(data);
                                        })
                                        .error(function (data) {
                                            console.log('Error: ' + data);
                                        });
                            }
                        })
                        .error(function (data) {
                            console.log('Error: ' + data);
                        });
            }
        };

        //load a specific student's details to the main container view
        $rootScope.getSpecificStudent = function (clickedItem) {
            if (!$rootScope.showDModal) {
                $rootScope.sCView = false;
                $rootScope.cView = false;
                $rootScope.addEditStudentView = false;
                $rootScope.addEditCourseView = false;
                $rootScope.sView = true;
                $rootScope.toView = $rootScope.students[clickedItem];
                $rootScope.specStudentName = $rootScope.toView.s_name;
                $rootScope.specStudentPhone = $rootScope.toView.s_phone;
                $rootScope.specStudentEmail = $rootScope.toView.s_email;
                getCoursesPerStudent($rootScope.toView.s_id);
            }
        };

        function clearInputs() {
            $rootScope.specUser = [{}];
            $rootScope.specCourse = [{}];
            $rootScope.specStudent = [{}];
            $rootScope.coursesPerStudent = [];
        }

        //loads a specific user's details to the edit user page
        $scope.editSpecificUser = function (clickedItem) {
            if (!$rootScope.showDModal) {
                $rootScope.rolePermit = true;
                if ($rootScope.currentUser.u_role !== "owner") {
                    $rootScope.rolePermit = false;
                }
                $rootScope.toRegister = false;
                $scope.usrIdToGetFromServer = $scope.users[clickedItem].u_id;
                $rootScope.specUser = specDataToReturn("users", $scope.usrIdToGetFromServer);
                $rootScope.uView = false;
                $rootScope.addEditUserView = true;
                $rootScope.addEditCourseView = false;
                $rootScope.addEditStudentView = false;
            }
        };

        //loads the add new user view to the main container
        $scope.showAddUserView = function () {
            if (!$rootScope.showDModal) {
                $rootScope.rolePermit = true;
                clearInputs();
                $rootScope.uView = false;
                $rootScope.addEditUserView = true;
                $rootScope.addEditCourseView = false;
                $rootScope.addEditStudentView = false;
                $rootScope.toRegister = true;
            }

        };

        //loads the add new course view to the main container
        $scope.showAddCourseView = function () {
            if (!$rootScope.showDModal) {
                if ($rootScope.currentUser.u_role !== 'sales') {
                    clearInputs();
                    $rootScope.cView = false;
                    $rootScope.sView = false;
                    $rootScope.sCView = false;
                    $rootScope.addEditCourseView = true;
                    $rootScope.addEditUserView = false;
                    $rootScope.addEditStudentView = false;
                    $rootScope.toRegister = true;
                } else {
                    $rootScope.currentError = "Can't add/edit courses";
                    $timeout(function () {
                        $rootScope.currentError = null;
                    }, 1500);
                }
            }

        };

        //loads the add new student view to the main container
        $scope.showAddStudentView = function () {
            if (!$rootScope.showDModal) {
                clearInputs();
                $rootScope.sView = false;
                $rootScope.cView = false;
                $rootScope.sCView = false;
                $rootScope.addEditStudentView = true;
                $rootScope.addEditUserView = false;
                $rootScope.addEditCourseView = false;
                $rootScope.toRegister = true;
            }

        };

    }]);




