<!--add/update student view-->
<div class="addEditStudent" ng-controller="mainCtrl" ng-show="addEditStudentView">
    <button type="button" class="btn btn-info" ng-click="saveStudent()">Save</button>
    <button type="button" class="btn btn-info" ng-hide="toRegister" ng-click="deleteStudent()">Delete</button>
    <div class="addEdit">
        <div class="input-group mainInput">
            <input type="text" class="form-control uInput" placeholder="Student Name" aria-describedby="basic-addon1" ng-model="specStudent[0].s_name" required>
        </div> 
        <div class="input-group mainInput">
            <input type="text" class="form-control uInput" placeholder="Phone: 05x-xxxxxxx" aria-describedby="basic-addon1" ng-model="specStudent[0].s_phone" required>
        </div> 
        <div class="input-group mainInput">
            <input type="email" class="form-control uInput" placeholder="Student Email" aria-describedby="basic-addon1" ng-model="specStudent[0].s_email" required>
        </div>
    </div> 
    <div id="enrollList"><span>Courses: </span></div>
    <div class="enrollmentsCheckbox">
        <ul class="editStudentEnroll" >            
            <li class="editStudentEnrollLi" ng-repeat="course in courses track by $index">
                <div >
                    <span>{{course.c_name}}</span><input type="checkbox" ng-checked="checkIfEnrolled(course.c_id)" ng-click="EnrollmentsToServer(course)"/>
                </div>
            </li>            
        </ul>
    </div>    
</div>


