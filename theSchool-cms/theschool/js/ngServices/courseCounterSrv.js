//get the current enrollments for a specific student from server
app.service('courseCounterSrv', function ($http, $q) {
    var self = {
        'enrollmentsPerStudent': [],
        'coursesPerStudent': [],
        'dataToReturn': function (sId) {
            var defered = $q.defer();
            $http.get('../Ci/enrollments/show/' + sId)
                    .success(function (data) {
                        self.enrollmentsPerStudent = data;
                        self.coursesPerStudent = [];
                        for (var i = 0; i < self.enrollmentsPerStudent.length; i++) {
                            $http.get('../Ci/courses/show/' + self.enrollmentsPerStudent[i].c_id)
                                    .success(function (data) {
                                        self.coursesPerStudent.push(data[0]);
                                    })
                                    .error(function (data) {
                                        console.log('Error: ' + data);
                                    });
                        }
                        defered.resolve(JSON.stringify(self.coursesPerStudent));
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            return defered.promise;
        }
    };
    return self;
});


