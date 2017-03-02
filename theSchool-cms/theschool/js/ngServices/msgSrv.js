//get all users/students/courses/enrollments from server
app.service('msgSrv', function ($http, $q) {
    var self = {
        'toReturn': [],
        'dataToReturn': function (sUrl) {
            var defered = $q.defer();
            $http.get('../Ci/' + sUrl + '/show')
                    .success(function (data) {
                        self.toReturn = data;
                        defered.resolve(JSON.stringify(self.toReturn));
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            return defered.promise;
        }
    };
    return self;
});


