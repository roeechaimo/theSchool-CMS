<!--add/update course view-->
<div class="addEditCourse" ng-controller="mainCtrl" ng-show="addEditCourseView">
    <button type="button" class="btn btn-info" ng-click="saveCourse()">Save</button>
    <button type="button" class="btn btn-info" ng-hide="toRegister" ng-click="deleteCourse()">Delete</button>
    <div class="addEdit">
        <div class="input-group mainInput">
            <input type="text" class="form-control cInput" placeholder="Course Name" aria-describedby="basic-addon1" ng-model="specCourse[0].c_name" required>
        </div>        
        <textarea class="form-control cInput mainInput" rows="3" placeholder="Course Description" ng-model="specCourse[0].c_description" required></textarea>
    </div>       
</div>

