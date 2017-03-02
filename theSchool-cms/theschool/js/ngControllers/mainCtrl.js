app.controller('mainCtrl', ['$scope', '$http', '$rootScope', '$timeout', 'msgSrv', function ($scope, $http, $rootScope, $timeout, msgSrv) {

        //user roles array
        $rootScope.roles = [
            {"role": "owner", "index": 0},
            {"role": "manager", "index": 1},
            {"role": "sales", "index": 2}
        ];

        $rootScope.sView = false;
        $rootScope.addEditStudentView = false;
        $rootScope.specStudent = null;
        $scope.stdAdded = null;
        $rootScope.specStudentdEnrollments = null;
        $rootScope.itemToDelete = null;

        //this function uses the msgSrv service to refresh data on screen after adding/updating/deleting data,
        //nevigate to the specific updated data view and present the right message to the user
        function showMsg(url) {
            if (url === "users") {
                $rootScope.showAdminView();
            } else if ((url === "courses" && $scope.toDelete) || (url === "students" && $scope.toDelete)) {
                $rootScope.showSchoolView();
            }
            $rootScope.saved = true;
            $timeout(function () {
                $rootScope.saved = false;
                msgSrv.dataToReturn(url).then(function success(data) {
                    if (url === "students") {
                        $rootScope.students = msgSrv.toReturn;
                    } else if (url === "courses") {
                        $rootScope.courses = msgSrv.toReturn;
                    } else if (url === "users") {
                        $rootScope.users = msgSrv.toReturn;
                    }
                }, function error(data) {
                    console.log(data);
                }).then(function () {
                    if (!$scope.toDelete && url === "students" && $rootScope.toRegister) {
                        $rootScope.getSpecificStudent($rootScope.students.length - 1);
                    } else if (!$scope.toDelete && url === "students" && !$rootScope.toRegister) {
                        $scope.FoundItem = $rootScope.students.find(function (item) {
                            return (item.s_id === $rootScope.specStudent[0].s_id);
                        });
                        $scope.itemIndex = $rootScope.students.indexOf($scope.FoundItem);
                        $rootScope.getSpecificStudent($scope.itemIndex);
                    } else if (!$scope.toDelete && url === "courses" && $rootScope.toRegister) {
                        $rootScope.getSpecificCourse($rootScope.courses.length - 1);
                    } else if (!$scope.toDelete && url === "courses" && !$rootScope.toRegister) {
                        $scope.FoundItem = $rootScope.courses.find(function (item) {
                            return (item.c_id === $rootScope.specCourse[0].c_id);
                        });
                        $scope.itemIndex = $rootScope.courses.indexOf($scope.FoundItem);
                        $rootScope.getSpecificCourse($scope.itemIndex);
                    }
                }).then(function () {
                    $scope.toDelete = false;
                    clearInputs();
                });
            }, 1500);
        }
        ;

        function sendDataToServer(sUrl, id) {
            if (sUrl === "auth") {
                if (!id) {
                    $http.post('../Ci/' + sUrl + '/register', $rootScope.specUser)
                            .success(function (data) {
                                console.log(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                }
            }
            if (sUrl === "users") {
                $http.put('../Ci/' + sUrl + '/put/' + id, $rootScope.specUser[0])
                        .success(function (data) {
                            console.log(data);
                            showMsg("users");
                        })
                        .error(function (data) {
                            console.log(data);
                            $rootScope.currentError = "Not authorized";
                            $timeout(function () {
                                $rootScope.currentError = null;
                            }, 1500);
                        });
            }
            if (sUrl === "courses") {
                if (!id) {
                    $http.post('../Ci/' + sUrl + '/post', $rootScope.specCourse)
                            .success(function (data) {
                                console.log(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                } else {
                    $http.put('../Ci/' + sUrl + '/put/' + id, $rootScope.specCourse[0])
                            .success(function (data) {
                                console.log(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                }
            }
            if (sUrl === "students") {
                if (!id) {
                    $http.post('../Ci/' + sUrl + '/post', $rootScope.specStudent)
                            .success(function (data) {
                                console.log(data);                                
                                sendNewEnrollment(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                } else {
                    $http.put('../Ci/' + sUrl + '/put/' + id, $rootScope.specStudent[0])
                            .success(function (data) {   
                                console.log(data);
                            })
                            .error(function (data) {
                                console.log('Error: ' + data);
                            });
                }
            }
            if (sUrl === "enrollments") {
                $http.post('../Ci/' + sUrl + '/post', $scope.specEnrollment)
                        .success(function (data) {   
                            console.log(data);
                        })
                        .error(function (data) {
                            console.log(data);
                        });
            }
        }
        ;

        function deleteDataFromServer(url, id) {
            $http.delete('../Ci/' + url + '/delete/' + id)
                    .success(function (data) {
                        console.log(data);
                        return data;
                    })
                    .error(function (data) {
                        console.log(data);
                        return data;
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

        //clear all the input textboxes
        function clearInputs() {
            $rootScope.specUser = [{}];
            $rootScope.specCourse = [{}];
            $rootScope.specStudent = [{}];
            $rootScope.coursesPerStudent = [];
        }

        //loads a specific student's details to the edit student page
        $scope.editSpecificStudent = function () {
            $rootScope.toRegister = false;
            $scope.stdIdToGetFromServer = $rootScope.toView.s_id;
            $rootScope.specStudent = specDataToReturn("students", $scope.stdIdToGetFromServer);
            for (var i = 0; i < $rootScope.courses.length; i++) {
                for (var j = 0; j < $rootScope.coursesPerStudent.length; j++) {
                    if ($rootScope.coursesPerStudent[j].c_id === $rootScope.courses[i].c_id) {
                        $rootScope.courses[i]["selected"] = true;
                        $rootScope.coursesPerStudent[j]["selected"] = true;
                        break;
                    } else {
                        $rootScope.courses[i]["selected"] = false;
                    }
                }
            }
            specDataToReturn("enrollments", $scope.stdIdToGetFromServer);
            $rootScope.sView = false;
            $rootScope.cView = false;
            $rootScope.addEditStudentView = true;
        };

        //save new/updated user 
        $scope.saveUser = function () {
            if ($rootScope.toRegister === true) {
                $rootScope.specUser = {
                    "u_name": $rootScope.specUser[0].u_name,
                    "u_role": $rootScope.specUser[0].u_role,
                    "u_phone": $rootScope.specUser[0].u_phone,
                    "u_email": $rootScope.specUser[0].u_email,
                    "u_pass": $rootScope.specUser[0].u_pass
                };
                if (!$scope.valiidate('users', $rootScope.specUser)) {
                    return;
                }
                sendDataToServer("auth");
                showMsg("users");
            } else {
                if (!$scope.valiidate('users', $rootScope.specUser[0])) {
                    return;
                }
                delete $rootScope.specUser.u_pass;
                sendDataToServer("users", $rootScope.specUser[0].u_id);
            }

        };

        $scope.deleteUser = function () {
            $rootScope.showDModal = true;
            $rootScope.addEditUserView = false;
            $rootScope.itemToDelete = "user";
        };

        //save new/updated course 
        $scope.saveCourse = function () {
            if ($rootScope.toRegister === true) {
                $rootScope.specCourse = {
                    "c_name": $rootScope.specCourse[0].c_name,
                    "c_description": $rootScope.specCourse[0].c_description
                };
                if (!$scope.valiidate('courses', $rootScope.specCourse)) {
                    return;
                }
                sendDataToServer("courses");
            } else {
                if (!$scope.valiidate('courses', $rootScope.specCourse[0])) {
                    return;
                }
                sendDataToServer("courses", $rootScope.specCourse[0].c_id);
            }
            showMsg("courses");
        };

        $scope.deleteCourse = function () {
            $rootScope.itemToDelete = "course";
            $rootScope.showDModal = true;
            $rootScope.addEditCourseView = false;
        };

        //check if student enrolled to each course in order to update the courses checkboxes
        $scope.checkIfEnrolled = function (cId) {
            if ($rootScope.coursesPerStudent) {
                for (var i = 0; i < $rootScope.coursesPerStudent.length; i++) {
                    if (cId === $rootScope.coursesPerStudent[i].c_id) {
                        return true;
                    }
                }
            } else {
                return false;
            }
        };

        //updates the specific student courses array before being sent to server 
        $scope.EnrollmentsToServer = function (course) {
            var found = false;
            for (var i = 0; i < $rootScope.coursesPerStudent.length; i++) {
                if (course.c_id === $rootScope.coursesPerStudent[i].c_id) {
                    var found = true;
                    break;
                }
            }
            if (found) {
                $rootScope.coursesPerStudent.splice(i, 1);
            } else {
                $rootScope.coursesPerStudent.push(course);
            }
        };

        //send the specific student's new enrollments to server when hiting save student  
        function sendNewEnrollment(sId) {
            var coursesToSend = [];
            for (var i = 0; i < $rootScope.coursesPerStudent.length; i++) {
                coursesToSend.push(Number($rootScope.coursesPerStudent[i].c_id));
            }
            $scope.specEnrollment = {
                "c_id": coursesToSend, "s_id": sId.lastStudentId
            };
            $scope.specStudentdEnrollments = coursesToSend;
            sendDataToServer("enrollments");
        }
        ;

        //seave a new/updated student
        $scope.saveStudent = function () {
            var coursesToSend = [];
            $scope.stdAdded = null;
            if ($rootScope.toRegister === true) {
                $rootScope.specStudent = {
                    "s_name": $rootScope.specStudent[0].s_name,
                    "s_phone": $rootScope.specStudent[0].s_phone,
                    "s_email": $rootScope.specStudent[0].s_email
                };
                if (!$scope.valiidate('students', $rootScope.specStudent)) {
                    return;
                }
                sendDataToServer("students");
            } else {
                if (!$scope.valiidate('students', $rootScope.specStudent[0])) {
                    return;
                }
                sendDataToServer("students", $rootScope.specStudent[0].s_id);
                for (var i = 0; i < $rootScope.coursesPerStudent.length; i++) {
                    coursesToSend.push(Number($rootScope.coursesPerStudent[i].c_id));
                }
                $scope.specEnrollment = {
                    "c_id": coursesToSend, "s_id": $rootScope.specStudent[0].s_id
                };
                sendDataToServer("enrollments");
            }
            showMsg("students");
        };

        //delete item if usere confirms 
        $scope.proceedDelete = function () {
            if ($rootScope.itemToDelete === "student") {
                $rootScope.showDModal = false;
                $rootScope.proceedToDelete = true;
                if ($rootScope.proceedToDelete) {
                    for (var i = 0; i < $rootScope.specStudentdEnrollments.length; i++) {
                        deleteDataFromServer("enrollments", $rootScope.specStudentdEnrollments[i].e_id);
                    }
                    deleteDataFromServer("students", $rootScope.specStudent[0].s_id);
                    console.log("student deleted");
                    $scope.toDelete = true;
                    showMsg("students");
                }
            } else if ($rootScope.itemToDelete === "course") {
                $rootScope.showDModal = false;
                $rootScope.proceedToDelete = true;
                if ($rootScope.proceedToDelete) {
                    for (var i = 0; i < $rootScope.enrollmentsForCourse.length; i++) {
                        deleteDataFromServer("enrollments", $rootScope.enrollmentsForCourse[i].e_id);
                    }
                    deleteDataFromServer("courses", $rootScope.specCourse[0].c_id);
                    console.log('course deleted');
                    $scope.toDelete = true;
                    showMsg("courses");
                }
            } else if ($rootScope.itemToDelete === "user") {
                $rootScope.showDModal = false;
                $rootScope.proceedToDelete = true;
                if ($rootScope.proceedToDelete) {
                    deleteDataFromServer("users", $rootScope.specUser[0].u_id);
                    if ($rootScope.currentUser.u_id !== $rootScope.specUser[0].u_id) {
                        showMsg("users");
                        clearInputs();
                    } else {
                        $rootScope.currentError = "Can't Delete Yourself";
                        $timeout(function () {
                            $rootScope.currentError = null;
                            $rootScope.showAdminView();
                        }, 1500);
                    }
                }
            }
        };

        //return to previous view if user doesnt approve delete
        $scope.dontProceedDelete = function () {
            $rootScope.showDModal = false;
            $rootScope.proceedToDelete = false;
            if ($rootScope.itemToDelete === "student") {
                $rootScope.addEditStudentView = true;
            }
            if ($rootScope.itemToDelete === "course") {
                $rootScope.addEditCourseView = true;
            }
            if ($rootScope.itemToDelete === "user") {
                $rootScope.addEditUserView = true;
            }
        };

        $scope.deleteStudent = function () {
            $rootScope.showDModal = true;
            $rootScope.addEditStudentView = false;
            $rootScope.itemToDelete = "student";
        };

        //validate the form's details from the add/update view before being sent to server 
        $scope.valiidate = function (view, obj) {
            if (view === 'users') {
                if (!obj.u_name || !phoneValidate(obj.u_phone) || !obj.u_email || !obj.u_role || !obj.u_pass) {
                    console.log('empty');
                    $rootScope.currentError = "One or more fields is not right..";
                    $timeout(function () {
                        $rootScope.currentError = null;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
            if (view === 'courses') {
                if (!obj.c_name || !obj.c_description) {
                    console.log('empty');
                    $rootScope.currentError = "One or more fields is not right..";
                    $timeout(function () {
                        $rootScope.currentError = null;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
            if (view === 'students') {
                if (!obj.s_name || !phoneValidate(obj.s_phone) || !obj.s_email) {
                    console.log('empty');
                    $rootScope.currentError = "One or more fields is not right..";
                    $timeout(function () {
                        $rootScope.currentError = null;
                    }, 1500);
                    return false;
                } else {
                    return true;
                }
            }
        };

        //validation of phone number - must be at the following format: xxx-xxxxxxx
        function phoneValidate(phone) {
            if (!phone) {
                return false;
            } else {
                var res = phone.match(/\d{3}\-\d{7}/g);
                if (res && phone.length === 11) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }]);



