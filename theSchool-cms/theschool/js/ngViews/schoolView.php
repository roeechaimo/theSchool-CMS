<div ng-controller="sideCtrl">
    <ul class="sideCulumns">
        <li class="courseSideBar grandLiSide">
            <div>
                <div><span class="ulHeader">Courses</span> <span class="glyphicon glyphicon-plus-sign"></span></div>
                <div>
                    <ul class="sideUl" ng-repeat="course in courses">
                        <li class="sideLi course">
                            <div>
                                <span>Name: {{course.c_name}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
        <li class="studentSideBar grandLiSide">
            <div>
                <div><span class="ulHeader">Students</span> <span class="glyphicon glyphicon-plus-sign"></span></div>
                <div>
                    <ul class="sideUl" ng-repeat="student in students">
                        <li class="sideLi student">
                            <div>
                                <span>Name: {{student.s_name}}</span><br/>
                                <span>Phone: {{student.s_phone}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>

