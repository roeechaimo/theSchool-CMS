<!--view a specific student's details in main container-->
<div ng-controller="mainCtrl" ng-show="sView">
    <div class="editBtnMainCont"><button ng-click="editSpecificStudent()" type="button" class="btn btn-info" >Edit</button></div>   
    <div class="insideMainView">
        <h2>{{specStudentName}}</h2>
        <p>{{specStudentPhone}}</p>
        <p>{{specStudentEmail}}</p>        
        <ul class="mainStudentUl">
            <li class="mainStudentLi" ng-repeat="course in coursesPerStudent track by $index">
                <span class="bold">Course Name: </span><span>{{course.c_name}}</span>
            </li>            
        </ul>
    </div>
</div>

