<!--view a specific course details in main container-->
<div ng-controller="navCtrl" ng-show="cView">
    <div class="editBtnMainCont" ng-if="currentUser.u_role !== 'sales'"><button ng-click="editSpecificCourse()" type="button" class="btn btn-info" >Edit</button></div>   
    <div class="insideMainView">
        <h2>{{specCourseName}}</h2>
        <p>{{specCourseDescr}}</p>
        <span class="counter">{{specCourseStudentsCounter}} Students Enrolled</span>
        <ul class="mainStudentUl">
            <li class="mainStudentLi" ng-repeat="student in studentsInCourse">
                <span class="bold">Student Name: </span><span>{{student[0].s_name}}</span>
            </li>            
        </ul>
    </div>
</div>

