<!--the main container in home page-->
<div class="mainCont" ng-controller="sideCtrl">
    <div ng-include="'ngViews/courseView.php'"></div>
    <div ng-include="'ngViews/studentView.php'"></div>
    <div ng-include="'ngViews/userHomeView.php'"></div>
    <div ng-include="'ngViews/studentCourseHomeView.php'"></div>
    <div ng-include="'ngViews/addEditUserView.php?i=100'"></div>
    <div ng-include="'ngViews/addEditCourseView.php?i=100'"></div>
    <div ng-include="'ngViews/addEditStudentView.php?i=100'"></div>
    <div ng-include="'ngViews/dModal.php'"></div>
    <div class="alert alert-danger massage" ng-if="currentError">{{currentError}}</div>
    <div class="alert alert-success massage" role="alert" ng-show="saved">Data Saved</div>
</div>


