<div class="loginModal" ng-controller="loginCtrl">
    <div class="input-group loginInput">
        <input type="email" class="form-control" placeholder="User Email" aria-describedby="basic-addon1" ng-model="u_email">
    </div> 
    <div class="input-group loginInput">
        <input type="password" class="form-control" placeholder="User Password" aria-describedby="basic-addon1" ng-model="u_pass">
    </div> 
    <button type="button" class="btn btn-info loginBtn" ng-click="login()">Login</button>
    <div class="alert alert-danger massage" ng-if="currentError">{{currentError}}</div>
</div>


