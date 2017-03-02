<div class="row" ng-controller="navCtrl">
    <div class="logo col-xl-2 col-lg-3 col-md-3 col-sm-4 hidden-xs"><img class="logoImg" src="../resources/Logomakr_7eQDBK.png"/></div>
    <div class=" navLiWrapper col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-6 text-nowrap">
        <ul class="nav navbar-nav" ng-show="isLoggedIn">
            <li class="navLi" ng-click="showSchoolView()">School <span class="sr-only">(current)</span> </li>
            <li class="navLi" ng-if="currentUser.u_role !== 'sales'">  |  </li>
            <li class="navLi" ng-if="currentUser.u_role !== 'sales'" ng-click="showAdminView()">Administration</li>
        </ul>
    </div>
    <div  class="rightPartNav col-xl-8 col-lg-6 col-md-6 col-sm-4 col-xs-6" ng-show="isLoggedIn">
        <p class="navbar-text navbar-right">Logged In, {{currentUser.u_name}}  <span id="logout" ng-click="logout()">[Logout]</span></p>
    </div>
    
</div>
<div class="border row col-md-12 col-sm-12 hidden-xs"></div>
