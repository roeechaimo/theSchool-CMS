<!--the side container in home page-->
<div class="schoolView" ng-controller="sideCtrl" ng-show="schoolView">
    <ul class="sideCulumns">
        <li class="courseSideBar grandLiSide">
            <div>
                <div ng-click="showAddCourseView()"><span class="ulHeader">Courses</span> <span class="glyphicon glyphicon-plus-sign"></span></div>
                <div>
                    <ul class="sideUl" ng-repeat="course in courses">
                        <li class="sideLi course" ng-click="getSpecificCourse($index)">
                            <div>
                                <span class="bold">Name: </span><span>{{course.c_name}}</span></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
        <li class="studentSideBar grandLiSide">
            <div>
                <div ng-click="showAddStudentView()"><span class="ulHeader">Students</span> <span class="glyphicon glyphicon-plus-sign"></span></div>
                <div>
                    <ul class="sideUl" ng-repeat="student in students">
                        <li class="sideLi student" ng-click="getSpecificStudent($index)">
                            <div>
                                <span class="bold">Name: </span><span>{{student.s_name}}</span><br/>
                                <span class="bold">Phone: </span><span>{{student.s_phone}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>
<div class="adminView" ng-controller="sideCtrl" ng-show="adminView">
    <ul class="sideCulumns">
        <li class="courseSideBar grandLiSide">
            <div>
                <div ng-click="showAddUserView()"><span class="ulHeader">Administrators</span> <span class="glyphicon glyphicon-plus-sign"></span></div>
                <div>
                    <ul class="sideUl" ng-repeat="user in users">
                        <li class="sideLi course" ng-click="editSpecificUser($index)">
                            <div>
                                <span class="bold">Name: </span><span>{{user.u_name}}</span><br/>
                                <span class="bold">Phone: </span><span>{{user.u_phone}}</span><br/>
                                <span class="bold">Email: </span><span>{{user.u_email}}</span><br/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>

